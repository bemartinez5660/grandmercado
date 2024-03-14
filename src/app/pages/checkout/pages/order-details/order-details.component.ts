import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  combineLatest,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ShopOrders } from 'src/app/models/shop.models';
import { AppState } from 'src/app/root-store';
import { CartService } from 'src/app/services/cart.service';
import { GTMGrandmercadoService } from 'src/app/services/gtm-grandmercado.service';
import { ReceiverSelectors } from 'src/app/shop-store/receiver-store';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  private cart$ = this.cartService.listenCartObservable();
  receiver$ = this.store.pipe(select(ReceiverSelectors.selectSelectedReceiver));
  orderDetails$: Observable<any | undefined>;
  _unsubcribe = new Subject<void>();
  orderToPay: any;

  constructor(
    private store: Store<AppState>,
    private cartService: CartService,
    private router: Router,
    private gtmGrandmercadoService: GTMGrandmercadoService
  ) {
    this.orderDetails$ = combineLatest({
      cart: this.cart$,
      receiver: this.receiver$,
    }).pipe(
      switchMap(({ cart, receiver }) => {
        if (!receiver) {
          this.router.navigate(['checkout/receiver-form']);
          return of(undefined);
        }
        return this.cartService.calculateOrder(cart, receiver.id);
      })
    );
  }

  ngOnInit(): void {
    this.cart$.pipe(takeUntil(this._unsubcribe)).subscribe((cart) => {
      this.gtmGrandmercadoService.trackBeginCheckout(cart);
    });
  }

  onPayOrder() {
    combineLatest({
      cart: this.cart$,
      receiver: this.receiver$,
    })
      .pipe(
        takeUntil(this._unsubcribe),
        switchMap(({ cart, receiver }) => {
          if (receiver) {
            return this.cartService.createOrder(cart, receiver.id);
          }
          return of(undefined);
        })
      )
      .subscribe((order: ShopOrders | undefined) => {
        if (order !== undefined) {
          this.cartService.clearCart();
          this.gtmGrandmercadoService.trackPurchase(order);
          this.router.navigate(['checkout/payment', order.order_code]);
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubcribe.next();
    this._unsubcribe.complete();
  }
}

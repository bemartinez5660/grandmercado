import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { GTMGrandmercadoService } from 'src/app/services/gtm-grandmercado.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<void>();
  cart$ = this.cartService
    .listenCartObservable()
    .pipe(takeUntil(this._unsubscribe));

  constructor(
    private cartService: CartService,
    private gtmGrandmercadoService: GTMGrandmercadoService
  ) {}

  ngOnInit(): void {
    this.cart$.pipe(take(1)).subscribe((cart) => {
      this.gtmGrandmercadoService.trackViewCart(cart);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}

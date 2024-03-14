import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { PaymentMethod } from 'src/app/models/payment.models';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ShopOrders } from 'src/app/models/shop.models';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentComponent implements OnInit, OnDestroy {
  _unsubscribe = new Subject<void>();
  paymentMethods$!: Observable<PaymentMethod[]>;
  order$!: Observable<ShopOrders>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private orderService: OrderService
  ) {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((params) => {
        const order_code = params.get('order-code');
        if (order_code) {
          this.order$ = this.orderService.getShopOrders(order_code);
          this.paymentMethods$ = this.order$.pipe(
            switchMap((order) =>
              this.paymentService.getPaymentMethods(order.order_code)
            )
          );
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}

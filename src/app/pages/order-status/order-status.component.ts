import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ORDER_STATUS_ICONS, ShopOrders } from 'src/app/models/shop.models';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
})
export class OrderStatusComponent implements OnDestroy {
  _unsubscribe = new Subject<void>();
  order$!: Observable<ShopOrders>;
  orderStatusIcons = ORDER_STATUS_ICONS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((params) => {
        const order_code = params.get('order-code');
        if (order_code) {
          this.order$ = this.orderService.getShopOrders(order_code);
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}

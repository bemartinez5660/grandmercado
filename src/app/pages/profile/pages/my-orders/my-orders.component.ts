import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_STATUS_ICONS } from 'src/app/models/shop.models';
import { OrderList } from 'src/app/models/shop.models';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
          style({ opacity: 1, height: '*' })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
          style({ opacity: 0, height: 0 })
        ),
      ]),
    ]),
  ],
})
export class MyOrdersComponent implements OnInit {
  current_page = 1;
  order$!: Observable<OrderList>;
  allStatus = ORDER_STATUS_ICONS;

  constructor(private ordersService: OrderService) {
    this.fetchOrders();
  }

  ngOnInit(): void {}

  fetchOrders() {
    this.order$ = this.ordersService.getUserOrders(this.current_page);
  }

  onGoTo(page: number) {
    this.current_page = page;
    this.fetchOrders();
  }

  onNext(page: number) {
    this.current_page = page + 1;
    this.fetchOrders();
  }

  onPrev(page: number) {
    this.current_page = page - 1;
    this.fetchOrders();
  }
}

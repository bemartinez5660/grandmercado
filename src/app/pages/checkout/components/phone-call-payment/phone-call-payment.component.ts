import { Component, Input, OnInit } from '@angular/core';
import { PhoneCallPaymentMethod } from 'src/app/models/payment.models';
import { ShopOrders } from 'src/app/models/shop.models';

@Component({
  selector: 'app-phone-call-payment',
  templateUrl: './phone-call-payment.component.html',
  styleUrls: ['./phone-call-payment.component.scss'],
})
export class PhoneCallPaymentComponent implements OnInit {
  @Input() payment!: PhoneCallPaymentMethod;
  @Input() order!: ShopOrders;

  constructor() {}

  ngOnInit(): void {}
}

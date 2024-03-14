import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import {
  PaymentMethod,
  PaymentMethodType,
} from 'src/app/models/payment.models';
import { ShopOrders } from 'src/app/models/shop.models';
import { PhoneCallPaymentComponent } from '../../components/phone-call-payment/phone-call-payment.component';
import { SquarePaymentComponent } from '../../components/square-payment/square-payment.component';
import { ZellePaymentComponent } from '../../components/zelle-payment/zelle-payment.component';
import { PaymentHostDirective } from '../../directives/payment-host.directive';

export interface IPaymentComponent {
  payment: PaymentMethod;
  order: ShopOrders;
}

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit {
  @ViewChild(PaymentHostDirective, { static: true })
  paymentHost!: PaymentHostDirective;

  private _payment!: PaymentMethod;
  private _order!: ShopOrders;
  private instance!: IPaymentComponent;

  @Input() set payment(value: PaymentMethod) {
    this._payment = value;
  }

  @Input() set order(value: ShopOrders) {
    this._order = value;
  }

  constructor() {}

  ngOnInit(): void {
    const componentClass = PaymentMethodComponent.getComponentClass(
      this._payment
    );

    const viewContainerRef = this.paymentHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef =
      viewContainerRef.createComponent<IPaymentComponent>(componentClass);
    this.instance = componentRef.instance;
    this.instance.payment = this._payment;
    this.instance.order = this._order;
  }

  static getComponentClass(payment: PaymentMethod): Type<any> {
    if (payment.resourcetype == PaymentMethodType.Zelle) {
      return ZellePaymentComponent;
    }
    if (payment.resourcetype == PaymentMethodType.Square) {
      return SquarePaymentComponent;
    }

    return PhoneCallPaymentComponent;
  }
}

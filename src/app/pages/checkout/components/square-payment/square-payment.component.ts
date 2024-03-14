import { Component, Input, OnInit } from '@angular/core';
import { PaymentMethod } from 'src/app/models/payment.models';
import { ShopOrders } from 'src/app/models/shop.models';
import { GTMGrandmercadoService } from 'src/app/services/gtm-grandmercado.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-square-payment',
  templateUrl: './square-payment.component.html',
  styleUrls: ['./square-payment.component.scss'],
})
export class SquarePaymentComponent implements OnInit {
  @Input() payment!: PaymentMethod;
  @Input() order!: ShopOrders;
  squarePaymentData: any;

  constructor(
    private paymentService: PaymentService,
    private gtmGrandmercadoService: GTMGrandmercadoService
  ) {}

  ngOnInit(): void {}

  onRequestLink() {
    this.paymentService
      .payWithSquare(this.payment.id, this.order.order_code)
      .subscribe({
        next: (data: any) => {
          this.squarePaymentData = data;
          this.gtmGrandmercadoService.trackAddPaymentInfo(
            this.order,
            this.payment.resourcetype
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}

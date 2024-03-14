import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ZelleTransferPaymentMethod } from 'src/app/models/payment.models';
import { ShopOrders } from 'src/app/models/shop.models';
import { GTMGrandmercadoService } from 'src/app/services/gtm-grandmercado.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-zelle-payment',
  templateUrl: './zelle-payment.component.html',
  styleUrls: ['./zelle-payment.component.scss'],
})
export class ZellePaymentComponent implements OnInit {
  @Input() payment!: ZelleTransferPaymentMethod;
  @Input() order!: ShopOrders;

  zelleForm = this.fb.group({
    confirmation_code: [],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private paymentService: PaymentService,
    private router: Router,
    private toastrService: ToastrService,
    private gtmGrandmercadoService: GTMGrandmercadoService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.paymentService
      .payWithZelle(
        this.order.order_code,
        this.zelleForm.value.confirmation_code,
        this.payment.email
      )
      .subscribe({
        next: () => {
          this.toastrService.success('Payment successfull');
          this.router.navigate(['/shop/payment-completed']);
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

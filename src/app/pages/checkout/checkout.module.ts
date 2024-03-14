import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { ShippingAddresseeSelectComponent } from './pages/shipping-addressee-select/shipping-addressee-select.component';
import { TranslateModule } from '@ngx-translate/core';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { PaymentHostDirective } from './directives/payment-host.directive';
import { ZellePaymentComponent } from './components/zelle-payment/zelle-payment.component';
import { PhoneCallPaymentComponent } from './components/phone-call-payment/phone-call-payment.component';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { SquarePaymentComponent } from './components/square-payment/square-payment.component';
import { OrdersDetailsTableComponent } from '../../components/orders-details-table/orders-details-table.component';
import { ReceiverFormComponent } from 'src/app/components/receiver-form/receiver-form.component';
import { ReceiverDetailsComponent } from 'src/app/components/receiver-details/receiver-details.component';

@NgModule({
  declarations: [
    ShippingAddresseeSelectComponent,
    CheckoutComponent,
    OrderDetailsComponent,
    PaymentComponent,
    PaymentMethodComponent,
    PaymentHostDirective,
    ZellePaymentComponent,
    PhoneCallPaymentComponent,
    SquarePaymentComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FlexLayoutModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    ReceiverFormComponent,
    OrdersDetailsTableComponent,
    ReceiverDetailsComponent,
  ],
})
export class CheckoutModule {}

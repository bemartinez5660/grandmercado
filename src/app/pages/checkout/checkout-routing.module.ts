import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ShippingAddresseeSelectComponent } from './pages/shipping-addressee-select/shipping-addressee-select.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {
        path: 'receiver-form',
        component: ShippingAddresseeSelectComponent,
        data: {
          title: 'Datos del Destinatario',
          description: 'Datos del destinatario',
          ogTitle: 'Datos del destinatario',
        },
      },
      {
        path: 'order-details',
        component: OrderDetailsComponent,
        data: {
          title: 'Detalles de la Orden',
          description: 'Obtén detalles de la orden de compra',
          ogTitle: 'Obtén detalles de la orden de compra',
        },
      },
      {
        path: 'payment/:order-code',
        component: PaymentComponent,
        data: {
          title: 'Pago',
          description: 'Proceda a realizar el pagar',
          ogTitle: 'Proceda a realizar el pago',
        },
      },
      {
        path: '',
        redirectTo: 'receiver-form',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentCompletedComponent } from './payment-completed.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentCompletedComponent,
    data: {
      title: 'Pago Completado',
      description: 'El proceso de pago ha sido completado exitosamente',
      ogTitle: 'El proceso de pago ha sido completado exitosamente',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentCompletedRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './cart-details.component';

const routes: Routes = [
  {
    path: '',
    component: CartDetailsComponent,
    data: {
      title: 'Carrito de Compra',
      description: 'Toma tu carrito y agrega los mejores productos',
      ogTitle: 'Toma tu carrito y agrega los mejores productos',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartDetailsRoutingModule {}

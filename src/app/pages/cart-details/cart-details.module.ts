import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartDetailsRoutingModule } from './cart-details-routing.module';
import { CartDetailsComponent } from './cart-details.component';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CartDetailsComponent],
  imports: [
    CommonModule,
    CartDetailsRoutingModule,
    FlexLayoutModule,
    ProductCartComponent,
    TranslateModule,
  ],
})
export class CartDetailsModule {}

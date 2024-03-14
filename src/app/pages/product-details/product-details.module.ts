import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

import { DeliveryTimePipe } from 'src/app/pipes/delivery-time.pipe';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    MatButtonModule,
    SafeHtmlPipe,
    DeliveryTimePipe,
  ],
})
export class ProductDetailsModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ProductCollectionRoutingModule } from './product-collection-routing.module';
import { ProductCollectionComponent } from './product-collection.component';

@NgModule({
  declarations: [ProductCollectionComponent],
  imports: [
    CommonModule,
    ProductCollectionRoutingModule,
    FlexLayoutModule,
    ProductCardComponent,
  ],
})
export class ProductCollectionModule {}

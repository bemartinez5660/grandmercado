import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryChipsComponent } from './../../components/category-chips/category-chips.component';

import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DepartmentSlidesComponent } from 'src/app/components/department-slides/department-slides.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { BannerSectionComponent } from '../../components/banner-section/banner-section.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    FlexLayoutModule,
    ProductCardComponent,
    BannerSectionComponent,
    CategoryChipsComponent,
    PaginationComponent,
    DepartmentSlidesComponent,
    TranslateModule,
  ],
})
export class ProductListModule {}

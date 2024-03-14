import { BannerSectionComponent } from './../../components/banner-section/banner-section.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopHomeRoutingModule } from './shop-home-routing.module';
import { ShopHomeComponent } from './shop-home.component';
import { PoductsSlidesComponent } from '../../components/poducts-slides/poducts-slides.component';
import { SwiperModule } from 'swiper/angular';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryChipsComponent } from '../../components/category-chips/category-chips.component';
import { DepartmentSlidesComponent } from '../../components/department-slides/department-slides.component';

@NgModule({
  declarations: [ShopHomeComponent, PoductsSlidesComponent],
  imports: [
    CommonModule,
    ShopHomeRoutingModule,
    TranslateModule,
    SwiperModule,
    ProductCardComponent,
    CategoryChipsComponent,
    BannerSectionComponent,
    DepartmentSlidesComponent,
  ],
})
export class ShopHomeModule {}

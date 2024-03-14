import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { ShopShellComponent } from './components/shop-shell/shop-shell.component';
import { ShopNavbarComponent } from './components/shop-navbar/shop-navbar.component';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { CartMenuComponent } from '../components/cart-menu/cart-menu.component';
import { ProvinceSelectComponent } from '../components/province-select/province-select.component';
import { ShopFooterComponent } from './components/shop-footer/shop-footer.component';
import { ShopStoreModule } from 'src/app/shop-store';
import { MatButtonModule } from '@angular/material/button';
import { DepartmentSlidesComponent } from 'src/app/components/department-slides/department-slides.component';
import { CategoriesSlidesComponent } from 'src/app/components/categories-slides/categories-slides.component';
import { HeaderDepartmentsComponent } from './components/header-departments/header-departments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SidenavService } from './services/sidenav.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    CartMenuComponent,
    ProvinceSelectComponent,
    ShopStoreModule,
    DepartmentSlidesComponent,
    CategoriesSlidesComponent,
  ],
  declarations: [
    ShopShellComponent,
    ShopNavbarComponent,
    ShopFooterComponent,
    HeaderDepartmentsComponent,
    SearchInputComponent,
  ],
  providers: [SidenavService],
})
export class ShopShellModule {}

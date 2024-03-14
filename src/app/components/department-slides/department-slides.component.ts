import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map } from 'rxjs';
import {
  Category,
  CategorySlide,
  Departament,
  DepartmentSlide,
} from 'src/app/models/shop.models';
import { AppState } from 'src/app/root-store';
import { DepartmentCategoryMenuService } from 'src/app/services/department-category-menu.service';
import { DepartamentSelectors } from 'src/app/shop-store/departament-store';
import { SwiperOptions } from 'swiper';
import { SwiperModule } from 'swiper/angular';

// import Swiper core and required modules
import { animate, style, transition, trigger } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import SwiperCore, { Navigation } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { CategoriesSlidesComponent } from '../categories-slides/categories-slides.component';
import { CategorySelectors } from 'src/app/shop-store/category-store';

// install Swiper modulesonSelectDepartment
SwiperCore.use([Navigation]);

export interface SlidesData {
  departments: DepartmentSlide[];
  categories?: CategorySlide[];
  selected_departament: string;
  selected_category: string;
}

@Component({
  selector: 'app-department-slides',
  templateUrl: './department-slides.component.html',
  styleUrls: ['./department-slides.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SwiperModule,
    TranslateModule,
    CategoriesSlidesComponent,
  ],
  animations: [
    trigger('showCategories', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
          style({ opacity: 1, height: '*' })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
          style({ opacity: 0, height: 0 })
        ),
      ]),
    ]),
  ],
})
export class DepartmentSlidesComponent implements OnInit {
  @Input() canNavigate = false;
  selectedDepartment!: Departament;
  selectedCategory!: Category;
  departmentData!: SlidesData;

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  swiperConfig: SwiperOptions = {
    spaceBetween: 50,
    slidesPerView: 6,
    centerInsufficientSlides: true,
    allowTouchMove: true,
    breakpoints: {
      240: {
        slidesPerView: 3.5,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 3.5,
        spaceBetween: 10,
      },
      600: {
        slidesPerView: 3.5,
        spaceBetween: 20,
      },
      960: {
        slidesPerView: 4.5,
      },
      1366: {
        slidesPerView: 6,
      },
    },
  };

  constructor(
    private shopStore: Store<AppState>,
    private router: Router,
    private menuService: DepartmentCategoryMenuService
  ) {
    // Get Department List, Category List, Selected Department and Selected Category
    combineLatest({
      departments: this.shopStore.pipe(
        select(DepartamentSelectors.selectAllDepartaments),
        filter((data) => data.length > 0),
        map((data: any) =>
          data.map((item: any) => {
            return { ...item, selected: false };
          })
        )
      ),
      categories: this.shopStore.pipe(
        select(CategorySelectors.selectAllCategories),
        filter((data) => data.length > 0),
        map((data: any) =>
          data.map((item: any) => {
            return { ...item, selected: false };
          })
        )
      ),
      selected_departament: this.menuService.getDepartament$,
      selected_category: this.menuService.getCategory$,
    }).subscribe((resp) => {
      this.departmentData = resp;

      const department = this.departmentData.departments.find(
        (item) => item.slug == this.departmentData.selected_departament
      );
      const category = this.departmentData.categories?.find(
        (item) => item.slug == this.departmentData.selected_category
      );
      if (department) {
        this.selectedDepartment = department;
      }
      if (category) {
        this.selectedCategory = category;
      }
    });
  }

  ngOnInit(): void {}

  onSelectDepartment(selectedDepartment: number) {
    const array = this.departmentData.departments;
    for (let index = 0; index < array.length; index++) {
      if (index === selectedDepartment) {
        array[index].selected = true;
        this.selectedDepartment = array[index];
      } else {
        array[index].selected = false;
      }
    }
    this.swiper?.swiperRef.slideTo(selectedDepartment);
    this.menuService.setDepartament(array[selectedDepartment].slug);
    if (this.canNavigate)
      this.router.navigate([`products/${array[selectedDepartment].slug}`], {
        queryParamsHandling: 'preserve',
      });
  }

  onSwiper(selectedSlug: string) {
    const department = this.departmentData.departments.find(
      (item) => item.slug == selectedSlug
    );
    if (department) {
      const departmentIndex =
        this.departmentData.departments.indexOf(department);
      this.swiper?.swiperRef.slideTo(departmentIndex);
    }
  }

  getDepartmentData(slug: string) {
    return this.shopStore.select(DepartamentSelectors.selectEntityBySlug(slug));
  }
  getCategoryData(slug: string) {
    return this.shopStore.select(CategorySelectors.selectEntityBySlug(slug));
  }
}

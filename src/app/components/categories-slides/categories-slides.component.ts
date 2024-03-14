import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import {
  Category,
  CategorySlide,
  Departament,
} from 'src/app/models/shop.models';
import { AppState } from 'src/app/root-store';
import { DepartmentCategoryMenuService } from 'src/app/services/department-category-menu.service';
import { DepartamentSelectors } from 'src/app/shop-store/departament-store';
import { SwiperOptions } from 'swiper';
import { SwiperComponent, SwiperModule } from 'swiper/angular';

@Component({
  selector: 'app-categories-slides',
  templateUrl: './categories-slides.component.html',
  styleUrls: ['./categories-slides.component.scss'],
  standalone: true,
  imports: [CommonModule, SwiperModule, TranslateModule],
})
export class CategoriesSlidesComponent implements OnDestroy {
  categories: CategorySlide[] = [];
  selected_category!: Category | null;
  selected_departament!: Departament;
  @Input() set department(value: Departament) {
    if (value) {
      this.selected_departament = value;
      this.categories = value.categories.map((data) => {
        return { ...data, selected: false };
      });
    }
  }
  @Input() set category(value: Category) {
    if (value) {
      this.selected_category = value;
    }
  }
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  swiperConfig: SwiperOptions = {
    spaceBetween: 20,
    slidesPerView: 6,
    centerInsufficientSlides: true,
    allowTouchMove: true,
    breakpoints: {
      240: {
        slidesPerView: 2.5,
      },
      480: {
        slidesPerView: 2.5,
      },
      600: {
        slidesPerView: 3.5,
      },
      960: {
        slidesPerView: 4,
      },
      1366: {
        slidesPerView: 5,
      },
    },
  };
  _unsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private menuService: DepartmentCategoryMenuService,
    private readonly store: Store<AppState>
  ) {}

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  onSelectAllCategories() {
    if (this.selected_category) {
      this.selected_category = null;
      this.menuService.setCategory('');
      this.router.navigate([`products/${this.selected_departament.slug}`], {
        queryParamsHandling: 'preserve',
      });
    }
  }

  onSelectCategory(category_index: number, department: number) {
    this.store
      .select(DepartamentSelectors.selectEntityById(department.toString()))
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((data) => {
        if (data) {
          this.markSelectedAndNavigate(category_index, data);
        }
        if (this.menuService.isOpenMenu())
          this.menuService.toggleDepartmentMenu();
      });
  }

  markSelectedAndNavigate(cat_index: number, departament: Departament) {
    const array = this.categories;
    for (let index = 0; index < array.length; index++) {
      if (index === cat_index) {
        array[index].selected = true;
        this.selected_category = array[index];
      } else {
        array[index].selected = false;
      }
    }
    this.swiper?.swiperRef.slideTo(cat_index);
    this.menuService.setCategory(array[cat_index].slug);
    this.router.navigate(
      [`products/${departament.slug}/${array[cat_index].slug}`],
      {
        queryParamsHandling: 'preserve',
      }
    );
  }

  onSwiper(selectedCategory: Category | null) {
    if (this.categories?.length && selectedCategory) {
      const category = this.categories.find(
        (item) => item.slug == selectedCategory.slug
      );
      if (category) {
        const categoryIndex = this.categories.indexOf(category);
        this.swiper?.swiperRef.slideTo(categoryIndex);
      }
    }
  }
}

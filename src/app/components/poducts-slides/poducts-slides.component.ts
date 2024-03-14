import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Category, Departament, Product } from './../../models/shop.models';

// import Swiper core and required modules
import { GTMGrandmercadoService } from 'src/app/services/gtm-grandmercado.service';
import SwiperCore, { Navigation } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { Router } from '@angular/router';
import { AppState } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { DepartamentSelectors } from 'src/app/shop-store/departament-store';
import { filter, map, Subject, takeUntil } from 'rxjs';

// install Swiper modules
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-products-slides',
  templateUrl: './poducts-slides.component.html',
  styleUrls: ['./poducts-slides.component.scss'],
})
export class PoductsSlidesComponent implements OnInit, OnDestroy {
  @Input() departamentId!: number;
  @Input() category!: Category;
  @Input() categoryName: string = '[Nombre de la Categoría]';
  @Input() products!: Product[];
  private _unsubscribe = new Subject<void>();

  @ViewChild('swiper') swiper!: SwiperComponent;

  config: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 4,
    centerInsufficientSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      240: {
        slidesPerView: 1.5,
      },
      480: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 3,
      },
      960: {
        slidesPerView: 4,
      },
      1366: {
        slidesPerView: 5,
      },
      1536: {
        slidesPerView: 5,
      },
    },
  };

  constructor(
    private gtmGrandmercadoService: GTMGrandmercadoService,
    private router: Router,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.gtmGrandmercadoService.trackViewItemListFromCategorySlides(
      this.products,
      this.categoryName
    );
  }

  onNext(): void {
    this.swiper.swiperRef.slideNext();
  }
  onPrev(): void {
    this.swiper.swiperRef.slidePrev();
  }

  onSelect(product: Product) {
    this.gtmGrandmercadoService.trackSelectItemFromCategorySlide(
      product,
      this.categoryName
    );
  }

  onSeeMore() {
    this.store
      .select(DepartamentSelectors.selectAllDepartaments)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((departaments) => {
        let departament = departaments.find(
          (item) => item.id === this.departamentId
        );
        this.router.navigate([
          `products/${departament?.slug}/${this.category.slug}`,
        ]);
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}

import { HomePage } from './../../models/ui.models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import SwiperCore, { SwiperOptions, Autoplay } from 'swiper';
import { UIService } from 'src/app/services/ui.service';
import { MetaTagService } from 'src/app/services/meta-tag.service';
import { DepartmentCategoryMenuService } from 'src/app/services/department-category-menu.service';

SwiperCore.use([Autoplay]);
@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss'],
})
export class ShopHomeComponent implements OnInit, OnDestroy {
  homePage$!: Observable<HomePage>;
  private _onDestroy = new Subject<void>();

  constructor(
    private uiService: UIService,
    private metaTagService: MetaTagService,
    private menuService: DepartmentCategoryMenuService
  ) {}

  ngOnInit(): void {
    // Clear Department and Cateory Filters
    this.menuService.setDepartament('');
    this.menuService.setCategory('');
    // Get Home Page Data
    this.homePage$ = this.uiService.getHomePage().pipe(
      takeUntil(this._onDestroy),
      map((result) => {
        return {
          ...result,
          categories: result.categories.sort((a, b) =>
            a.order > b.order ? 1 : -1
          ),
        };
      })
    );
    this.homePage$.pipe(takeUntil(this._onDestroy)).subscribe((homePage) => {
      if (homePage.banners.length > 0) {
        const banner = homePage.banners[0];
        this.metaTagService.updateMetaTags({
          ogImage: banner.image_large,
        });
      }
    });
    this.uiService
      .getMetaTags()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((metaTags) => {
        if (metaTags.title) {
          this.metaTagService.updateTitle(metaTags.title);
        }
        this.metaTagService.updateMetaTags(metaTags);
      });
  }

  config: SwiperOptions = {
    spaceBetween: 0,
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    autoplay: {
      delay: 5000,
    },
  };

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}

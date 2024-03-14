import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { DepartmentCategoryMenuService } from 'src/app/services/department-category-menu.service';
import { GTMGrandmercadoService } from 'src/app/services/gtm-grandmercado.service';
import { MetaTagService } from 'src/app/services/meta-tag.service';
import { ProductService } from 'src/app/services/product.service';
import { ShopState } from 'src/app/shop-store';
import { DepartamentSelectors } from 'src/app/shop-store/departament-store';
import {
  Category,
  Departament,
  Product,
  ProductList,
  ProductSearchParams,
} from '../../models/shop.models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  params$ = this.route.paramMap;
  category_departament = new BehaviorSubject<
    Category | Departament | undefined
  >(undefined);
  q = new BehaviorSubject<string>('');
  current_page = new BehaviorSubject<number>(1);
  _unsubscribe = new Subject();
  allProducts$: Observable<ProductList> = combineLatest({
    q: this.q,
    category_departament: this.category_departament,
    page: this.current_page,
  }).pipe(
    takeUntil(this._unsubscribe),
    map(({ q, category_departament, page }) => {
      let params: ProductSearchParams = {
        q: q,
        departament: undefined,
        category: undefined,
        page: page,
      };

      if (category_departament !== undefined) {
        if ('departament' in (category_departament as Category)) {
          params.category = category_departament.id;
        } else {
          params.departament = category_departament.id;
        }
      }
      return params;
    }),
    switchMap((params: ProductSearchParams) => {
      return this.productService.searchProducts(params);
    })
  );

  constructor(
    private productService: ProductService,
    private shopStore: Store<ShopState>,
    private route: ActivatedRoute,
    private menuService: DepartmentCategoryMenuService,
    private metaTagsService: MetaTagService,
    private gtmGrandmercadoService: GTMGrandmercadoService
  ) {
    this.route.paramMap
      .pipe(
        takeUntil(this._unsubscribe),
        switchMap((param) => {
          const departament = param.get('departament-slug');
          const category = param.get('category-slug');

          let category$: Observable<Category | undefined> = of(undefined);
          let departament$: Observable<Departament | undefined> = of(undefined);

          if (category && departament) {
            this.menuService.setDepartament(departament);
            this.menuService.setCategory(category);
            category$ = this.shopStore
              .select(DepartamentSelectors.selectEntityBySlug(departament))
              .pipe(
                map((item) =>
                  item?.categories.find((cat) => cat.slug == category)
                )
              );
          }

          if (departament && !category) {
            this.menuService.setDepartament(departament);
            this.menuService.setCategory('');
            departament$ = this.shopStore.select(
              DepartamentSelectors.selectEntityBySlug(departament)
            );
          }

          if (!departament && !category) {
            this.menuService.setCategory('');
            this.menuService.setDepartament('');
          }

          return combineLatest({
            category: category$,
            departament: departament$,
          });
        })
      )
      .subscribe(({ category, departament }) => {
        const data = category || departament;
        if (data) {
          this.category_departament.next(data);
          this.current_page.next(1);
          this.updateRouteMetaTags(data);
        }
      });

    this.route.queryParams
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((queryParams) => {
        const q = queryParams['q'];
        if (q) {
          this.q.next(q);
        } else {
          this.q.next('');
        }
      });
  }

  updateRouteMetaTags(data: Category | Departament) {
    const title = data.name;
    const routeData: Data = {
      ogTitle: title,
      ogDescription: data.description,
      ogImage: data.image_large,
      ogType: 'product.group',
      description: data.description,
    };
    this.metaTagsService.updateTitle(title);
    this.metaTagsService.updateMetaTags(routeData);
  }

  ngOnInit(): void {
    combineLatest({
      products: this.allProducts$,
      taxonomy: this.category_departament,
      q: this.q,
    })
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(({ products, taxonomy, q }) => {
        this.gtmGrandmercadoService.trackViewItemList(products, q, taxonomy);
      });
  }

  onGoTo(page: number) {
    this.current_page.next(page);
  }

  onNext(page: number) {
    this.current_page.next(page + 1);
  }

  onPrev(page: number) {
    this.current_page.next(page - 1);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }

  onProductSelect(product: Product) {
    this.gtmGrandmercadoService.trackSelectItem(
      product,
      this.q.value,
      this.category_departament.value
    );
  }
}

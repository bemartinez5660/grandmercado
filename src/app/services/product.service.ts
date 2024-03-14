import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import {
  Collection,
  CollectionInput,
  Product,
  ProductInput,
  ProductList,
  ProductListInput,
  ProductSearchParams,
} from 'src/app/models/shop.models';
import { AppState } from 'src/app/root-store';
import { environment } from 'src/environments/environment';
import { ProvinceSelectors } from '../shop-store';
import { ProviderSelectors } from '../shop-store/provider-store';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private SHOP_URL = environment.serverUrl;
  private providers$ = this.store.select(ProviderSelectors.selectAllProviders);
  private currentProvince$ = this.store.select(
    ProvinceSelectors.selectSelectedProvince
  );

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getProducts(): Observable<Product[]> {
    return combineLatest({
      providers: this.providers$,
      province: this.currentProvince$,
    }).pipe(
      switchMap(({ providers, province }) => {
        let queryParams = new HttpParams();

        if (province) {
          queryParams = queryParams.set('provider__provinces', province.id);
        }

        return this.http
          .get<ProductListInput>(`${this.SHOP_URL}/products/`, {
            params: queryParams,
          })
          .pipe(
            map((data) =>
              data.results.map((result) => {
                const provider = providers.find(
                  (ele) => result.provider === ele.id
                );
                return { ...result, provider };
              })
            )
          );
      })
    );
  }

  getProduct(identifier: string): Observable<Product> {
    const url = `${this.SHOP_URL}/products/${identifier}/`;
    return combineLatest({
      providers: this.providers$,
      province: this.currentProvince$,
    }).pipe(
      switchMap(({ providers, province }) => {
        let queryParams = new HttpParams();

        if (province) {
          queryParams = queryParams.set('province', province.id);
        }

        return this.http.get<ProductInput>(url, { params: queryParams }).pipe(
          map((product) => {
            const provider = providers.find(
              (ele) => product.provider === ele.id
            );
            return { ...product, provider };
          })
        );
      })
    );
  }

  getProductsByDepartament(
    page: number,
    departament_id: number
  ): Observable<ProductList> {
    return combineLatest({
      providers: this.providers$,
      province: this.currentProvince$,
    }).pipe(
      switchMap(({ providers, province }) => {
        let queryParams = new HttpParams();
        queryParams = queryParams.set('page', page);
        return this.http
          .get<ProductListInput>(
            `${this.SHOP_URL}/departaments/${departament_id}/${province?.id}/products/`,
            { params: queryParams }
          )
          .pipe(
            map((productList: ProductListInput) => {
              return {
                ...productList,
                results: productList.results.map((product: ProductInput) => {
                  const provider = providers.find(
                    (ele) => product.provider === ele.id
                  );
                  const newProduct: Product = { ...product, provider };
                  return newProduct;
                }),
              };
            })
          );
      })
    );
  }

  getProductsByCategory(
    page: number,
    category_id: number
  ): Observable<ProductList> {
    return combineLatest({
      providers: this.providers$,
      province: this.currentProvince$,
    }).pipe(
      switchMap(({ providers, province }) => {
        let queryParams = new HttpParams();
        queryParams = queryParams.set('page', page);
        return this.http
          .get<ProductListInput>(
            `${this.SHOP_URL}/categories/${category_id}/${province?.id}/products/`,
            {
              params: queryParams,
            }
          )
          .pipe(
            map((productList: ProductListInput) => {
              return {
                ...productList,
                results: productList.results.map((product: ProductInput) => {
                  const provider = providers.find(
                    (ele) => product.provider === ele.id
                  );
                  const newProduct: Product = { ...product, provider };
                  return newProduct;
                }),
              };
            })
          );
      })
    );
  }

  getProductsByCollection(slug: string): Observable<Collection> {
    return combineLatest({
      providers: this.providers$,
      province: this.currentProvince$,
    }).pipe(
      switchMap(({ providers, province }) => {
        let queryParams = new HttpParams();
        if (province) {
          queryParams = queryParams.set('province', province?.id);
        }
        return this.http
          .get<CollectionInput>(
            `${this.SHOP_URL}/featured-products-collections/${slug}/`,
            { params: queryParams }
          )
          .pipe(
            map((collection: CollectionInput) => {
              return {
                ...collection,
                products: collection.products.map((product: ProductInput) => {
                  const provider = providers.find(
                    (ele) => product.provider === ele.id
                  );
                  const newProduct: Product = { ...product, provider };
                  return newProduct;
                }),
              };
            })
          );
      })
    );
  }

  searchProducts(params: ProductSearchParams): Observable<ProductList> {
    return combineLatest({
      providers: this.providers$,
      province: this.currentProvince$,
    }).pipe(
      switchMap(({ providers, province }) => {
        let queryParams = new HttpParams();

        if (params.page) {
          queryParams = queryParams.set('page', params.page);
        }
        if (province) {
          queryParams = queryParams.set('province', province.id);
        }
        if (params.departament) {
          queryParams = queryParams.set('departament', params.departament);
        }
        if (params.category) {
          queryParams = queryParams.set('category', params.category);
        }
        if (params.q) {
          queryParams = queryParams.set('q', params.q);
        }

        return this.http
          .get<ProductListInput>(`${this.SHOP_URL}/products/search/`, {
            params: queryParams,
          })
          .pipe(
            map((productList) => {
              return {
                ...productList,
                results: productList.results.map((product: ProductInput) => {
                  const provider = providers.find(
                    (ele) => product.provider === ele.id
                  );
                  const newProduct: Product = { ...product, provider };
                  return newProduct;
                }),
              };
            })
          );
      })
    );
  }
}

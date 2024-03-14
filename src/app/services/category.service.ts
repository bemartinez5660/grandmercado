import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppState } from '../root-store';
import { ProvinceSelectors } from '../shop-store';

export interface Category {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  image_large: string;
  image_medium: string;
  image_small: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private SHOP_URL = environment.serverUrl;
  private currentProvince$ = this.store.select(
    ProvinceSelectors.selectSelectedProvince
  );
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getCategories() {
    this.currentProvince$.pipe(
      switchMap((province) => {
        let queryParams = new HttpParams();
        if (province) {
          queryParams = queryParams.set('province', province.id);
        }
        return this.http.get<Category[]>(`${this.SHOP_URL}/categories/`, {
          params: queryParams,
        });
      })
    );
  }

  getCategoryProducts(identifier: string) {
    return this.http.get<Category>(
      `${this.SHOP_URL}/categories/${identifier}/products/`
    );
  }
}

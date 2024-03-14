import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppState } from '../root-store';
import { ProvinceSelectors } from '../shop-store';
import { Category, Departament } from '../models/shop.models';

@Injectable({
  providedIn: 'root',
})
export class DepartamentService {
  private SHOP_URL = environment.serverUrl;
  private currentProvince$ = this.store.select(
    ProvinceSelectors.selectSelectedProvince
  );
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  requestDepartaments(): Observable<Departament[]> {
    return this.currentProvince$.pipe(
      switchMap((province) => {
        let queryParams = new HttpParams();
        if (province) {
          queryParams = queryParams.set('province', province.id);
        }

        return this.http.get<Departament[]>(this.SHOP_URL + '/departaments/', {
          params: queryParams,
        });
      })
    );
  }

  requestCategories(): Observable<Category[]> {
    return this.currentProvince$.pipe(
      switchMap((province) => {
        console.log(province);
        let queryParams = new HttpParams();
        if (province) {
          queryParams = queryParams.set('province', province.id);
        }

        return this.http.get<Category[]>(this.SHOP_URL + '/categories/', {
          params: queryParams,
        });
      })
    );
  }

  getDepartamentProducts(identifier: string) {
    return this.http.get<Departament>(
      `${this.SHOP_URL}/departaments/${identifier}/products/`
    );
  }
}

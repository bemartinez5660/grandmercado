import { HomePage, MetaTags } from './../models/ui.models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { AppState } from '../root-store';
import { ProvinceSelectors } from '../shop-store';
import { switchMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  private BASE_URL = environment.serverUrl;
  private currentProvince$ = this.store.pipe(
    select(ProvinceSelectors.selectSelectedProvince)
  );

  constructor(private httpClient: HttpClient, private store: Store<AppState>) {}

  getHomePage(): Observable<HomePage> {
    return this.currentProvince$.pipe(
      switchMap((province) => {
        let queryParams = new HttpParams();
        if (province) {
          queryParams = queryParams.set('province', province.id);
        }

        return this.httpClient.get<HomePage>(`${this.BASE_URL}/ui/home/`, {
          params: queryParams,
        });
      })
    );
  }

  getMetaTags(): Observable<MetaTags> {
    return this.httpClient.get<MetaTags>(`${this.BASE_URL}/ui/meta-tags/`);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, Observable, exhaustMap, of, combineLatest } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppState } from '../root-store';
import { OrderList, ShopOrders } from '../models/shop.models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private BASE_URL = environment.serverUrl;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getShopOrders(order_code: string): Observable<ShopOrders> {
    return this.http.get<ShopOrders>(`${this.BASE_URL}/orders/${order_code}/`);
  }

  getUserOrders(page: number): Observable<OrderList> {
    let params = new HttpParams();
    params = params.set('page', page);
    return this.http
      .get<OrderList>(`${this.BASE_URL}/orders/`, { params })
      .pipe(
        map((resp: OrderList) => {
          return {
            ...resp,
            results: resp.results.map((order) => {
              return {
                ...order,
                isExpanded: false,
              };
            }),
          };
        })
      );
  }
}

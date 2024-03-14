import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subscriptions } from '../models/shop.models';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private SHOP_URL = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getSubscriptions() {
    return this.http.get<Subscriptions>(`${this.SHOP_URL}/subscription/`);
  }

  updateSubscriptions(body: Subscriptions) {
    return this.http.put<Subscriptions>(`${this.SHOP_URL}/subscription/`, body);
  }
}

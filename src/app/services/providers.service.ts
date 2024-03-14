import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShopProvider } from 'src/app/models/shop.models';

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  private SHOP_URL = environment.serverUrl;

  constructor(private http: HttpClient) {}

  requestProviders(): Observable<any> {
    return this.http.get<ShopProvider[]>(this.SHOP_URL + '/providers/');
  }
}

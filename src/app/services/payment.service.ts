import { PaymentMethod } from '../models/payment.models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private BASE_URL = environment.serverUrl;

  getPaymentMethods(order: string): Observable<PaymentMethod[]> {
    let params = new HttpParams();
    params = params.set('order', order);
    return this.http.get<PaymentMethod[]>(`${this.BASE_URL}/payment-methods/`, {
      params,
    });
  }

  /**
   *
   * @param order Order code
   * @param confirmationCode Zelle transfer confirmation code
   * @param email Email of the Zelle Account to transfer
   */
  payWithZelle(order: string, confirmationCode: string, email: string) {
    return this.http.post(`${this.BASE_URL}/payment/zelle/create/`, {
      order: order,
      confirmation_code: confirmationCode,
      email: email,
    });
  }

  /**
   *
   * @param id payment type id
   * @param code Order code
   */
  payWithSquare(id: number, code: string) {
    return this.http.post(
      `${this.BASE_URL}/payment/square/payment-link/create/`,
      {
        order: code,
        payment_method: id,
      }
    );
  }

  constructor(private http: HttpClient) {}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, Observable, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LOCAL_STORAGE_DEFAULT_RECEIVER } from '../models/app.models';
import { ShippingAddressee } from '../models/shop.models';
import { AppState } from '../root-store';
import { LocalStorageItem, LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ShippingAddresseeService {
  private BASE_URL = environment.serverUrl;
  private _unsubscribe = new Subject<void>();
  private _selectReceiver: BehaviorSubject<string | null>;

  public selectReceiver$: Observable<string | null>;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private storageSevice: LocalStorageService
  ) {
    this.listenReceiverSelect();
    const receiver = storageSevice.getItem(LOCAL_STORAGE_DEFAULT_RECEIVER);
    this._selectReceiver = new BehaviorSubject(receiver);
    this.selectReceiver$ = this._selectReceiver.asObservable();
  }

  getShippingAddressees() {
    return this.http.get<ShippingAddressee[]>(
      `${this.BASE_URL}/shipping-addresses/`
    );
  }

  getShippingAddresee(id: number) {
    return this.http.get<ShippingAddressee>(
      `${this.BASE_URL}/shipping-addresses/${id}`
    );
  }

  createShippingAddressee(body: ShippingAddressee) {
    return this.http.post<ShippingAddressee>(
      `${this.BASE_URL}/shipping-addresses/`,
      body
    );
  }

  updateShippingAddressee(id: string, data: ShippingAddressee) {
    return this.http.patch<ShippingAddressee>(
      `${this.BASE_URL}/shipping-addresses/${id}`,
      data
    );
  }

  deleteShippingAddressee(id: string) {
    return this.http.delete<ShippingAddressee>(
      `${this.BASE_URL}/shipping-addresses/${id}`
    );
  }

  public selectReceiver(receiverId: number | null): void {
    this.storageSevice.setItem({
      key: LOCAL_STORAGE_DEFAULT_RECEIVER,
      value: receiverId ? receiverId.toString() : '',
    });
  }

  private listenReceiverSelect(): void {
    this.storageSevice.setItem$
      .pipe(
        takeUntil(this._unsubscribe),
        filter(
          (item: LocalStorageItem) =>
            item.key === LOCAL_STORAGE_DEFAULT_RECEIVER
        )
      )
      .subscribe((item: LocalStorageItem) => {
        const provinceId = item.value;
        this.emitReceiverSelected(provinceId);
      });
  }

  private emitReceiverSelected(id: string): void {
    this._selectReceiver.next(id);
  }
}

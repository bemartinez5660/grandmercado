import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, filter, Observable, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LOCAL_STORAGE_PROVINCE } from '../models/cart.models';
import { LocalStorageItem, LocalStorageService } from './local-storage.service';
import { Province } from 'src/app/models/shop.models';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService implements OnDestroy {
  private SHOP_URL = environment.serverUrl;
  private _unsubscribe = new Subject<void>();
  private _selectProvince: BehaviorSubject<string | null>;

  public selectProvince$: Observable<string | null>;

  constructor(
    private http: HttpClient,
    private storageSevice: LocalStorageService
  ) {
    this.listenProvinceSelect();
    const province = storageSevice.getItem(LOCAL_STORAGE_PROVINCE);
    this._selectProvince = new BehaviorSubject(province);
    this.selectProvince$ = this._selectProvince.asObservable();
  }

  requestProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(this.SHOP_URL + '/provinces/');
  }

  private listenProvinceSelect(): void {
    this.storageSevice.setItem$
      .pipe(
        takeUntil(this._unsubscribe),
        filter((item: LocalStorageItem) => item.key === LOCAL_STORAGE_PROVINCE)
      )
      .subscribe((item: LocalStorageItem) => {
        const provinceId = item.value;
        this.emitProvinceSelected(provinceId);
      });
  }

  private emitProvinceSelected(id: string): void {
    this._selectProvince.next(id);
  }

  public selectProvince(provinceId: number): void {
    this.storageSevice.setItem({
      key: LOCAL_STORAGE_PROVINCE,
      value: provinceId.toString(),
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { AppState } from 'src/app/root-store';
import { ProvinceSelectors } from 'src/app/shop-store';
import { ProviderSelectors } from 'src/app/shop-store/provider-store';

@Component({
  selector: 'app-delivery-policy',
  templateUrl: './delivery-policy.component.html',
  styleUrls: ['./delivery-policy.component.scss'],
})
export class DeliveryPolicyComponent implements OnInit {
  provinces$ = this.store.pipe(select(ProvinceSelectors.selectAllProvinces));
  providers$ = combineLatest({
    providers: this.store.pipe(select(ProviderSelectors.selectAllProviders)),
    provinces: this.provinces$,
  }).pipe(
    map(({ providers, provinces }) => {
      return providers.map((provider) => {
        const province_availability = provider.province_availability.map(
          (province_availability) => {
            const province = provinces.find(
              (p) => p.id === province_availability.province
            );
            if (province) {
              return {
                ...province_availability,
                province: province.name,
              };
            }
            return province_availability;
          }
        );

        return {
          ...provider,
          province_availability: province_availability,
        };
      });
    })
  );

  displayedColumns: string[] = ['province', 'delivery_time', 'net_price'];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}
}

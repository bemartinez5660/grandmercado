import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ProvinceService } from 'src/app/services/province.service';
import { ShopState } from '..';
import { ProvinceActions } from '.';
import { EMPTY, exhaustMap, map, of, switchMap, withLatestFrom } from 'rxjs';

@Injectable()
export class ProvinceEffects implements OnInitEffects {
  fetchProvincesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProvinceActions.requestProvinces),
      exhaustMap(() =>
        this.provinceService.requestProvinces().pipe(
          switchMap((provinces) => {
            return of(ProvinceActions.fullfillProvinces({ provinces }));
          })
        )
      )
    )
  );

  fullfillProvincesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProvinceActions.fullfillProvinces),
      withLatestFrom(this.provinceService.selectProvince$.pipe()),
      switchMap(([action, provinceId]) => {
        // If some provindeId stored parse it and check for validity
        if (provinceId) {
          const storedProvinceId = Number.parseInt(provinceId);
          if (storedProvinceId) {
            // Check province is valid
            const province = action.provinces.find(
              (p) => p.id === storedProvinceId
            );
            if (province) {
              return of(
                ProvinceActions.selectProvince({
                  provinceId: storedProvinceId,
                })
              );
            }
          }
        }
        if (action.provinces.length > 0) {
          // Try to set Havana if not previous province selected
          const havana = action.provinces.find((p) =>
            p.name.includes('Habana')
          );
          if (havana) {
            return of(
              ProvinceActions.selectProvince({ provinceId: havana.id })
            );
          }
          // Set first province if Havana not found
          return of(
            ProvinceActions.selectProvince({
              provinceId: action.provinces[0].id,
            })
          );
        }

        return EMPTY;
      })
    )
  );

  selectProvinceEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProvinceActions.selectProvince),
        map((action) => {
          this.provinceService.selectProvince(action.provinceId);
        })
      ),
    { dispatch: false }
  );

  ngrxOnInitEffects() {
    return ProvinceActions.requestProvinces();
  }

  constructor(
    private actions$: Actions,
    private provinceService: ProvinceService,
    private store: Store<ShopState>
  ) {}
}

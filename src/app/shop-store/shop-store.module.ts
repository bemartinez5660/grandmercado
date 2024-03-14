import { shopFeatureKey } from './shop-store.state';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProvinceReducer } from './province-store';
import { ProvinceEffects } from './province-store';
import { ProviderEffects, ProviderReducer } from './provider-store';
import { DepartamentEffects, DepartamentReducer } from './departament-store';
import { ReceiverEffects, ReceiverReducer } from './receiver-store';
import { CategoryEffects, CategoryReducer } from './category-store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(shopFeatureKey, {
      provinces: ProvinceReducer,
      providers: ProviderReducer,
      departaments: DepartamentReducer,
      categories: CategoryReducer,
      receiver: ReceiverReducer,
    }),
    EffectsModule.forFeature([
      ProvinceEffects,
      ProviderEffects,
      DepartamentEffects,
      CategoryEffects,
      ReceiverEffects,
    ]),
  ],
})
export class ShopStoreModule {}

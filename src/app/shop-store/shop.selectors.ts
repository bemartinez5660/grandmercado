import { createFeatureSelector } from '@ngrx/store';
import { shopFeatureKey, State } from './shop-store.state';

export const selectShopFeature = createFeatureSelector<State>(shopFeatureKey);

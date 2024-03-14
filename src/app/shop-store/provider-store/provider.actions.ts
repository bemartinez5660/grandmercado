import { createAction, props } from '@ngrx/store';
import { ShopProvider } from 'src/app/models/shop.models';

export const actionType = {
  GET_PROVIDER_LIST: '[Provider] Get Provider List',
  FULLFILL_PROVIDER_LIST: '[Provider] Fullfill Provider List',
};

export const requestProviders = createAction(actionType.GET_PROVIDER_LIST);
export const fullfillProviders = createAction(
  actionType.FULLFILL_PROVIDER_LIST,
  props<{ providers: ShopProvider[] }>()
);

import { createAction, props } from '@ngrx/store';
import { Province } from '../../models/shop.models';

export const actionType = {
  GET_PROVINCE_LIST: '[Province] Get Province List',
  FULLFILL_PROVINCE_LIST: '[Province] Fullfill Province List',
  SELECT_PROVINCE: '[Province] Select Province',
};

export const requestProvinces = createAction(actionType.GET_PROVINCE_LIST);
export const fullfillProvinces = createAction(
  actionType.FULLFILL_PROVINCE_LIST,
  props<{ provinces: Province[] }>()
);
export const selectProvince = createAction(
  actionType.SELECT_PROVINCE,
  props<{ provinceId: number }>()
);

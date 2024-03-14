import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/shop.models';

export const actionType = {
  GET_CATEGORY_LIST: '[Category] Get Category List',
  FULLFILL_CATEGORY_LIST: '[Category] Fullfill Category List',
};

export const requestCategories = createAction(actionType.GET_CATEGORY_LIST);
export const fullfillCategories = createAction(
  actionType.FULLFILL_CATEGORY_LIST,
  props<{ categories: Category[] }>()
);

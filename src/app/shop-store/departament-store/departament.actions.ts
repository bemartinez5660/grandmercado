import { createAction, props } from '@ngrx/store';
import { Departament } from '../../models/shop.models';

export const actionType = {
  GET_DEPARTAMENT_LIST: '[Departament] Get Departament List',
  FULLFILL_DEPARTAMENT_LIST: '[Departament] Fullfill Departament List',
};

export const requestDepartaments = createAction(
  actionType.GET_DEPARTAMENT_LIST
);
export const fullfillDepartaments = createAction(
  actionType.FULLFILL_DEPARTAMENT_LIST,
  props<{ departaments: Departament[] }>()
);

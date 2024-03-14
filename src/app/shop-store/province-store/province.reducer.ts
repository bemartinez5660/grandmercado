import { createReducer, on } from '@ngrx/store';
import * as ProvinceActions from './province.actions';
import { initialState, provinceAdapter } from './province.entity';

export const reducer = createReducer(
  initialState,
  on(ProvinceActions.fullfillProvinces, (state, action) =>
    provinceAdapter.addMany(action.provinces, state)
  ),
  on(ProvinceActions.selectProvince, (state, action) => ({
    ...state,
    selectedProvinceId: action.provinceId,
  }))
);

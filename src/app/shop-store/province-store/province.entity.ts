import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Province } from 'src/app/models/shop.models';

export interface State extends EntityState<Province> {
  selectedProvinceId: number | null;
}

export const provinceAdapter: EntityAdapter<Province> =
  createEntityAdapter<Province>();

export const initialState: State = provinceAdapter.getInitialState({
  selectedProvinceId: null,
});

import { selectShopFeature } from './../shop.selectors';
import { createSelector } from '@ngrx/store';
import { provinceAdapter } from './province.entity';

// get the selectors
const { selectAll, selectTotal, selectEntities } =
  provinceAdapter.getSelectors();

export const selectProvinceState = createSelector(
  selectShopFeature,
  (state) => state.provinces
);

export const selectAllProvinces = createSelector(
  selectProvinceState,
  selectAll
);

export const selectAllEntities = createSelector(
  selectProvinceState,
  selectEntities
);

export const selectProvinceTotal = createSelector(
  selectProvinceState,
  selectTotal
);

export const selectSelectedProvinceId = createSelector(
  selectProvinceState,
  (state) => state.selectedProvinceId
);

export const selectSelectedProvince = createSelector(
  selectAllEntities,
  selectSelectedProvinceId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId] : null;
  }
);

export const entityExists = (id: string) =>
  createSelector(selectAllEntities, (entities): boolean => {
    return entities[id] == undefined ? false : true;
  });

export const selectEntityById = (id: string) =>
  createSelector(selectAllEntities, (entities) => entities[id]);

export const selectProvinceById = (id: number) =>
  createSelector(selectAllProvinces, (data) =>
    data.find((item) => item.id == id)
  );

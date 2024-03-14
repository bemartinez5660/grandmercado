import { createSelector } from '@ngrx/store';
import { selectShopFeature } from '../shop.selectors';
import { departamentAdapter } from './departament.entity';

// get the selectors
const { selectAll, selectTotal, selectIds, selectEntities } =
  departamentAdapter.getSelectors();

export const selectDepartamentState = createSelector(
  selectShopFeature,
  (state) => state.departaments
);

export const selectAllDepartaments = createSelector(
  selectDepartamentState,
  selectAll
);

export const selectAllEntities = createSelector(
  selectDepartamentState,
  selectEntities
);

export const selectDepartamentTotal = createSelector(
  selectDepartamentState,
  selectTotal
);

export const entityExists = (id: string) =>
  createSelector(selectAllEntities, (entities): boolean => {
    return entities[id] == undefined ? false : true;
  });

export const selectEntityById = (id: string) =>
  createSelector(selectAllEntities, (entities) => entities[id]);

export const selectEntityBySlug = (slug: string) =>
  createSelector(selectAllDepartaments, (data) =>
    data.find((item) => item.slug == slug)
  );

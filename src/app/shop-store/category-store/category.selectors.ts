import { createSelector } from '@ngrx/store';
import { selectShopFeature } from '../shop.selectors';
import { categoryAdapter } from './category.entity';

// get the selectors
const { selectAll, selectTotal, selectIds, selectEntities } =
  categoryAdapter.getSelectors();

export const selectCategoryState = createSelector(
  selectShopFeature,
  (state) => state.categories
);

export const selectAllCategories = createSelector(
  selectCategoryState,
  selectAll
);

export const selectAllEntities = createSelector(
  selectCategoryState,
  selectEntities
);

export const selectCategoryTotal = createSelector(
  selectCategoryState,
  selectTotal
);

export const entityExists = (id: string) =>
  createSelector(selectAllEntities, (entities): boolean => {
    return entities[id] == undefined ? false : true;
  });

export const selectEntityById = (id: string) =>
  createSelector(selectAllEntities, (entities) => entities[id]);

export const selectEntityBySlug = (slug: string) =>
  createSelector(selectAllCategories, (data) =>
    data.find((item) => item.slug == slug)
  );

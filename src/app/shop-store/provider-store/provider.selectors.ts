import { createSelector } from '@ngrx/store';
import { selectShopFeature } from '../shop.selectors';
import { providerAdapter } from './provider.entity';

// get the selectors
const { selectAll, selectTotal, selectIds, selectEntities } =
  providerAdapter.getSelectors();

export const selectProvidersState = createSelector(
  selectShopFeature,
  (state) => state.providers
);

export const selectAllProviders = createSelector(
  selectProvidersState,
  selectAll
);

export const selectAllEntities = createSelector(
  selectProvidersState,
  selectEntities
);

export const selectProviderTotal = createSelector(
  selectProvidersState,
  selectTotal
);

export const entityExists = (id: string) =>
  createSelector(selectAllEntities, (entities): boolean => {
    return entities[id] == undefined ? false : true;
  });

export const selectEntityById = (id: string) =>
  createSelector(selectAllEntities, (entities) => entities[id]);

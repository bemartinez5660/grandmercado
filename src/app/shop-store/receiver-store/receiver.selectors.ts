import { selectShopFeature } from './../shop.selectors';
import { createSelector } from '@ngrx/store';
import { receiverAdapter } from './receiver.entity';

// get the selectors
const { selectAll, selectTotal, selectEntities } =
  receiverAdapter.getSelectors();

export const selectReceiverState = createSelector(
  selectShopFeature,
  (state) => state.receiver
);

export const selectAllReceivers = createSelector(
  selectReceiverState,
  selectAll
);

export const selectAllEntities = createSelector(
  selectReceiverState,
  selectEntities
);

export const selectReceiverTotal = createSelector(
  selectReceiverState,
  selectTotal
);

export const selectSelectedReceiverId = createSelector(
  selectReceiverState,
  (state) => state.selectedReceiverId
);

export const selectSelectedReceiver = createSelector(
  selectAllEntities,
  selectSelectedReceiverId,
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

export const selectReceiverById = (id: number) =>
  createSelector(selectAllReceivers, (data) =>
    data.find((item) => item.id == id)
  );

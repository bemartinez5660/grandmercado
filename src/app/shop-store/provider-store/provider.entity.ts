import { ShopProvider } from 'src/app/models/shop.models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State extends EntityState<ShopProvider> {}

export const providerAdapter: EntityAdapter<ShopProvider> =
  createEntityAdapter<ShopProvider>();

export const initialState: State = providerAdapter.getInitialState();

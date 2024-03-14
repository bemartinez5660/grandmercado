import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Category } from 'src/app/models/shop.models';

export interface State extends EntityState<Category> {}

export const categoryAdapter: EntityAdapter<Category> =
  createEntityAdapter<Category>();

export const initialState: State = categoryAdapter.getInitialState();

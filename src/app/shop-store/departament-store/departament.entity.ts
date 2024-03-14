import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Departament } from 'src/app/models/shop.models';

export interface State extends EntityState<Departament> {}

export const departamentAdapter: EntityAdapter<Departament> =
  createEntityAdapter<Departament>();

export const initialState: State = departamentAdapter.getInitialState();

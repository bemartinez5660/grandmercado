import { createReducer, on } from '@ngrx/store';
import * as DepartamentActions from './departament.actions';
import { initialState, departamentAdapter } from './departament.entity';

export const reducer = createReducer(
  initialState,
  on(DepartamentActions.fullfillDepartaments, (state, action) =>
    departamentAdapter.addMany(action.departaments, state)
  )
);

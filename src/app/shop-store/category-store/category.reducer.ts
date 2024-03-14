import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';
import { initialState, categoryAdapter } from './category.entity';

export const reducer = createReducer(
  initialState,
  on(CategoryActions.fullfillCategories, (state, action) =>
    categoryAdapter.addMany(action.categories, state)
  )
);

import { createReducer, on } from '@ngrx/store';
import * as ProviderActions from './provider.actions';
import { initialState, providerAdapter } from './provider.entity';

export const reducer = createReducer(
  initialState,
  on(ProviderActions.fullfillProviders, (state, action) =>
    providerAdapter.addMany(action.providers, state)
  )
);

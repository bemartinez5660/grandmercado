import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as Authentication from './authentication.reducer';

const getIsLoggedIn = (state: Authentication.State) => state.user !== null;
const getUser = (state: Authentication.State) => state.user;

export const selectAuthenticationState =
  createFeatureSelector<Authentication.State>(Authentication.authFeatureKey);

export const selectIsLoggedIn = createSelector(
  selectAuthenticationState,
  getIsLoggedIn
);
export const selectUser = createSelector(selectAuthenticationState, getUser);
export const selectLoggedUserId = createSelector(
  selectUser,
  (user) => user?.id
);

import { User } from './authentication.models';
import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './authentication.actions';

enum STATUS {
  IDLE,
  LOADING,
  FAILED,
  SUCCEDED,
}

export interface State {
  status: STATUS;
  error: any;
  user: User | null;
}

export const initialState: State = {
  status: STATUS.IDLE,
  error: null,
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginRequest, (state, action) => ({
    ...state,
    status: STATUS.LOADING,
  })),
  on(AuthActions.loginFulfilled, (state, action) => ({
    ...state,
    isLoggedIn: true,
    status: STATUS.SUCCEDED,
    user: action.user,
  })),
  on(AuthActions.loginFailed, (state, action) => {
    return {
      ...state,
      status: STATUS.FAILED,
      error: action.error,
    };
  }),
  on(AuthActions.logoutRequest, (state, action) => ({
    ...state,
    status: STATUS.LOADING,
  })),
  on(AuthActions.logoutFulfilled, (state) => ({
    ...state,
    isLoggedIn: false,
    status: STATUS.SUCCEDED,
    user: null,
  })),
  on(AuthActions.loginFailed, (state, action) => ({
    ...state,
    status: STATUS.FAILED,
    error: action.error,
  })),
  on(AuthActions.signupRequest, (state, action) => ({
    ...state,
    status: STATUS.LOADING,
  })),
  on(AuthActions.signupFulfilled, (state) => ({
    ...state,

    status: STATUS.SUCCEDED,
  })),
  on(AuthActions.signupFailed, (state, action) => ({
    ...state,
    status: STATUS.FAILED,
    error: action.error,
  })),
  on(AuthActions.authResetStatus, (state) => ({
    ...state,
    status: STATUS.IDLE,
    error: null,
  })),
  // Check user logged in
  on(AuthActions.checkToken, (state) => state),
  on(AuthActions.setUserNotLoggedIn, (state) => ({
    ...state,
    user: null,
  })),
  on(AuthActions.setUserLoggedIn, (state, action) => ({
    ...state,
    user: action.user,
  }))
);

export const authFeatureKey = 'auth';

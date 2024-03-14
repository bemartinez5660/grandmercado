import { createAction, props } from '@ngrx/store';
import { User } from './authentication.models';

export const updateUser = createAction('[Authentication] Update User');
export const checkToken = createAction('[Authentication] Check Token');
export const setUserLoggedIn = createAction(
  '[Authentication] User Logged In',
  props<{ user: User }>()
);
export const setUserNotLoggedIn = createAction(
  '[Authentication] User Logged Out'
);

export const loginRequest = createAction(
  '[Login Page] Login Request',
  props<{ email: string; password: string; keepLogin: boolean }>()
);
export const loginFulfilled = createAction(
  '[Login Page] Login Fulfilled',
  props<{ user: User | null }>()
);
export const loginFailed = createAction(
  '[Login Page] Login Failed',
  props<{ error: any }>()
);

export const logoutRequest = createAction('[Logout Page] Logout Request');
export const logoutFulfilled = createAction('[Logout Page] Logout Fulfilled');
export const logoutFailed = createAction(
  '[Logout Page] Logout Failed',
  props<{ error: any }>()
);

export const signupRequest = createAction(
  '[Signup Page] Signup Request',
  props<{
    name: string;
    phone: string;
    email: string;
    password1: string;
    password2: string;
  }>()
);
export const signupFulfilled = createAction('[Signup Page] Signup Fulfilled');
export const signupFailed = createAction(
  '[Signup Page] Signup Failed',
  props<{ error: any }>()
);
export const authResetStatus = createAction('[Authentication] Reset Status');

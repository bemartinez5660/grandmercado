import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ReceiverActions } from 'src/app/shop-store/receiver-store';
import { AppState } from '..';
import { selectQueryParams } from '../router-store.selectors';
import {
  checkToken,
  loginFailed,
  loginFulfilled,
  loginRequest,
  logoutFailed,
  logoutFulfilled,
  logoutRequest,
  setUserLoggedIn,
  setUserNotLoggedIn,
  signupFailed,
  signupFulfilled,
  signupRequest,
  updateUser,
} from './authentication.actions';

@Injectable()
export class AuthenticationEffects implements OnInitEffects {
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRequest),

      switchMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          switchMap((user) => {
            this.authService.saveToken(
              user.access_token,
              user.refresh_token,
              action.keepLogin
            );
            // Request user receivers
            this.store.dispatch(ReceiverActions.requestReceivers());
            return of(loginFulfilled({ user: user.user }));
          }),
          catchError((error) => {
            return of(loginFailed({ error }));
          })
        )
      )
    )
  );
  loginFulfilled$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFulfilled),
        withLatestFrom(this.store.select(selectQueryParams)),
        tap(([_, url]) => {
          this.translateService
            .get('notifications.authentication.loginSuccess')
            .subscribe((message) => this.toastrService.success(message));
          this.router.navigate([url['redirect'] ? url['redirect'] : '']);
        })
      ),
    { dispatch: false }
  );
  loginFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailed),
        tap((action) => {
          let errorMessage = '';
          let k: keyof typeof action.error.error;
          for (k in action.error.error) {
            errorMessage += action.error.error[k];
            errorMessage += '\n';
          }
          this.toastrService.error(errorMessage);
        })
      ),
    { dispatch: false }
  );
  logoutRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutRequest),
      exhaustMap((action) => {
        this.authService.logout();

        return of(logoutFulfilled());
      })
    )
  );
  logoutFulfilled$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutFulfilled),
        tap((action) => {
          this.authService.removeToken();
          this.translateService
            .get('notifications.authentication.logoutSuccess')
            .subscribe((message) => this.toastrService.error(message));

          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );
  logoutFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutFailed),
        tap((action) => {
          if (action.error.status === 401) {
            this.translateService
              .get('notifications.authentication.logoutError')
              .subscribe((message) => this.toastrService.warning(message));
          } else {
            this.translateService
              .get('notifications.authentication.error')
              .subscribe((message) =>
                this.toastrService.error(message, action.error.message)
              );
          }
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  signupRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupRequest),
      exhaustMap((action) =>
        this.authService
          .signup(
            action.name,
            action.phone,
            action.email,
            action.password1,
            action.password2
          )
          .pipe(
            map((response) => {
              return signupFulfilled();
            }),

            catchError((error) => {
              return of(signupFailed({ error }));
            })
          )
      )
    )
  );

  signupFulfilled$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupFulfilled),
        tap((action) => {
          this.router.navigate(['/auth/verify']);
        })
      ),
    { dispatch: false }
  );
  signupFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupFailed),
        tap((action) => {
          let errorMessage = '';
          let k: keyof typeof action.error.error;
          for (k in action.error.error) {
            errorMessage += action.error.error[k];
            errorMessage += '\n';
          }
          this.toastrService.error(errorMessage);
        })
      ),
    { dispatch: false }
  );
  updateUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      switchMap(() =>
        this.authService.requestUser().pipe(
          map((user) => {
            return setUserLoggedIn({ user });
          }),
          catchError((err) => {
            return of({ type: 'No action' });
          })
        )
      )
    )
  );
  checkToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkToken),
      switchMap(() =>
        this.authService.requestUser().pipe(
          map((user) => {
            // Request user receivers
            this.store.dispatch(ReceiverActions.requestReceivers());
            return setUserLoggedIn({ user });
          }),
          catchError((err) => {
            return of(setUserNotLoggedIn());
          })
        )
      )
    )
  );
  checkTokenLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setUserNotLoggedIn),
        tap((action) => {
          this.authService.removeToken();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthenticationService,
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) {}

  ngrxOnInitEffects() {
    return checkToken();
  }
}

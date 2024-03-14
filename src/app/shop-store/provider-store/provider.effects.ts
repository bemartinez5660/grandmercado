import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of, switchMap } from 'rxjs';
import { ProvidersService } from 'src/app/services/providers.service';
import { ProviderActions } from '.';

@Injectable()
export class ProviderEffects {
  fetchProvidersEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProviderActions.actionType.GET_PROVIDER_LIST),
      exhaustMap(() =>
        this.providersService.requestProviders().pipe(
          switchMap((providers) => {
            console.log(providers);
            return of(ProviderActions.fullfillProviders({ providers }));
          })
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private providersService: ProvidersService
  ) {}
}

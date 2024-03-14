import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ShopState } from '..';
import { DepartamentActions } from '.';
import { exhaustMap, of, switchMap } from 'rxjs';
import { DepartamentService } from 'src/app/services/departament.service';

@Injectable()
export class DepartamentEffects {
  fetchDepartamentsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartamentActions.actionType.GET_DEPARTAMENT_LIST),
      exhaustMap(() =>
        this.departamentService.requestDepartaments().pipe(
          switchMap((departaments) => {
            console.log(departaments);
            return of(
              DepartamentActions.fullfillDepartaments({ departaments })
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private departamentService: DepartamentService,
    private store: Store<ShopState>
  ) {}
}

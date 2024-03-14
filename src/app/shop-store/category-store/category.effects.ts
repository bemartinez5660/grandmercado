import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ShopState } from '..';
import { exhaustMap, of, switchMap } from 'rxjs';
import { DepartamentService } from 'src/app/services/departament.service';
import { CategoryActions } from '.';

@Injectable()
export class CategoryEffects {
  fetchCategoriesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.actionType.GET_CATEGORY_LIST),
      exhaustMap(() =>
        this.departamentService.requestCategories().pipe(
          switchMap((categories) => {
            console.log(categories);
            return of(CategoryActions.fullfillCategories({ categories }));
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

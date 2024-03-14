import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ShopState } from '..';
import { ReceiverActions } from '.';
import {
  catchError,
  EMPTY,
  exhaustMap,
  map,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { ShippingAddresseeService } from 'src/app/services/shipping-addressee.service';

@Injectable()
export class ReceiverEffects {
  fetchReceiversEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiverActions.requestReceivers),
      exhaustMap(() =>
        this.receiverService.getShippingAddressees().pipe(
          switchMap((receivers) => {
            return of(ReceiverActions.fullfillReceivers({ receivers }));
          })
        )
      )
    )
  );

  fullfillReceiversEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiverActions.fullfillReceivers),
      withLatestFrom(this.receiverService.selectReceiver$.pipe()),
      switchMap(([action, receiverId]) => {
        // If some receiverId stored parse it and check for validity
        if (receiverId) {
          const storedReceiverId = Number.parseInt(receiverId);
          if (storedReceiverId) {
            // Check receiver is valid
            const receiver = action.receivers.find(
              (p) => p.id === storedReceiverId
            );
            if (receiver) {
              return of(
                ReceiverActions.selectReceiver({
                  receiverId: storedReceiverId,
                })
              );
            }
          }
        }
        if (!receiverId && action.receivers.length > 0) {
          // Set first receiver if selected receiver not found
          return of(
            ReceiverActions.selectReceiver({
              receiverId: action.receivers[0].id,
            })
          );
        }
        return EMPTY;
      })
    )
  );

  selectReceiverEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReceiverActions.selectReceiver),
        map((action) => {
          this.receiverService.selectReceiver(action.receiverId);
        })
      ),
    { dispatch: false }
  );

  deleteReceiverEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReceiverActions.deleteReceiver),
        exhaustMap((action) =>
          this.receiverService.deleteShippingAddressee(action.id).pipe(
            switchMap((value) => {
              if (value) {
                return of(ReceiverActions.requestReceivers);
              }
              return EMPTY;
            })
          )
        )
      ),
    { dispatch: false }
  );

  loadReceiver$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiverActions.loadReceiver),
      switchMap((data) =>
        this.receiverService.getShippingAddresee(data.id).pipe(
          map((res: any) => {
            return ReceiverActions.loadReceiverSuccess({
              receiver: res,
            });
          }),
          catchError((error) => {
            return of(
              ReceiverActions.loadReceiverFail({
                error,
              })
            );
          })
        )
      )
    )
  );

  loadReceiverSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiverActions.loadReceiverSuccess),
      withLatestFrom(this.receiverService.selectReceiver$.pipe()),
      switchMap(([action, receiverId]) => {
        if (!receiverId && action.receiver) {
          // Set first receiver if selected receiver not found
          return of(
            ReceiverActions.selectReceiver({
              receiverId: action.receiver.id,
            })
          );
        }
        return EMPTY;
      })
    )
  );

  constructor(
    private actions$: Actions,
    private receiverService: ShippingAddresseeService,
    private store: Store<ShopState>
  ) {}
}

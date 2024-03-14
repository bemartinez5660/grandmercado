import { createReducer, on } from '@ngrx/store';
import * as ReceiverActions from './receiver.actions';
import { initialState, receiverAdapter } from './receiver.entity';

export const reducer = createReducer(
  initialState,
  on(ReceiverActions.fullfillReceivers, (state, action) =>
    receiverAdapter.addMany(action.receivers, state)
  ),
  on(ReceiverActions.selectReceiver, (state, action) => ({
    ...state,
    selectedReceiverId: action.receiverId,
  })),
  on(ReceiverActions.deleteReceiver, (state, action) =>
    receiverAdapter.removeOne(action.id, state)
  ),
  on(ReceiverActions.loadReceiverSuccess, (state, action) =>
    receiverAdapter.addOne(action.receiver, state)
  ),
  on(ReceiverActions.loadReceiverFail, (state, { error }) => {
    return {
      ...state,
      error,
    };
  })
);

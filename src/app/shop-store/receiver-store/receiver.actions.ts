import { createAction, props } from '@ngrx/store';
import { ShippingAddressee } from 'src/app/models/shop.models';

export const actionType = {
  GET_RECEIVER_LIST: '[Receiver] Get Receiver List',
  FULLFILL_RECEIVER_LIST: '[Receiver] Fullfill Receiver List',
  SELECT_RECEIVER: '[Receiver] Select Receiver',
  DELETE_RECEIVER: '[Receiver] Delete Receiver',
  LOAD_RECEIVER: '[Receiver] Load Receiver',
  LOAD_RECEIVER_SUCCESS: '[Receiver] Load Receiver Success',
  LOAD_RECEIVER_FAIL: '[Receiver] Load Receiver Fail',
  UPDATE_RECEIVER: '[Receiver] Update Receiver',
  UPDATE_RECEIVER_SUCCESS: '[Receiver] Update Receiver Success',
  UPDATE_RECEIVER_FAIL: '[Receiver] Update Receiver Fail',
};

export const requestReceivers = createAction(actionType.GET_RECEIVER_LIST);
export const fullfillReceivers = createAction(
  actionType.FULLFILL_RECEIVER_LIST,
  props<{ receivers: ShippingAddressee[] }>()
);
export const selectReceiver = createAction(
  actionType.SELECT_RECEIVER,
  props<{ receiverId: number | null }>()
);
export const deleteReceiver = createAction(
  actionType.DELETE_RECEIVER,
  props<{ id: string }>()
);
export const loadReceiver = createAction(
  actionType.LOAD_RECEIVER,
  props<{ id: number }>()
);
export const loadReceiverSuccess = createAction(
  actionType.LOAD_RECEIVER_SUCCESS,
  props<{ receiver: ShippingAddressee }>()
);
export const loadReceiverFail = createAction(
  actionType.LOAD_RECEIVER_FAIL,
  props<{ error: Error | any }>()
);
export const updateReceiver = createAction(
  actionType.UPDATE_RECEIVER,
  props<{ receiver: ShippingAddressee }>()
);
export const updateReceiverSuccess = createAction(
  actionType.UPDATE_RECEIVER_SUCCESS,
  props<{ receiver: ShippingAddressee }>()
);
export const updateReceiverFail = createAction(
  actionType.UPDATE_RECEIVER_FAIL,
  props<{ error: Error | any }>()
);

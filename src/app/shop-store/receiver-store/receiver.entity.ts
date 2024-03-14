import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ShippingAddressee } from 'src/app/models/shop.models';

export interface State extends EntityState<ShippingAddressee> {
  selectedReceiverId: number | null;
}

export const receiverAdapter: EntityAdapter<ShippingAddressee> =
  createEntityAdapter<ShippingAddressee>();

export const initialState: State = receiverAdapter.getInitialState({
  selectedReceiverId: null,
});

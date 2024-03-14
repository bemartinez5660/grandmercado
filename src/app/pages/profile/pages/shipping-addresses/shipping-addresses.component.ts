import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LOCAL_STORAGE_DEFAULT_RECEIVER } from 'src/app/models/app.models';
import { ShippingAddressee } from 'src/app/models/shop.models';
import { AppState } from 'src/app/root-store';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {
  ReceiverActions,
  ReceiverSelectors,
} from 'src/app/shop-store/receiver-store';

@Component({
  selector: 'app-shipping-addresses',
  templateUrl: './shipping-addresses.component.html',
  styleUrls: ['./shipping-addresses.component.scss'],
  animations: [
    trigger('detailExpand', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
          style({ opacity: 1, height: '*' })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
          style({ opacity: 0, height: 0 })
        ),
      ]),
    ]),
  ],
})
export class ShippingAddressesComponent {
  shippingAddressees$ = this.store.pipe(
    select(ReceiverSelectors.selectAllReceivers)
  );
  shippingAddressees!: ShippingAddressee[];

  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService
  ) {
    this.fetchReceivers();
  }

  fetchReceivers() {
    this.store
      .pipe(select(ReceiverSelectors.selectAllReceivers))
      .subscribe((elements) => {
        this.shippingAddressees = elements.map((item) => ({
          ...item,
          isExpanded: false,
        }));
      });
  }

  onAddedReceiver(receiver: any) {
    if (receiver) {
      this.store.dispatch(ReceiverActions.loadReceiver({ id: receiver.id }));
    }
  }

  onDeleteShippingAddressee(receiver: ShippingAddressee) {
    this.store
      .select(ReceiverSelectors.selectSelectedReceiver)
      .subscribe((defaultValue) => {
        if (defaultValue && receiver.id == defaultValue.id) {
          this.store.dispatch(
            ReceiverActions.selectReceiver({ receiverId: null })
          );
          this.storageService.removeItem(LOCAL_STORAGE_DEFAULT_RECEIVER);
        }
        this.store.dispatch(
          ReceiverActions.deleteReceiver({ id: receiver.id.toString() })
        );
      });
  }
}

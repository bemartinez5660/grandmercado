import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  combineLatest,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Province, ShippingAddressee } from 'src/app/models/shop.models';
import { AppState } from 'src/app/root-store';
import { ProvinceSelectors } from 'src/app/shop-store/province-store';
import {
  ReceiverActions,
  ReceiverSelectors,
} from 'src/app/shop-store/receiver-store';

@Component({
  selector: 'app-shipping-addressee-select',
  templateUrl: './shipping-addressee-select.component.html',
  styleUrls: ['./shipping-addressee-select.component.scss'],
})
export class ShippingAddresseeSelectComponent implements OnInit, OnDestroy {
  title = 'shop.checkout.receiver.title';
  selectedProvince$: Observable<Province | null | undefined> = this.store.pipe(
    select(ProvinceSelectors.selectSelectedProvince)
  );
  storedReceivers$: Observable<ShippingAddressee[]> = this.store.pipe(
    select(ReceiverSelectors.selectAllReceivers)
  );
  selectedReceiver$: Observable<ShippingAddressee | null | undefined> =
    this.store.pipe(select(ReceiverSelectors.selectSelectedReceiver));
  needAddNewReceiver = false;
  receiverForm = this.fb.group({
    name: [],
    personal_id: ['', [Validators.minLength(11), Validators.maxLength(11)]],
    city: [],
    phone: [],
    address: [],
    province: [],
  });

  filteredReceivers$!: Observable<ShippingAddressee[]>;
  selectedReceiver!: any;
  private _unsubscribe = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
    //Filter receivers by selected province
    this.filteredReceivers$ = combineLatest({
      receivers: this.storedReceivers$,
      selectedProvince: this.selectedProvince$,
    }).pipe(
      switchMap((value) => {
        let receivers = value.receivers.filter(
          (item) => item.province == value.selectedProvince?.id
        );

        return of(receivers);
      })
    );

    //Get selected receiver
    combineLatest({
      receiver: this.selectedReceiver$,
      province: this.selectedProvince$,
    }).subscribe((data) => {
      if (data.province?.id === data.receiver?.province) {
        this.selectedReceiver = data.receiver;
      } else {
        this.selectedReceiver = null;
      }
    });
  }

  ngOnInit(): void {}

  onSelectAsDefault(receiver: ShippingAddressee) {
    this.selectedReceiver = receiver;
    this.store.dispatch(
      ReceiverActions.selectReceiver({ receiverId: receiver.id })
    );
  }

  onAddReceiverOrSelectReceiver(): void {
    this.title = 'shop.checkout.receiver.addTitle';
    this.needAddNewReceiver = !this.needAddNewReceiver;
  }

  onOrderDetails() {
    this.router.navigate(['checkout/order-details']);
  }

  onReceiverAdded(receiverAdded: ShippingAddressee) {
    if (receiverAdded) {
      this.store.dispatch(
        ReceiverActions.loadReceiver({ id: receiverAdded.id })
      );
    }

    this.needAddNewReceiver = !this.needAddNewReceiver;
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}

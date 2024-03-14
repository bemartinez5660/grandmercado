import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { select, Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { ShippingAddressee } from 'src/app/models/shop.models';
import { AppState } from 'src/app/root-store';
import { ProvinceSelectors } from 'src/app/shop-store';
import { ReceiverSelectors } from 'src/app/shop-store/receiver-store';

@Component({
  selector: 'app-receiver-details',
  templateUrl: './receiver-details.component.html',
  styleUrls: ['./receiver-details.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, FlexLayoutModule],
})
export class ReceiverDetailsComponent implements OnInit, OnDestroy {
  receiver$ = this.store.pipe(select(ReceiverSelectors.selectSelectedReceiver));
  provinces$ = this.store.pipe(select(ProvinceSelectors.selectAllProvinces));
  receiverToShow!: any;
  private _unsubscribe = new Subject<void>();
  @Input() showDefaultReceiver: Boolean = false;
  @Input() set receiver(value: ShippingAddressee | null) {
    if (value) {
      this.provinces$
        .pipe(takeUntil(this._unsubscribe))
        .subscribe((provinces) => {
          if (provinces) {
            //Assign province data to receiver
            let province = provinces.find((item) => item.id == value.province);
            this.receiverToShow = { ...value, province: province };
          }
        });
    } else {
      this.receiverToShow = null;
    }
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}

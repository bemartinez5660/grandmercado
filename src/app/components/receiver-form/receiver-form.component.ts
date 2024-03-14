import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { Observable } from 'rxjs';
import { Province, ShippingAddressee } from 'src/app/models/shop.models';
import { AppState } from 'src/app/root-store';
import { ShippingAddresseeService } from 'src/app/services/shipping-addressee.service';
import { ProvinceSelectors } from 'src/app/shop-store/province-store';

@Component({
  selector: 'app-receiver-form',
  templateUrl: './receiver-form.component.html',
  styleUrls: ['./receiver-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMatIntlTelInputComponent,
  ],
})
export class ReceiverFormComponent {
  provinces$: Observable<Province[]> = this.store.pipe(
    select(ProvinceSelectors.selectAllProvinces)
  );
  provinceName!: string;
  @ViewChild('phoneInput')
  phoneInput!: NgxMatIntlTelInputComponent;
  @Output() receiverAdded: EventEmitter<ShippingAddressee> =
    new EventEmitter<ShippingAddressee>();
  receiverForm = this.fb.group({
    name: [],
    personal_id: ['', [Validators.minLength(11), Validators.maxLength(11)]],
    city: [],
    phone: [],
    address: [],
    province: [],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private orderService: ShippingAddresseeService
  ) {}

  onSubmit() {
    const receiver = this.receiverForm.value;

    this.orderService.createShippingAddressee(receiver).subscribe((data) => {
      if (data) {
        this.clearForm();
        this.receiverAdded.emit(data);
      }
    });
  }

  private clearForm(): void {
    this.receiverForm.reset();
    this.phoneInput.reset();
    Object.keys(this.receiverForm.controls).forEach((key) => {
      const control = this.receiverForm.controls[key];
      control.markAsPristine();
      control.markAsUntouched();
      control.setErrors(null);
    });
  }
}

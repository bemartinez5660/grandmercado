import { State } from 'src/app/root-store/root-store.state';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { select, Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { ProvinceActions, ProvinceSelectors } from 'src/app/shop-store';
import { Province } from '../../models/shop.models';

@Component({
  selector: 'app-province-select',
  templateUrl: './province-select.component.html',
  styleUrls: ['./province-select.component.scss'],
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, TranslateModule],
})
export class ProvinceSelectComponent implements OnInit {
  provinces$: Observable<Province[]> = this.store.pipe(
    select(ProvinceSelectors.selectAllProvinces)
  );
  selectedProvince$: Observable<Province | null | undefined> = this.store.pipe(
    select(ProvinceSelectors.selectSelectedProvince)
  );

  constructor(private store: Store<State>) {}

  ngOnInit(): void {}

  valueChange(event: any) {
    const provinceId = Number.parseInt(event.target.value);
    if (provinceId) {
      this.store.dispatch(
        ProvinceActions.selectProvince({ provinceId: provinceId })
      );
    }
  }

  tracByProvinceId(index: number, value: Province) {
    return value.id;
  }
}

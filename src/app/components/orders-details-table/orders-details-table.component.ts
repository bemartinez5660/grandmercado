import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/root-store';
import { ProviderSelectors } from 'src/app/shop-store/provider-store';
import { ReceiverDetailsComponent } from '../receiver-details/receiver-details.component';

@Component({
  selector: 'app-orders-details-table',
  templateUrl: './orders-details-table.component.html',
  styleUrls: ['./orders-details-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    ReceiverDetailsComponent,
  ],
})
export class OrdersDetailsTableComponent implements OnInit {
  orderDetails!: any;
  Object = Object;
  @Input() set data(value: any) {
    if (value) {
      if (value.items) {
        this.orderDetails = {
          ...value,
          items: this.groupByNestedKey(value.items, 'product.provider'),
        };
      } else {
        this.orderDetails = value;
      }
    }
  }

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {}

  public getSelectedProviderName(
    provideId: string
  ): Observable<string | undefined> {
    return this.store
      .select(ProviderSelectors.selectEntityById(provideId))
      .pipe(map((data) => data?.name));
  }

  private groupByNestedKey(array: any[], key: string): { [key: string]: any } {
    // Create an empty object to hold the groups
    const groups: { [key: string]: any } = {};

    for (const obj of array) {
      // Get the nested value from the key string
      const nestedKeys = key.split('.');
      let nestedValue = obj;
      for (const nestedKey of nestedKeys) {
        nestedValue = nestedValue[nestedKey];
      }
      // Group the object by the nested value
      if (groups[nestedValue]) {
        groups[nestedValue].push(obj);
      } else {
        groups[nestedValue] = [obj];
      }
    }

    // Return the groups object
    return groups;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDataComponent } from './pages/user-data/user-data.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderTableComponent } from '../../components/shop-order-table/order-table.component';
import { ConnectFormDirective } from './pages/user-data/connect-form.directive';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { ShippingAddressesComponent } from './pages/shipping-addresses/shipping-addresses.component';
import { ReceiverFormComponent } from 'src/app/components/receiver-form/receiver-form.component';
import { ReceiverDetailsComponent } from 'src/app/components/receiver-details/receiver-details.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UserDataComponent,
    MyOrdersComponent,
    ConnectFormDirective,
    SubscriptionsComponent,
    ShippingAddressesComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    RouterModule,
    FlexLayoutModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    OrderTableComponent,
    PaginationComponent,
    ReceiverFormComponent,
    ReceiverDetailsComponent,
    SafeHtmlPipe,
  ],
})
export class ProfileModule {}

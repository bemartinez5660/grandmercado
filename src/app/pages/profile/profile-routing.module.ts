import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { ShippingAddressesComponent } from './pages/shipping-addresses/shipping-addresses.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { UserDataComponent } from './pages/user-data/user-data.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'user',
        component: UserDataComponent,
        data: {
          title: 'User',
          description: 'Description of User Component',
          ogTitle: 'Description of User Component for social media',
        },
      },
      {
        path: 'shipping-addressees',
        component: ShippingAddressesComponent,
        data: {
          title: 'My Addressees',
          description: 'Description of Shipping Addresses Component',
          ogTitle: 'Description of Shipping Addresses Component',
        },
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        data: {
          title: 'My Orders',
          description: 'Description of My Orders Component',
          ogTitle: 'Description of My Orders Component for social media',
        },
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent,
        data: {
          title: 'My Subscriptions',
          description: 'Description of My Subscriptions Component',
          ogTitle: 'Description of My Subscriptions Component for social media',
        },
      },
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}

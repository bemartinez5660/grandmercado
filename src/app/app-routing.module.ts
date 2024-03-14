import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutGuard } from './guards/checkout.guard';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { ShopShell } from './shop-shell/services/shop-shell.service';

const routes: Routes = [
  ShopShell.childRoutes([
    {
      path: 'auth',
      loadChildren: () =>
        import('./pages/auth/auth.module').then((m) => m.AuthModule),
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home',
    },
    {
      path: 'home',
      loadChildren: () =>
        import('./pages/shop-home/shop-home.module').then(
          (m) => m.ShopHomeModule
        ),
    },
    {
      path: 'collections/:collection-slug',
      loadChildren: () =>
        import('./pages/product-collection/product-collection.module').then(
          (m) => m.ProductCollectionModule
        ),
    },
    {
      path: 'products',
      loadChildren: () =>
        import('./pages/product-list/product-list.module').then(
          (m) => m.ProductListModule
        ),
    },
    {
      path: 'products/:departament-slug',
      loadChildren: () =>
        import('./pages/product-list/product-list.module').then(
          (m) => m.ProductListModule
        ),
    },
    {
      path: 'products/:departament-slug/:category-slug',
      loadChildren: () =>
        import('./pages/product-list/product-list.module').then(
          (m) => m.ProductListModule
        ),
    },
    {
      path: 'product/:id',
      loadChildren: () =>
        import('./pages/product-details/product-details.module').then(
          (m) => m.ProductDetailsModule
        ),
    },
    {
      path: 'cart',
      loadChildren: () =>
        import('./pages/cart-details/cart-details.module').then(
          (m) => m.CartDetailsModule
        ),
    },
    {
      path: 'checkout',
      loadChildren: () =>
        import('./pages/checkout/checkout.module').then(
          (m) => m.CheckoutModule
        ),
      canActivate: [IsAuthenticatedGuard, CheckoutGuard],
    },
    {
      path: 'payment-completed',
      loadChildren: () =>
        import('./pages/payment-completed/payment-completed.module').then(
          (m) => m.PaymentCompleteModule
        ),
    },
    {
      path: 'order-status/:order-code',
      loadChildren: () =>
        import('./pages/order-status/order-status.module').then(
          (m) => m.OrderStatusModule
        ),
    },
    {
      path: 'profile',
      loadChildren: () =>
        import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      canActivate: [IsAuthenticatedGuard],
    },
    {
      path: 'terms-and-conditions',
      loadChildren: () =>
        import('./pages/terms-and-conditions/terms-and-conditions.module').then(
          (m) => m.TermsAndConditionsModule
        ),
    },
    {
      path: 'privacy-policy',
      loadChildren: () =>
        import('./pages/privacy-policy/privacy-policy.module').then(
          (m) => m.PrivacyPolicyModule
        ),
    },
    {
      path: 'delivery-policy',
      loadChildren: () =>
        import('./pages/delivery-policy/delivery-policy.module').then(
          (m) => m.DeliveryPolicyModule
        ),
    },
  ]),
  {
    path: 'product-collection',
    loadChildren: () =>
      import('./pages/product-collection/product-collection.module').then(
        (m) => m.ProductCollectionModule
      ),
  },

  // Fallback when no prior route is matched
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}

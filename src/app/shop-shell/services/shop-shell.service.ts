import { Routes, Route } from '@angular/router';
import { ShopShellComponent } from '../components/shop-shell/shop-shell.component';

/**
 * Provides helper methods to create routes.
 */
export class ShopShell {
  /**
   * Creates routes using the shell component.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShopShellComponent,
      children: routes,
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true },
    };
  }
}

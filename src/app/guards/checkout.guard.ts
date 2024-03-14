import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { map, Observable, Observer, switchMap } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  constructor(private cartService: CartService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const cart$ = this.cartService.listenCartObservable();

    return new Observable<boolean>((observer: Observer<boolean>) => {
      const cartSubcription = cart$
        .pipe(
          switchMap((cart) => {
            return this.cartService.validateCart(cart);
          })
        )
        .subscribe((resp) => {
          if (resp) {
            observer.next(false);
          } else {
            observer.next(true);
          }
        });
      return () => cartSubcription.unsubscribe();
    });
  }
}

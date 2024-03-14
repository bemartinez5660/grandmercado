import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Logger } from '../services';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class IsAuthenticatedGuard implements CanActivate, CanLoad {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const authenticated = this.authService.getToken();
    if (authenticated) {
      if (state.url == '/auth/register' || state.url == '/auth/login') {
        this.router.navigate(['']);
        return false;
      }
      return true;
    } else {
      if (
        state.url.startsWith('/auth/login') ||
        state.url == '/auth/register'
      ) {
        return true;
      }
      this.router.navigate(['/auth/login'], {
        queryParams: { redirect: state.url },
        replaceUrl: true,
      });
      return false;
    }
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const authenticated = this.authService.getToken();
    if (authenticated) {
      return true;
    }
    this.router.navigate(['/auth/login'], {
      queryParams: { redirect: `/${route.path}` },
      replaceUrl: true,
    });
    return false;
  }

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
}

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { I18nService } from '../services';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private i18nService: I18nService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (token === null) {
      request = request.clone({
        setHeaders: {
          'Accept-Language': this.i18nService.language + ';q=0.9',
        },
      });
      return next.handle(request);
    }
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token.access}`,
        'Accept-Language': this.i18nService.language + ';q=0.9',
      },
    });
    return next.handle(authRequest);
  }
}

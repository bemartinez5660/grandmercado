import { TranslateModule } from '@ngx-translate/core';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootStoreModule } from './root-store';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router, RouteReuseStrategy } from '@angular/router';
import { RouteReusableStrategy } from './services/route-reusable-strategy';
import { AuthInterceptor } from './interceptors/authentication.interceptor';
import {
  DateFnsAdapter,
  MatDateFnsModule,
} from '@angular/material-date-fns-adapter';
import * as Sentry from '@sentry/angular-ivy';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { es } from 'date-fns/locale';
import { environment } from 'src/environments/environment';
import { ShopShellModule } from './shop-shell/shop-shell.module';
import { ShopStoreModule } from './shop-store';
import { EnvironmentService } from './services/environment.service';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { AppService } from './services/app.service';
import { lastValueFrom, switchMap } from 'rxjs';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
// import { ScullyLibModule } from '@scullyio/ng-lib';
import { AppIdInterceptor } from './interceptors/app-id.interceptor';
import { AgencyConfig } from './models/app.models';

export function googleTagManagerIdFactory(
  environmentService: EnvironmentService
) {
  return environmentService.googleTagManagerId;
}

//Set app theme from 'agency' endpoint
export function initializeApp(appService: AppService) {
  return () =>
    appService.getAgencyConfig().subscribe((config: AgencyConfig) => {
      appService.saveAppTheme(config);
    });
}
@NgModule({
  declarations: [AppComponent, SpinnerOverlayComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    ShopShellModule,
    AppRoutingModule,
    RootStoreModule,
    ShopStoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ToastrModule.forRoot(),
    MatDateFnsModule,
    MatProgressSpinnerModule,
    // ScullyLibModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppIdInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: es,
    },
    // Sentry ErrorHandler and Tracer
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    // Provides Google Tag Manager Service
    {
      provide: 'googleTagManagerId',
      useFactory: googleTagManagerIdFactory,
      deps: [EnvironmentService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

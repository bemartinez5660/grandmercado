import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular-ivy';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

Sentry.init({
  // Only enable Sentry integration in production
  // (comment to test sentry integration in non-production environments)
  enabled: environment.production,
  dsn: environment.sentryDSN,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: [environment.serverUrl],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],
  environment: environment.environmentName,
  release: environment.appRelease,
  tracesSampleRate: 0.06,
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

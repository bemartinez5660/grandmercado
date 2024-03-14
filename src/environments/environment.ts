// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  environmentName: 'dev',
  production: false,
  version: 0 + '-dev',
  serverUrl: 'https://test.grandmercado.com/api/v1',
  authServiceURL: 'https://auth-test.grandmercado.com/api/v1',
  // serverUrl: 'http://127.0.0.1:8000/api/v1',
  // authServiceURL: 'http://127.0.0.1:8001/api/v1',
  defaultLanguage: 'es-ES',
  supportedLanguages: ['en-US', 'es-ES'],
  appRelease: 'APP_RELEASE_PLACEHOLDER',
  assetsPrefix: '',
  googleTagManagerId: 'GTM-PQSQ4B7',
  sentryDSN:
    'https://67e52cc1d3bc416484f89e9d9852bce7@o311836.ingest.sentry.io/4504249755238400',
  // appID: 'b56398da-2b1a-4a8c-b5c6-4453dea0acda',
  // appID: 'd16e05e9-80c4-4b6c-a08a-7c6296baa82f',
  // appID: 'c44ae5a6-1087-473f-a7f5-6fe799a76806',
  appID: '55738d28-4ffb-4b95-aa5e-f75662d27233',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

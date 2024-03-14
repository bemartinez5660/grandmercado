// Environment Configuration for Horizontes Agency

import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  environmentName: 'production',
  production: true,
  version: '0.0.0',
  serverUrl: 'https://api.grandmercado.com/api/v1',
  authServiceURL: 'https://auth.grandmercado.com/api/v1',
  defaultLanguage: 'es-ES',
  supportedLanguages: ['en-US', 'es-ES'],
  appRelease: 'APP_RELEASE_PLACEHOLDER',
  assetsPrefix: 'grandmercado-b2b-web',
  googleTagManagerId: 'GTM-TBH6TXL',
  sentryDSN:
    'https://67e52cc1d3bc416484f89e9d9852bce7@o311836.ingest.sentry.io/4504249755238400',
  appID: '65445bc8-8cdd-4259-8505-ad066ebd1000',
};

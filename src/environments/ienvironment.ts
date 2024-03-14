export interface IEnvironment {
  environmentName: string;
  production: boolean;
  serverUrl: string;
  authServiceURL: string; // URL to the auth service
  defaultLanguage: string;
  supportedLanguages: string[];
  appRelease: string;
  assetsPrefix: string;
  googleTagManagerId: string;
  sentryDSN: string;
  version: string;
  appID: string;
}

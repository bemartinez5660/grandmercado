import { Injectable } from '@angular/core';
import { IEnvironment } from 'src/environments/ienvironment';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService implements IEnvironment {
  constructor() {}

  get appID(): string {
    return environment.appID;
  }
  get serverUrl(): string {
    return environment.serverUrl;
  }
  get production(): boolean {
    return environment.production;
  }
  get environmentName(): string {
    return environment.environmentName;
  }
  get appRelease(): string {
    return environment.appRelease;
  }
  get googleTagManagerId(): string {
    return environment.googleTagManagerId;
  }
  get sentryDSN(): string {
    return environment.sentryDSN;
  }
  get defaultLanguage(): string {
    return environment.defaultLanguage;
  }
  get supportedLanguages(): string[] {
    return environment.supportedLanguages;
  }
  get assetsPrefix(): string {
    return environment.assetsPrefix;
  }
  get version(): string {
    return environment.version;
  }

  get authServiceURL(): string {
    return environment.authServiceURL;
  }
}

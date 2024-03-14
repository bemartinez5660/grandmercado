import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class ElfsightService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private environment: EnvironmentService
  ) {}

  public loadScript(): void {
    const elfsightScript = this.document.getElementById('elfsightScript');
    if (elfsightScript) {
      elfsightScript.remove();
    }
    const node = this.document.createElement('script');
    node.id = 'elfsightScript';
    node.src = 'https://apps.elfsight.com/p/platform.js';
    node.defer = true;
    const head = this.document.getElementsByTagName('head')[0];
    head.appendChild(node);
  }
  public loadStaticScript(): void {
    const elfsightScript = this.document.getElementById('elfsightStaticScript');
    if (elfsightScript) {
      elfsightScript.remove();
    }
    const node = this.document.createElement('script');
    node.id = 'elfsightStaticScript';
    node.src = 'https://static.elfsight.com/platform/platform.js';
    node.defer = true;
    node.attributes.setNamedItem(
      this.document.createAttribute('data-use-service-core')
    );
    const head = this.document.getElementsByTagName('head')[0];
    head.appendChild(node);
  }

  public get chatAppId(): string | undefined {
    return this.environment.elfsightChatAppID;
  }
}

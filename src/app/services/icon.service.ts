import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

export enum Icons {
  BOX = 'box',
  CALENDAR = 'calendar',
}

@Injectable({
  providedIn: 'root',
})
export class IconService {
  ASSETS_PREFIX = environment.assetsPrefix;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  registerIcons(): void {
    // Method must be called on app component initialization
    this.loadIcons(Object.values(Icons), '../assets/svg/icons');
  }

  private loadIcons(iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach((key) => {
      this.matIconRegistry.addSvgIcon(
        key,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `${this.ASSETS_PREFIX}/${iconUrl}/${key}.svg`
        )
      );
    });
  }
}

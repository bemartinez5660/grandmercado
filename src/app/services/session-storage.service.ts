import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MemoryStorage } from './memory-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService implements Storage {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {}
  protected get storage(): Storage {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage;
    } else {
      return new MemoryStorage();
    }
  }

  [name: string]: any;
  get length(): number {
    return this.storage.length;
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}

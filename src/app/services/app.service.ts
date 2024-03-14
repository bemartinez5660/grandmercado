import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from './models';
import {
  Agency,
  AgencyConfig,
  LOCAL_STORAGE_AGENCY,
} from '../models/app.models';
import { LocalStorageService } from './local-storage.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    @Inject(DOCUMENT) private document: Document
  ) {}
  private API_URL = environment.serverUrl;

  getCountries(): Observable<Country[]> {
    return this.http.options<any>(`${this.API_URL}/auth/registration/`).pipe(
      map((result) => {
        return result.actions.POST.customer.children.country.choices;
      })
    );
  }

  getAgency(): Observable<Agency> {
    return this.http.get<Agency>(`${this.API_URL}/agency/`);
  }

  getAgencyConfig(): Observable<AgencyConfig> {
    return this.getAgency().pipe(
      map((agency) => {
        return new AgencyConfig(agency);
      })
    );
  }

  saveAppTheme(config: AgencyConfig) {
    this.storageService.setItem({
      key: LOCAL_STORAGE_AGENCY,
      value: JSON.stringify(config),
    });

    this.document.documentElement.style.setProperty(
      '--primary-color',
      config.primaryColor
    );

    if (config.favicon) {
      let favIcon: HTMLLinkElement | null =
        this.document.querySelector('#agencyIcon');
      favIcon!.href = config.favicon;
    }
  }
}

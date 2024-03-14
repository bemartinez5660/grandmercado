import { HomePage } from './../models/ui.models';
import { UIService } from './../services/ui.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class HomePageResolver implements Resolve<HomePage> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<HomePage> {
    return this.uiService.getHomePage();
  }

  constructor(private uiService: UIService) {}
}

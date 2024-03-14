import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DepartmentCategoryMenuService {
  private showDepartmentMenu = false;
  private _getDepartament: BehaviorSubject<string> = new BehaviorSubject('');
  private _getCategory: BehaviorSubject<string> = new BehaviorSubject('');

  public getDepartament$: Observable<string> =
    this._getDepartament.asObservable();
  public getCategory$: Observable<string> = this._getCategory.asObservable();

  constructor() {}

  toggleDepartmentMenu() {
    this.showDepartmentMenu = !this.showDepartmentMenu;
  }

  isOpenMenu() {
    return this.showDepartmentMenu;
  }

  setDepartament(slug: string) {
    this._getDepartament.next(slug);
  }

  setCategory(slug: string) {
    this._getCategory.next(slug);
  }
}

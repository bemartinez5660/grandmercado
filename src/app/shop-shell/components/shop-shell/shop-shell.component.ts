import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { getSelectors } from '@ngrx/router-store';
import { Store, select } from '@ngrx/store';
import { AppState, AuthenticationSelectors } from 'src/app/root-store';
import { ShopState } from 'src/app/shop-store';
import { requestCategories } from 'src/app/shop-store/category-store/category.actions';
import { requestDepartaments } from 'src/app/shop-store/departament-store/departament.actions';
import { requestProviders } from 'src/app/shop-store/provider-store/provider.actions';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-shop-shell',
  templateUrl: './shop-shell.component.html',
  styleUrls: ['./shop-shell.component.scss'],
})
export class ShopShellComponent implements OnInit, AfterViewInit {
  data$ = this.store.pipe(select(getSelectors().selectRouteData));
  user$ = this.store.pipe(select(AuthenticationSelectors.selectUser));
  @ViewChild('drawer') public drawer!: MatDrawer;
  constructor(
    private store: Store<AppState>,
    private shopStore: Store<ShopState>,
    public sidenavService: SidenavService
  ) {
    this.shopStore.dispatch(requestProviders());
    this.shopStore.dispatch(requestDepartaments());
    this.shopStore.dispatch(requestCategories());
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.drawer);
  }
}

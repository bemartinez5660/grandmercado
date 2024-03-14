import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, take } from 'rxjs';
import { URLs } from 'src/app/app.constants';
import { LOCAL_STORAGE_AGENCY } from 'src/app/models/app.models';
import { AppState, AuthenticationActions } from 'src/app/root-store';
import { User } from 'src/app/root-store/authentication-store/authentication.models';
import { DepartmentCategoryMenuService } from 'src/app/services/department-category-menu.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProvinceSelectors, ShopState } from 'src/app/shop-store';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-shop-navbar',
  templateUrl: './shop-navbar.component.html',
  styleUrls: ['./shop-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('departmentsExpand', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
          style({ opacity: 1, height: '*' })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
          style({ opacity: 0, height: 0 })
        ),
      ]),
    ]),
  ],
})
export class ShopNavbarComponent implements OnInit {
  @Input() breadcrumb!: string;
  @Input() user: User | null = null;
  loginUrl = `/${URLs.login}`;
  provinces$ = this.shopStore.pipe(
    select(ProvinceSelectors.selectAllProvinces)
  );
  agencyLogo;
  agencyLogoSmall;
  searchForm!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private shopStore: Store<ShopState>,
    public storageService: LocalStorageService,
    private router: Router,
    public menuService: DepartmentCategoryMenuService,
    private sidenavService: SidenavService
  ) {
    const agency = this.storageService.getItem(LOCAL_STORAGE_AGENCY);
    if (agency) {
      this.agencyLogo = JSON.parse(agency).logo;
      this.agencyLogoSmall = JSON.parse(agency).logoSmall;
    }
  }

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
      navbar?.classList.add('sticky-nav');
    } else {
      navbar?.classList.remove('sticky-nav');
    }
  }

  search(event: string) {
    this.router.navigate(['products'], {
      queryParams: { q: event },
      queryParamsHandling: 'merge',
    });
  }

  clearSearch() {
    this.router.navigate([], {
      queryParams: {
        q: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  onLogout() {
    this.store.dispatch(AuthenticationActions.logoutRequest());
  }

  toggleSideNav() {
    this.sidenavService.open();
  }
}

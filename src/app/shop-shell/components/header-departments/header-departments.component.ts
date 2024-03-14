import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, Subject } from 'rxjs';
import { SlidesData } from 'src/app/components/department-slides/department-slides.component';
import { DepartmentSlide } from 'src/app/models/shop.models';
import { AppState } from 'src/app/root-store';
import { DepartmentCategoryMenuService } from 'src/app/services/department-category-menu.service';
import { DepartamentSelectors } from 'src/app/shop-store/departament-store';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-header-departments',
  templateUrl: './header-departments.component.html',
  styleUrls: ['./header-departments.component.scss'],
})
export class HeaderDepartmentsComponent implements OnInit, OnDestroy {
  departmentData!: SlidesData;
  data$!: Observable<SlidesData>;
  _unsubscribe = new Subject<void>();
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  constructor(
    private readonly shopStore: Store<AppState>,
    private router: Router,
    private menuService: DepartmentCategoryMenuService
  ) {}

  ngOnInit(): void {
    this.data$ = combineLatest({
      departments: this.shopStore.pipe(
        select(DepartamentSelectors.selectAllDepartaments),
        filter((data) => data.length > 0),
        map((data: any) =>
          data.map((item: any) => {
            return { ...item, selected: false };
          })
        )
      ),
      selected_departament: this.menuService.getDepartament$,
      selected_category: this.menuService.getCategory$,
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  onSelectDepartment(selected: number, departamentArray: DepartmentSlide[]) {
    const array = departamentArray;
    for (let index = 0; index < array.length; index++) {
      if (index === selected) {
        array[index].selected = !array[index].selected;
      } else {
        array[index].selected = false;
      }
    }

    if (array[selected].selected) {
      this.menuService.setDepartament(array[selected].slug);
      this.router.navigate([`products/${array[selected].slug}`], {
        queryParamsHandling: 'preserve',
      });
    } else {
      this.menuService.setDepartament('');
      this.router.navigate(['products'], {
        queryParamsHandling: 'preserve',
      });
    }
  }
}

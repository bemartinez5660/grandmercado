import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  MatChip,
  MatChipOption,
  MatChipsModule,
} from '@angular/material/chips';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, Observable } from 'rxjs';
import { DepartmentCategoryMenuService } from 'src/app/services/department-category-menu.service';
import { ShopState } from 'src/app/shop-store';
import { DepartamentSelectors } from 'src/app/shop-store/departament-store';
import { Departament } from '../../models/shop.models';

export interface ChipsData {
  departaments: Departament[];
  selected_departament: string;
  selected_category: string;
}
@Component({
  selector: 'app-category-chips',
  templateUrl: './category-chips.component.html',
  styleUrls: ['./category-chips.component.scss'],
  standalone: true,
  imports: [CommonModule, MatChipsModule],
})
export class CategoryChipsComponent implements OnInit {
  selectedDepartamet!: Departament;
  chipsData$: Observable<ChipsData>;

  constructor(
    private shopStore: Store<ShopState>,
    private router: Router,
    private menuService: DepartmentCategoryMenuService
  ) {
    this.chipsData$ = combineLatest({
      departaments: this.shopStore.pipe(
        select(DepartamentSelectors.selectAllDepartaments),
        filter((data) => data.length > 0)
      ),
      selected_departament: this.menuService.getDepartament$,
      selected_category: this.menuService.getCategory$,
    });
  }

  ngOnInit(): void {}

  checkSelectedDepartament(
    slug: string,
    route_param: string,
    departaments: Departament[]
  ): boolean {
    if (slug == route_param) {
      const departament = departaments.find((item) => item.slug == slug);
      if (departament) this.selectedDepartamet = departament;
      return true;
    }
    return false;
  }

  onSelectDepartament(chip: MatChipOption) {
    if (!chip.selected) {
      this.selectedDepartamet = chip.value;
      chip.toggleSelected();
      this.router.navigate([`products/${chip.value.slug}`]);
    }
  }
  onSelectCategory(chip: MatChipOption) {
    if (!chip.selected) {
      chip.toggleSelected();
      this.router.navigate([
        `products/${this.selectedDepartamet.slug}/${chip.value.slug}`,
      ]);
    }
  }
}

import { TestBed } from '@angular/core/testing';

import { DepartmentCategoryMenuService } from './department-category-menu.service';

describe('DepartmentCategoryMenuService', () => {
  let service: DepartmentCategoryMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentCategoryMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

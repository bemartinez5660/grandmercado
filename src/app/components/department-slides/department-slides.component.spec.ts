import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSlidesComponent } from './department-slides.component';

describe('DepartmentSlidesComponent', () => {
  let component: DepartmentSlidesComponent;
  let fixture: ComponentFixture<DepartmentSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentSlidesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

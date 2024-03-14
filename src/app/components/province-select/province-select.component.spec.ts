import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceSelectComponent } from './province-select.component';

describe('ProvinceSelectComponent', () => {
  let component: ProvinceSelectComponent;
  let fixture: ComponentFixture<ProvinceSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProvinceSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProvinceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

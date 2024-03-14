import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSlidesComponent } from './categories-slides.component';

describe('CategoriesSlidesComponent', () => {
  let component: CategoriesSlidesComponent;
  let fixture: ComponentFixture<CategoriesSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesSlidesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

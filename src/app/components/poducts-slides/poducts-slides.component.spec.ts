import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoductsSlidesComponent } from './poducts-slides.component';

describe('PoductsSlidesComponent', () => {
  let component: PoductsSlidesComponent;
  let fixture: ComponentFixture<PoductsSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoductsSlidesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PoductsSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

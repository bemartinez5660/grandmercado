import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquarePaymentCompletedComponent } from './square-payment-completed.component';

describe('SquarePaymentCompletedComponent', () => {
  let component: SquarePaymentCompletedComponent;
  let fixture: ComponentFixture<SquarePaymentCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SquarePaymentCompletedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SquarePaymentCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

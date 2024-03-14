import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquarePaymentComponent } from './square-payment.component';

describe('SquarePaymentComponent', () => {
  let component: SquarePaymentComponent;
  let fixture: ComponentFixture<SquarePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SquarePaymentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SquarePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

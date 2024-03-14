import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCallPaymentComponent } from './phone-call-payment.component';

describe('PhoneCallPaymentComponent', () => {
  let component: PhoneCallPaymentComponent;
  let fixture: ComponentFixture<PhoneCallPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhoneCallPaymentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneCallPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZellePaymentComponent } from './zelle-payment.component';

describe('ZellePaymentComponent', () => {
  let component: ZellePaymentComponent;
  let fixture: ComponentFixture<ZellePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZellePaymentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZellePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

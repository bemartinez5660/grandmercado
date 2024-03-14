import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDetailsTableComponent } from './orders-details-table.component';

describe('OrdersDetailsTableComponent', () => {
  let component: OrdersDetailsTableComponent;
  let fixture: ComponentFixture<OrdersDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersDetailsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

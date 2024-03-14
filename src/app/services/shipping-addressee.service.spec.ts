import { TestBed } from '@angular/core/testing';

import { ShippingAddresseeService } from './shipping-addressee.service';

describe('ShippingAddresseeService', () => {
  let service: ShippingAddresseeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingAddresseeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

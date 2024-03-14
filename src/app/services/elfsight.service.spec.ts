import { TestBed } from '@angular/core/testing';

import { ElfsightService } from './elfsight.service';

describe('ElfsightService', () => {
  let service: ElfsightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElfsightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

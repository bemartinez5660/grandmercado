/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { GTMGrandmercadoService } from './gtm-grandmercado.service';

describe('Service: GtmGrandmercado', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GTMGrandmercadoService],
    });
  });

  it('should ...', inject(
    [GTMGrandmercadoService],
    (service: GTMGrandmercadoService) => {
      expect(service).toBeTruthy();
    }
  ));
});

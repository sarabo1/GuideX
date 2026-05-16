import { TestBed } from '@angular/core/testing';

import { IdentificationServiceService } from './identification-service.service';

describe('IdentificationServiceService', () => {
  let service: IdentificationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentificationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

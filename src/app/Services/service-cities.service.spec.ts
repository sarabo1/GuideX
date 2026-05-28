import { TestBed } from '@angular/core/testing';

import { ServiceCitiesService } from './service-cities.service';

describe('ServiceCitiesService', () => {
  let service: ServiceCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

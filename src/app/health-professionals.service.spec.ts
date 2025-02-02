import { TestBed } from '@angular/core/testing';

import { HealthProfessionalsService } from './health-professionals.service';

describe('HealthProfessionalsService', () => {
  let service: HealthProfessionalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthProfessionalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

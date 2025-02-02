import { TestBed } from '@angular/core/testing';

import { HealthIssueService } from './health-issue.service';

describe('HealthIssueService', () => {
  let service: HealthIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

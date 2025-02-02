import { TestBed } from '@angular/core/testing';

import { HealtIssueService } from './healt-issue.service';

describe('HealtIssueService', () => {
  let service: HealtIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealtIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

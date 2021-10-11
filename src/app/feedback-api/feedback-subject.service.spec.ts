import { TestBed } from '@angular/core/testing';

import { FeedbackSubjectService } from './feedback-subject.service';

describe('FeedbackSubjectService', () => {
  let service: FeedbackSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

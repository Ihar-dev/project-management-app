import { TestBed } from '@angular/core/testing';

import { TaskSearchService } from './task-search.service';

describe('TaskSearchService', () => {
  let service: TaskSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

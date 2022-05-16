import { TestBed } from '@angular/core/testing';

import { BoardHandlingService } from './board-handling.service';

describe('BoardHandlingService', () => {
  let service: BoardHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

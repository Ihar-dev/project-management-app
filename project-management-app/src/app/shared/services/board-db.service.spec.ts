import { TestBed } from '@angular/core/testing';

import { BoardDbService } from './board-db.service';

describe('DataBaseService', () => {
  let service: BoardDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

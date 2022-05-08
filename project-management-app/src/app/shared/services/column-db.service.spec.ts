import { TestBed } from '@angular/core/testing';

import { ColumnDbService } from './column-db.service';

describe('ColumnDbService', () => {
  let service: ColumnDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

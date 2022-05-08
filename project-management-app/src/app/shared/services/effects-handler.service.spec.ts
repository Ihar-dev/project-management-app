import { TestBed } from '@angular/core/testing';

import { EffectsHandlerService } from './effects-handler.service';

describe('EffectsHandlerService', () => {
  let service: EffectsHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EffectsHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

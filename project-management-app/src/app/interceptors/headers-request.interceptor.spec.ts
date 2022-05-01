import { TestBed } from '@angular/core/testing';

import { HeadersRequestInterceptor } from './headers-request.interceptor';

describe('HeadersRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HeadersRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HeadersRequestInterceptor = TestBed.inject(HeadersRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseApiInterceptor } from './base-api.interceptor';
import { LoaderInterceptor } from './loader.interceptor';
import { HeadersRequestInterceptor } from './headers-request.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BaseApiInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HeadersRequestInterceptor, multi: true },
];

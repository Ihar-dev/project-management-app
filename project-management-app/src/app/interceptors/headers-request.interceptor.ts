import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../core/services/localstorage.service';
import { USER_TOKEN_KEY } from '../shared/constants';

const TOKEN_TYPE = 'Bearer';
@Injectable()
export class HeadersRequestInterceptor implements HttpInterceptor {
  constructor(private lsStorage: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const res = request.clone({
      headers: this.getHeaders(request),
    });

    return next.handle(res);
  }

  private getHeaders(request: HttpRequest<unknown>): HttpHeaders {
    const authToken = this.lsStorage.getItem<string>(USER_TOKEN_KEY);

    let headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', (authToken && `${TOKEN_TYPE} ${authToken}`) || '');

    // checking the request method. DELETE method should not be sent with a Content-Type header
    if (request.method !== 'DELETE') {
      headers = headers.set('Content-Type', 'application/json');
    }

    return headers;
  }
}

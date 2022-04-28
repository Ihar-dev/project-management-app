import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../core/services/localstorage.service';
import { USER_TOKEN_KEY } from '../auth/shared/constants';

const TOKEN_TYPE = 'Bearer';
@Injectable()
export class HeadersRequestInterceptor implements HttpInterceptor {
  constructor(private lsStorage: LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.lsStorage.getItem<string>(USER_TOKEN_KEY);
    const res = request.clone({
      setHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: (authToken && `${TOKEN_TYPE} ${authToken}`) || '',
      },
    });

    return next.handle(res);
  }
}

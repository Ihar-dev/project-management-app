import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/services/auth.service';
import { Url } from '../shared/constants';

@Injectable()
export class BaseApiInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isAuth(request)) {
      return EMPTY;
    }
    const res = request.clone({ url: `${environment.baseUrl}${request.url}` });
    return next.handle(res);
  }

  private isAuth(request: HttpRequest<unknown>): boolean {
    if (
      request.url.includes(Url.SIGN_IN) ||
      request.url.includes(Url.SIGN_UP) ||
      request.url.includes(Url.USERS)
    ) {
      return true;
    }

    return this.authService.isUserAuthenticated();
  }
}

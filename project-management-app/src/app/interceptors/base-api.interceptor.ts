import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url[0] !== '/') {
      const res = request.clone({ url: `${environment.baseUrl}${request.url}` });
      return next.handle(res);
    }
    return next.handle(request.clone({ url: request.url }));
  }
}

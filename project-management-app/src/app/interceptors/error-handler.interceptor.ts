import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof ErrorEvent) {
          console.log(error.message);
          return EMPTY;
        }

        console.log(error);
        return throwError(() => error);
      }),
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { HttpErrorService } from '../core/services/http-error.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private httpErrorService: HttpErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof ErrorEvent) {
          this.logMessage(error);
          return EMPTY;
        }

        return this.httpErrorService.handleError(error);
      }),
    );
  }

  private logMessage(error: ErrorEvent): void {
    console.log(error.message);
  }
}

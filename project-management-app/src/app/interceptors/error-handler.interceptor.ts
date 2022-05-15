import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { HttpErrorService } from '../core/services/http-error.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private httpErrorService: HttpErrorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          this.logMessage(error);
        }
        return this.httpErrorService.handleError(error);
      }),
    );
  }

  private logMessage(error: HttpErrorResponse): void {
    const errorMessage = Array.isArray(error.message) ? error.message.join(',') : error.message;
    console.log(errorMessage);
  }
}

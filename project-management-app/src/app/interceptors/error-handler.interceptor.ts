import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { MessagesDefault } from 'src/app/shared/models/messages-type';
import { MessageBoxService } from '../core/services/message-box.service';
import { ErrorMessage } from '../shared/constants';

const ERROR_MESSAGE = MessagesDefault.error;
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private messageBoxService: MessageBoxService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === ErrorMessage.forbidden) {
            return throwError(() => new Error(error.message));
          }
          this.messageBoxService.showMessage(ERROR_MESSAGE);
          console.log(error);
        }
        return EMPTY;
      }),
    );
  }
}

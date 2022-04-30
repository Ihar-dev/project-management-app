import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, EMPTY, Observable } from 'rxjs';
import { MessagesDefault } from 'src/app/shared/models/messages-type';
import { MessageBoxService } from '../core/services/message-box.service';
import { AuthService } from '../auth/services/auth.service';
import { ErrorMessages } from '../shared/constants';

const ERROR_MESSAGE = MessagesDefault.error;
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private messageBoxService: MessageBoxService, private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === ErrorMessages.forbidden) {
            this.auth.signOut();
            return EMPTY;
          }
          this.messageBoxService.showMessage(ERROR_MESSAGE);
          console.log(error);
        }
        return EMPTY;
      }),
    );
  }
}

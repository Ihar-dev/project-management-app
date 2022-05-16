import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, throwError } from 'rxjs';
import { HttpErrorCode } from '../../shared/constants';
import { HttpErrorMessage } from '../../shared/models/messages-type';
import { MessageBoxService } from './message-box.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  constructor(private messageBoxService: MessageBoxService) {}

  handleError(error: HttpErrorResponse) {
    const statusCode = error.status;
    let message: HttpErrorMessage;

    switch (statusCode) {
      case HttpErrorCode.FORBIDDEN:
      case HttpErrorCode.UNAUTHORIZED:
        message = HttpErrorMessage.notFound;
        this.messageBoxService.showMessage(message);
        return throwError(() => new Error(HttpErrorMessage.default));
      case HttpErrorCode.CONFLICT:
        message = HttpErrorMessage.wrongData;
        break;
      case HttpErrorCode.NOT_FOUND:
        message = HttpErrorMessage.notFound;
        break;
      default:
        message = HttpErrorMessage.default;
        break;
    }

    this.messageBoxService.showMessage(message);

    return EMPTY;
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, throwError } from 'rxjs';
import { HttpError } from 'src/app/shared/constants';
import { ErrorMessage } from 'src/app/shared/models/messages-type';
import { MessageBoxService } from './message-box.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  constructor(private messageBoxService: MessageBoxService) {}

  handleError(error: HttpErrorResponse) {
    const statusCode = error.status;
    let message: ErrorMessage;

    switch (statusCode) {
      case HttpError.FORBIDDEN:
      case HttpError.UNAUTHORIZED:
        message = ErrorMessage.wrongAuthData;
        this.messageBoxService.showMessage(message);
        return throwError(() => new Error(ErrorMessage.wrongAuthData));
      case HttpError.CONFLICT:
        message = ErrorMessage.wrongData;
        break;
      case HttpError.NOT_FOUND:
        message = ErrorMessage.notFound;
        break;
      default:
        message = ErrorMessage.default;
        break;
    }

    this.messageBoxService.showMessage(message);

    return EMPTY;
  }
}

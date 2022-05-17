import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';
import { HTTP_ERROR_MESSAGE_DEFAULT } from '../../shared/constants';
import { MessageState } from './message-box.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  private readonly messageDefault = HTTP_ERROR_MESSAGE_DEFAULT;

  error$ = new Subject<MessageState>();

  handleError(error: HttpErrorResponse, storeAction: string, errorMessages: IHttpErrorMessage[]) {
    const statusCode = error.status;
    const currentError = errorMessages.find((err) => err.statusCode === statusCode);
    const message = currentError ? currentError.message : this.messageDefault;

    console.log(`ERROR WITH ${storeAction}: ${error.error.message}`, error);
    this.showMessage(message);
    return EMPTY;
  }

  showMessage(message: string): void {
    this.error$.next({ isShown: true, message });
  }
}

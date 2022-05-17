import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';
import { MessageState } from 'src/app/shared/models/message-state.model';
import { HTTP_ERROR_MESSAGE_DEFAULT } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  error$ = new Subject<MessageState>();

  handleError(error: HttpErrorResponse, storeAction: string, errorMessages: IHttpErrorMessage[]) {
    const statusCode = error.status;
    const currentError = errorMessages.find((err) => err.statusCode === statusCode);

    console.log(`ERROR WITH ${storeAction}: ${error.error.message}`, error);
    this.showMessage(currentError?.message);
    return EMPTY;
  }

  showMessage(message: string = HTTP_ERROR_MESSAGE_DEFAULT): void {
    this.error$.next({ isShown: true, message });
  }
}

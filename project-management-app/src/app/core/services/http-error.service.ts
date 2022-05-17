import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';
import { HTTP_ERROR_MESSAGE_DEFAULT } from '../../shared/constants';
import { MessageBoxService } from './message-box.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  private readonly messageDefault = HTTP_ERROR_MESSAGE_DEFAULT;
  constructor(private messageBoxService: MessageBoxService) {}

  handleError(error: HttpErrorResponse, storeAction: string, errorMessages: IHttpErrorMessage[]) {
    const statusCode = error.status;
    const currentError = errorMessages.find((err) => err.statusCode === statusCode);
    const message = currentError ? currentError.message : this.messageDefault;

    console.log(`${storeAction}: ${error.message}`);
    this.messageBoxService.showMessage(message);
    return EMPTY;
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subject } from 'rxjs';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';
import { MessageState } from 'src/app/shared/models/message-state.model';
import { logout } from 'src/app/store/actions/auth.action';
import { HttpErrorCode, HTTP_ERROR_MESSAGE_DEFAULT } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  error$ = new Subject<MessageState>();

  constructor(private store: Store) {}

  handleError(error: HttpErrorResponse, errorMessages: IHttpErrorMessage[]): Observable<never> {
    const statusCode = error.status;
    if (this.isUnauth(statusCode)) {
      return EMPTY;
    }
    const currentError = errorMessages.find((err) => err.statusCode === statusCode);
    this.showMessage(currentError?.message);

    return EMPTY;
  }

  showMessage(message: string = HTTP_ERROR_MESSAGE_DEFAULT): void {
    this.error$.next({ isShown: true, message });
  }

  private isUnauth(code: number): boolean {
    if (code === HttpErrorCode.UNAUTHORIZED) {
      this.store.dispatch(logout());
      return true;
    }
    return false;
  }
}

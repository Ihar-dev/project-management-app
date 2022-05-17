import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { HttpErrorService } from 'src/app/core/services/http-error.service';
import { TErrorHandler } from 'src/app/shared/constants';
import { ErrorMessages } from 'src/app/shared/models/error-messages.model';
import { BoardActions } from '../actions/board.action';

@Injectable()
export class ErrorEffects {
  errorHandler: TErrorHandler;

  requestFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.loadBoardFailure),
        tap(({ data: { error, actionType } }) => {
          this.errorHandler(error, actionType);
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private handler: HttpErrorService) {
    this.errorHandler = this.handler.handleError(ErrorMessages.boardMessages);
  }
}

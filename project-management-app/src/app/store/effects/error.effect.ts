import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { HttpErrorService } from 'src/app/core/services/http-error.service';
import { TErrorHandler } from 'src/app/shared/constants';
import { BoardActions } from '../actions/board.action';
import { authError } from '../actions/auth.action';

@Injectable()
export class ErrorEffects {
  errorHandler: TErrorHandler;

  requestFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardActions.boardError, authError),
        tap(({ data: { error, actionType, messages } }) => {
          this.handler.handleError(error, actionType, messages);
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private handler: HttpErrorService) {}
}

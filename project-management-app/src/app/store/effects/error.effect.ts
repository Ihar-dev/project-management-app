import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { HttpErrorService } from 'src/app/core/services/http-error.service';
import { TErrorHandler } from 'src/app/shared/constants';
import { BoardActions } from '../actions/board.action';
import { authError } from '../actions/auth.action';
import { TaskActions } from '../actions/task.action';
import { ColumnActions } from '../actions/column.action';

@Injectable()
export class ErrorEffects {
  errorHandler: TErrorHandler;

  requestFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          authError,
          BoardActions.boardError,
          ColumnActions.columnError,
          TaskActions.taskError,
        ),
        tap(({ data: { error, messages } }) => {
          this.handler.handleError(error, messages);
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private handler: HttpErrorService) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs';
import { columnMessages } from 'src/app/shared/errors';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';
import { ColumnDbService } from 'src/app/shared/services/column-db.service';
import { ColumnActions } from '../actions/column.action';

@Injectable()
export class ColumnEffects {
  errorMessages: IHttpErrorMessage[] = columnMessages;

  addColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.addColumn),
      mergeMap((action) =>
        this.dbService.addColumn(action.boardID, action.column).pipe(
          map((column) => ColumnActions.addColumnSuccess({ boardID: action.boardID, column })),
          catchError((err) => this.handleColumnError(err)),
        ),
      ),
    ),
  );

  deleteColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.deleteColumn),
      mergeMap((action) =>
        this.dbService.deleteColumn(action.boardID, action.columnID).pipe(
          map(() => ColumnActions.deleteColumnSuccess({ ...action })),
          catchError((err) => this.handleColumnError(err)),
        ),
      ),
    ),
  );

  putBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.putColumn),
      mergeMap((action) =>
        this.dbService.updateColumn(action.boardID, { ...action.column }).pipe(
          map((column) => ColumnActions.putColumnSuccess({ boardID: action.boardID, column })),
          catchError((err) => this.handleColumnError(err)),
        ),
      ),
    ),
  );

  dragBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.dragColumn),
      mergeMap((action) =>
        this.dbService.updateColumn(action.boardID, { ...action.column }).pipe(
          map((column) => ColumnActions.putColumnSuccess({ boardID: action.boardID, column })),
          catchError((err) => this.handleColumnError(err)),
        ),
      ),
    ),
  );
  handleColumnError(err: any) {
    return [
      ColumnActions.columnError({
        data: {
          error: err,
          messages: this.errorMessages,
        },
      }),
    ];
  }

  constructor(private actions$: Actions, private dbService: ColumnDbService) {}
}

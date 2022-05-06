import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs';
import { ColumnDbService } from 'src/app/shared/services/column-db.service';
import { EffectsHandlerService } from 'src/app/shared/services/effects-handler.service';
import { ColumnActions } from '../actions/column.action';

enum Operation {
  AddColumn = 'Add column',
  DeleteColumn = 'Delete column',
  PutColumn = 'Put column'
}

@Injectable()
export class ColumnEffects {
  addColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnActions.addColumn),
      mergeMap((action) =>
        this.dbService.addColumn(action.boardID, action.column).pipe(
          map((column) =>
            ColumnActions.addColumnSuccess({ boardID: action.boardID, column }),
          ),
          catchError(this.handler.handleError(Operation.AddColumn)),
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
          catchError(this.handler.handleError(Operation.DeleteColumn)),
        ),
      ),
    ),
  );

  putBoard$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ColumnActions.putColumn),
    mergeMap((action) => this.dbService.renameColumn(action.boardID, {...action.column}).pipe(
      map((column) => ColumnActions.putColumnSuccess({boardID: action.boardID, column})),
      catchError(this.handler.handleError(Operation.DeleteColumn))
    )
    ))
  )

  constructor(
    private actions$: Actions,
    private dbService: ColumnDbService,
    private handler: EffectsHandlerService,
  ) {}
}

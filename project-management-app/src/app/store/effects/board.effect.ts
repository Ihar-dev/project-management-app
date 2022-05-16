import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpErrorService } from 'src/app/core/services/http-error.service';
import { TErrorHandler } from 'src/app/shared/constants';
import { ErrorMessages } from 'src/app/shared/models/error-messages.model';
import { BoardDbService } from 'src/app/shared/services/board-db.service';
import { BoardActions, BoardAction } from '../actions/board.action';

@Injectable()
export class BoardEffects {
  errorHandler: TErrorHandler;

  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoards),
      mergeMap(() =>
        this.dbService.getBoards().pipe(
          map((boards) => BoardActions.getBoardsSuccess({ boards })),
          catchError((err) => this.errorHandler(err, BoardAction.GetBoards)),
        ),
      ),
    ),
  );

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.addBoard),
      mergeMap((action) =>
        this.dbService.addBoard(action.board).pipe(
          map((board) => BoardActions.addBoardSuccess({ board })),
          catchError((err) => this.errorHandler(err, BoardAction.AddBoard)),
        ),
      ),
    ),
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.deleteBoard),
      mergeMap((action) =>
        this.dbService.deleteBoard(action.id).pipe(
          map(() => BoardActions.deleteBoardSuccess({ ...action })),
          catchError((err) => this.errorHandler(err, BoardAction.DeleteBoard)),
        ),
      ),
    ),
  );

  getBoardByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoardById),
      mergeMap((action) =>
        this.dbService.getBoardByID(action.id).pipe(
          map((board) => BoardActions.getBoardByIdSuccess({ board })),
          catchError((err) => this.errorHandler(err, BoardAction.GetBoardByID)),
        ),
      ),
    ),
  );

  putBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.putBoard),
      mergeMap((action) =>
        this.dbService.updateBoard(action.id, action.board).pipe(
          map((board) => BoardActions.putBoardSuccess({ board })),
          catchError((err) => this.errorHandler(err, BoardAction.PutBoard)),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private dbService: BoardDbService,
    private handler: HttpErrorService,
  ) {
    this.errorHandler = this.handler.handleError(ErrorMessages.boardMessages);
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { boardMessages } from 'src/app/shared/errors';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';
import { BoardDbService } from 'src/app/shared/services/board-db.service';
import { BoardActions } from '../actions/board.action';

@Injectable()
export class BoardEffects {
  errorMessages: IHttpErrorMessage[] = boardMessages;

  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoards),
      mergeMap(() =>
        this.dbService.getBoards().pipe(
          map((boards) => BoardActions.getBoardsSuccess({ boards })),
          catchError((err) => this.handleBoardError(err)),
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
          catchError((err) => this.handleBoardError(err)),
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
          catchError((err) => this.handleBoardError(err)),
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
          catchError((err) => this.handleBoardError(err)),
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
          catchError((err) => this.handleBoardError(err)),
        ),
      ),
    ),
  );

  handleBoardError(err: any) {
    return [
      BoardActions.boardError({
        data: { error: err, messages: this.errorMessages },
      }),
    ];
  }

  constructor(private actions$: Actions, private dbService: BoardDbService) {}
}

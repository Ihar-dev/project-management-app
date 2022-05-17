import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ErrorMessages } from 'src/app/shared/models/error-messages.model';
import { BoardDbService } from 'src/app/shared/services/board-db.service';
import { BoardActions, BoardAction } from '../actions/board.action';

@Injectable()
export class BoardEffects {
  errorMessages: ErrorMessages;

  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoards),
      mergeMap(() =>
        this.dbService.getBoards().pipe(
          map((boards) => BoardActions.getBoardsSuccess({ boards })),
          catchError((err) => [
            BoardActions.loadBoardFailure({
              data: { error: err, actionType: BoardAction.GetBoards },
            }),
          ]),
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
          catchError((err) => [
            BoardActions.loadBoardFailure({
              data: { error: err, actionType: BoardAction.AddBoard },
            }),
          ]),
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
          catchError((err) => [
            BoardActions.loadBoardFailure({
              data: { error: err, actionType: BoardAction.DeleteBoard },
            }),
          ]),
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
          catchError((err) => [
            BoardActions.loadBoardFailure({
              data: { error: err, actionType: BoardAction.GetBoardByID },
            }),
          ]),
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
          catchError((err) => [
            BoardActions.loadBoardFailure({
              data: { error: err, actionType: BoardAction.PutBoard },
            }),
          ]),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private dbService: BoardDbService) {
    this.errorMessages = ErrorMessages.boardMessages;
  }
}

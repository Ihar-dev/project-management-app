import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { BoardDbService } from 'src/app/shared/services/board-db.service';
import { BoardActions } from '../actions/board.action';

@Injectable()
export class BoardEffects {
  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoards),
      mergeMap(() =>
        this.dbService.getBoards().pipe(
          map((boards) => BoardActions.getBoardsSuccess({ boards })),
          catchError(() => EMPTY),
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
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.deleteBoard),
      mergeMap((action) =>
        this.dbService
          .deleteBoard(action.id)
          .pipe(map(() => BoardActions.deleteBoardSuccess({ id: action.id }))),
      ),
    ),
  );

  getBoardByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.getBoardsById),
      mergeMap((action) =>
        this.dbService
          .getBoardByID(action.id)
          .pipe(map((board) => BoardActions.getBoardsByIdSuccess({ board }))),
      ),
    ),
  );

  putBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.putBoard),
      mergeMap((action) =>
        this.dbService
          .renameBoard(action.id, action.board)
          .pipe(map((board) => BoardActions.putBoardSuccess({ board }))),
      ),
    ),
  );

  constructor(private actions$: Actions, private dbService: BoardDbService) {}
}

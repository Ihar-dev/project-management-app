import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { BoardDbService } from 'src/app/shared/services/board-db.service';
import { EffectsHandlerService } from 'src/app/shared/services/effects-handler.service';
import { BoardActions } from '../actions/board.action';

enum Operation {
  GetBoards = 'Get boards',
  AddBoard = 'Add board',
  DeleteBoard = 'Delete board',
  GetBoardByID = 'Get board by id',
  PutBoard = 'Update board',
}

@Injectable()
export class BoardEffects {
  getBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.getBoards),
      mergeMap(() =>
        this.dbService.getBoards().pipe(
          map((boards) => BoardActions.getBoardsSuccess({ boards })),
          catchError(this.handler.handleError(Operation.GetBoards)),
        ),
      ),
    );
  });

  addBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.addBoard),
      mergeMap((action) =>
        this.dbService.addBoard(action.board).pipe(
          map((board) => BoardActions.addBoardSuccess({ board })),
          catchError(this.handler.handleError(Operation.AddBoard)),
        ),
      ),
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.deleteBoard),
      mergeMap((action) =>
        this.dbService.deleteBoard(action.id).pipe(
          map(() => BoardActions.deleteBoardSuccess({ ...action })),
          catchError(this.handler.handleError(Operation.DeleteBoard)),
        ),
      ),
    );
  });

  getBoardByID$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.getBoardById),
      mergeMap((action) =>
        this.dbService.getBoardByID(action.id).pipe(
          map((board) => BoardActions.getBoardByIdSuccess({ board })),
          catchError(this.handler.handleError(Operation.GetBoardByID)),
        ),
      ),
    );
  });

  putBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.putBoard),
      mergeMap((action) =>
        this.dbService.updateBoard(action.id, action.board).pipe(
          map((board) => BoardActions.putBoardSuccess({ board })),
          catchError(this.handler.handleError(Operation.PutBoard)),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private dbService: BoardDbService,
    private handler: EffectsHandlerService,
  ) {}
}

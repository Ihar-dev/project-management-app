import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IBoardRequest } from 'src/app/shared/models/board-request.model';
import { IBoard } from 'src/app/shared/models/board.model';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';

export enum BoardAction {
  AddBoard = '[board] ADD_BOARD',
  AddBoardSuccess = '[board] ADD_BOARD_SUCCESS',
  GetBoards = '[board] GET_BOARDS',
  GetBoardsSuccess = '[board] GET_BOARDS_SUCCESS',
  GetBoardByID = '[board] GET_BOARD_BY_ID',
  GetBoardByIDSuccess = '[board] GET_BOARD_BY_ID_SUCCESS',
  PutBoard = '[board] PUT_BOARD',
  PutBoardSuccess = '[board] PUT_BOARD_SUCCESS',
  DeleteBoard = '[board] DELETE_BOARD',
  DeleteBoardSuccess = '[board] DELETE_BOARD_SUCCESS',
  boardError = '[board] BOARD_ERROR',
}

export namespace BoardActions {
  export const addBoard = createAction(BoardAction.AddBoard, props<{ board: IBoardRequest }>());
  export const addBoardSuccess = createAction(
    BoardAction.AddBoardSuccess,
    props<{ board: IBoard }>(),
  );

  export const getBoards = createAction(BoardAction.GetBoards);
  export const getBoardsSuccess = createAction(
    BoardAction.GetBoardsSuccess,
    props<{ boards: IBoard[] }>(),
  );

  export const getBoardById = createAction(BoardAction.GetBoardByID, props<{ id: string }>());
  export const getBoardByIdSuccess = createAction(
    BoardAction.GetBoardByIDSuccess,
    props<{ board: IBoard }>(),
  );

  export const deleteBoard = createAction(BoardAction.DeleteBoard, props<{ id: string }>());
  export const deleteBoardSuccess = createAction(
    BoardAction.DeleteBoardSuccess,
    props<{ id: string }>(),
  );

  export const putBoard = createAction(
    BoardAction.PutBoard,
    props<{ id: string; board: IBoardRequest }>(),
  );
  export const putBoardSuccess = createAction(
    BoardAction.PutBoardSuccess,
    props<{ board: IBoard }>(),
  );

  export const boardError = createAction(
    BoardAction.boardError,
    props<{
      data: { error: HttpErrorResponse; actionType: BoardAction; messages: IHttpErrorMessage[] };
    }>(),
  );
}

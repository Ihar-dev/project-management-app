import { createAction, props } from '@ngrx/store';
import { Board } from 'src/app/shared/models/board.model';

const ADD_BOARD = '[board] ADD_BOARD';
const ADD_BOARD_SUCCESS = '[board] ADD_BOARD_SUCCESS';

const GET_BOARDS = '[board] GET_BOARDS';
const GET_BOARDS_SUCCESS = '[board] GET_BOARDS_SUCCESS';

const GET_BOARD_BY_ID = '[board] GET_BOARD_BY_ID';
const GET_BOARD_BY_ID_SUCCESS = '[board] GET_BOARD_BY_ID_SUCCESS';

const DELETE_BOARD = '[board] DELETE_BOARD';
const DELETE_BOARD_SUCCESS = '[board] DELETE_BOARD_SUCCESS';

const PUT_BOARD = '[board] PUT_BOARD';
const PUT_BOARD_SUCCESS = '[board] PUT_BOARD_SUCCESS';

export namespace BoardActions {
  export const addBoard = createAction(ADD_BOARD, props<{ board: Board }>());
  export const addBoardSuccess = createAction(ADD_BOARD_SUCCESS, props<{ board: Board }>());

  export const getBoards = createAction(GET_BOARDS);
  export const getBoardsSuccess = createAction(GET_BOARDS_SUCCESS, props<{ boards: Board[] }>());

  export const getBoardsById = createAction(GET_BOARD_BY_ID, props<{ id: string }>());
  export const getBoardsByIdSuccess = createAction(
    GET_BOARD_BY_ID_SUCCESS,
    props<{ board: Board }>(),
  );

  export const deleteBoard = createAction(DELETE_BOARD, props<{ id: string }>());
  export const deleteBoardSuccess = createAction(DELETE_BOARD_SUCCESS, props<{ id: string }>());

  export const putBoard = createAction(PUT_BOARD, props<{ id: string; board: Board }>());
  export const putBoardSuccess = createAction(PUT_BOARD_SUCCESS, props<{ board: Board }>());
}

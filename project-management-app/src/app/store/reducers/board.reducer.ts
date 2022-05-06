import { Action, createReducer, on } from '@ngrx/store';
import { IBoard } from 'src/app/shared/models/board.model';
import { BoardActions } from '../actions/board.action';
import { ColumnActions } from '../actions/column.action';

export interface State {
  boards: IBoard[];
}

const initialState: State = {
  boards: [],
};

function copyThat<T>(array: T[]): T[] {
  return array.slice()
};

function findIndexByID(boards: IBoard[], boardID: string): number {
  return boards.findIndex((board: IBoard) => board.id === boardID);
}

const boardReducer = createReducer(
  initialState,
  on(
    BoardActions.addBoardSuccess,
    (state, { board }): State => ({
      ...state,
      boards: state.boards.concat(board),
    }),
  ),
  on(
    BoardActions.getBoardsSuccess,
    (state, { boards }): State => ({
      ...state,
      boards,
    }),
  ),
  on(
    BoardActions.deleteBoardSuccess,
    (state, { id }): State => ({
      ...state,
      boards: state.boards.filter((board) => board.id !== id),
    }),
  ),

  on(BoardActions.getBoardsByIdSuccess, (state, { board }): State => {
    const newBoards = copyThat(state.boards);
    const idx = findIndexByID(newBoards, board.id);
    if (idx !== -1) {
      newBoards.splice(idx, 1, board);
    }
    return {
      ...state,
      boards: newBoards,
    };
  }),

  on(BoardActions.putBoardSuccess, (state, { board }): State => {
    const newBoards = copyThat(state.boards);
    const idx = findIndexByID(newBoards, board.id);
    if (idx !== -1) {
      newBoards[idx] = {
        ...newBoards[idx],
        title: board.title,
      };
    }

    return { ...state, boards: newBoards };
  }),

  on(ColumnActions.addColumnSuccess, (state, { boardID, column }): State => {
    const newBoards = copyThat(state.boards);
    const idx = findIndexByID(newBoards, boardID);
    if (idx !== -1) {
      newBoards[idx] = {
        ...newBoards[idx],
        columns: newBoards[idx].columns?.concat(column),
      };
    }
    return {
      ...state,
      boards: newBoards,
    };
  }),

  on(ColumnActions.deleteColumnSuccess, (state, { boardID, columnID }): State => {
    const newBoards = copyThat(state.boards);
    const idx = findIndexByID(newBoards, boardID);
    if (idx !== -1) {
      newBoards[idx] = {
        ...newBoards[idx],
        columns: newBoards[idx].columns?.filter((column) => column.id !== columnID),
      };
    }
    return {
      ...state,
      boards: newBoards,
    };
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return boardReducer(state, action);
}


import { Action, createReducer, on } from '@ngrx/store';
import { Board } from 'src/app/shared/models/board.model';
import { BoardActions } from '../actions/board.action';

export interface State {
  boards: Board[];
}

const initialState: State = {
  boards: [],
};

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
    const newBoards = state.boards.slice();
    const idx = newBoards.findIndex((oldBoard: Board) => oldBoard.id === board.id);
    newBoards.splice(idx, 1, board);
    return {
      ...state,
      boards: newBoards,
    };
  }),

  on(BoardActions.putBoardSuccess, (state, { board }): State => {
    const newBoards = state.boards.slice();
    const idx = newBoards.findIndex((oldBoard: Board) => oldBoard.id === board.id);
    newBoards[idx] = {
      ...newBoards[idx],
      title: board.title,
    };
    return { ...state, boards: newBoards };
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return boardReducer(state, action);
}

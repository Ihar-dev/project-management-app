import { Action, createReducer, on } from '@ngrx/store';
import { Board } from 'src/app/models/board.model';
import { BoardActions } from '../actions/board.action';

export interface State {
  boards: Board[];
}

const initialState: State = {
  boards: [],
};

const boardReducer = createReducer(
  initialState,
  on(BoardActions.addBoard, (state, { board }) => ({
    ...state,
    boards: state.boards.concat(board),
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return boardReducer(state, action);
}

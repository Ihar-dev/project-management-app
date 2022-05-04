import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Board } from 'src/app/shared/models/board.model';
import { State } from '../reducers/board.reducer';

export namespace BoardSelectors {
  export const selectState = createFeatureSelector<State>('board');

  export const selectBoards = createSelector(selectState, (state: State): Board[] => state.boards);
}

import { createAction, props } from '@ngrx/store';
import { Board } from 'src/app/models/board.model';

export namespace BoardActions {
  export const addBoard = createAction('[board] ADD_BOARD', props<{ board: Board }>());
}

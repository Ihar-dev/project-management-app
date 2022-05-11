import { AuthState } from './auth-state.model';
import { State } from './reducers/board.reducer';

export interface StoreState {
  board: State;
  auth: AuthState;
}

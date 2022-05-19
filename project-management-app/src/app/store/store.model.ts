import { AuthState } from './auth-state.model';
import { State } from './reducers/board.reducer';
import { UsersState } from './reducers/users.reducer';

export interface StoreState {
  board: State;
  auth: AuthState;
  users: UsersState;
}

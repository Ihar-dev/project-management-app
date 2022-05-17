import { Action, createReducer, on } from '@ngrx/store';
import { UserDataResponse } from 'src/app/shared/models/user.model';
import { UsersActions } from '../actions/users.action';

export interface UsersState {
  users: UserDataResponse[];
}

const initialState: UsersState = {
  users: [],
};

function sortByName(array: UserDataResponse[]): UserDataResponse[] {
  return array.sort((a, b) => a.name.localeCompare(b.name));
}

const usersReducer = createReducer(
  initialState,
  on(
    UsersActions.getAllSuccess,
    (state, { users }): UsersState => ({
      ...state,
      users: sortByName([...users]),
    }),
  ),

  on(
    UsersActions.putUserSuccess,
    (state, { user }): UsersState => ({
      ...state,
      users: sortByName(state.users.filter((u) => u.id !== user.id).concat(user)),
    }),
  ),

  on(
    UsersActions.deleteUserSuccess,
    (state, { id }): UsersState => ({
      ...state,
      users: sortByName(state.users.filter((u) => u.id !== id)),
    }),
  ),
);

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}

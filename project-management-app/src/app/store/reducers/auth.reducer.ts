import { createReducer, on } from '@ngrx/store';
import { authInitialState } from '../auth-state.model';
import * as AuthActions from '../actions/auth.action';
import { UsersActions } from '../actions/users.action';

export const authReducer = createReducer(
  authInitialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    profile: user,
    isAuthenticated: true,
  })),

  on(UsersActions.putUserSuccess, (state, { user }) => ({
    ...state,
    profile: user,
    isAuthenticated: true,
  })),

  on(AuthActions.loginFailure, (state) => ({
    ...state,
    ...authInitialState,
  })),

  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    ...authInitialState,
  })),

  on(UsersActions.deleteUserSuccess, (state) => ({
    ...state,
    ...authInitialState,
  })),
);

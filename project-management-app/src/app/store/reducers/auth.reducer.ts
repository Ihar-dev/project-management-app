import { createReducer, on } from '@ngrx/store';
import { authInitialState } from '../auth-state.model';
import * as AuthActions from '../actions/auth.action';

export const authReducer = createReducer(
  authInitialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    profile: user,
    isAuthenticated: true,
  })),

  on(AuthActions.authFailure, (state) => ({
    ...state,
    ...authInitialState,
  })),

  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    ...authInitialState,
  })),
);

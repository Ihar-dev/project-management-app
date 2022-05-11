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

  on(AuthActions.authFailure, (state, { error }) => ({
    ...state,
    profile: null,
    isAuthenticated: false,
    error,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    profile: null,
    isAuthenticated: false,
  })),
);

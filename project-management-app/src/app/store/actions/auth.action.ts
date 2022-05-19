import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';
import { TSigninData } from 'src/app/shared/models/login-data.model';
import { TUserData } from 'src/app/shared/models/register-data.model';
import { User } from 'src/app/shared/models/user.model';

export enum AuthActionType {
  Signup = '[auth] SIGNUP',
  Login = '[auth] LOGIN',
  LoginSuccess = '[auth] LOGIN_SUCCESS',
  LoginFailure = '[auth] LOGIN_FAILURE',
  Logout = '[auth] Logout',
  LogoutSuccess = '[auth] LOGOUT_SUCCESS',
  AuthError = '[auth] AUTH_ERROR',
}

export const signup = createAction(AuthActionType.Signup, props<{ userData: TUserData }>());

export const login = createAction(AuthActionType.Login, props<{ userData: TSigninData }>());
export const loginSuccess = createAction(AuthActionType.LoginSuccess, props<{ user: User }>());
export const loginFailure = createAction(AuthActionType.LoginFailure);

export const logout = createAction(AuthActionType.Logout);
export const logoutSuccess = createAction(AuthActionType.LogoutSuccess);
export const authError = createAction(
  AuthActionType.AuthError,
  props<{
    data: { error: HttpErrorResponse; messages: IHttpErrorMessage[] };
  }>(),
);

import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';
import { TSigninData } from 'src/app/shared/models/login-data.model';
import { TUserData } from 'src/app/shared/models/register-data.model';
import { User } from 'src/app/shared/models/user.model';

export enum AuthActionType {
  Signup = '[Auth] Signup',
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  AuthFailure = '[Auth] Auth Failure',
  AuthError = '[Auth] Auth Error',
}

export const signup = createAction(AuthActionType.Signup, props<{ userData: TUserData }>());

export const login = createAction(AuthActionType.Login, props<{ userData: TSigninData }>());
export const loginSuccess = createAction(AuthActionType.LoginSuccess, props<{ user: User }>());
export const authFailure = createAction(AuthActionType.AuthFailure);

export const logout = createAction(AuthActionType.Logout);
export const logoutSuccess = createAction(AuthActionType.LogoutSuccess);
export const authError = createAction(
  AuthActionType.AuthError,
  props<{
    data: { error: HttpErrorResponse; actionType: AuthActionType; messages: IHttpErrorMessage[] };
  }>(),
);

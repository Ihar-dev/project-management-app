import { createAction, props } from '@ngrx/store';
import { TSigninData } from 'src/app/shared/models/login-data.model';
import { TUserData } from 'src/app/shared/models/register-data.model';
import { User } from 'src/app/shared/models/user.model';

export enum AuthActionTypes {
  Signup = '[Auth] Signup',
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  AuthFailure = '[Auth] Auth Failure',
}

export const signup = createAction(AuthActionTypes.Signup, props<{ userData: TUserData }>());

export const login = createAction(AuthActionTypes.Login, props<{ userData: TSigninData }>());
export const loginSuccess = createAction(AuthActionTypes.LoginSuccess, props<{ user: User }>());
export const authFailure = createAction(AuthActionTypes.AuthFailure);

export const logout = createAction(AuthActionTypes.Logout);
export const logoutSuccess = createAction(AuthActionTypes.LogoutSuccess);

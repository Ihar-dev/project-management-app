import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ErrorMessages } from 'src/app/shared/models/error-messages.model';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as AuthActions from '../actions/auth.action';

@Injectable()
export class AuthEffects {
  errorMessages: IHttpErrorMessage[] = ErrorMessages.authMessages;

  constructor(private actions$: Actions, private authService: AuthService) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthActionType.Signup),
      mergeMap(({ userData }) =>
        this.authService.signUp(userData).pipe(
          map((data) =>
            AuthActions.login({ userData: { password: data.password, login: data.login } }),
          ),
          catchError((err) => [
            AuthActions.authError({
              data: {
                error: err,
                actionType: AuthActions.AuthActionType.Signup,
                messages: this.errorMessages,
              },
            }),
          ]),
        ),
      ),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthActionType.Login),
      mergeMap(({ userData }) =>
        this.authService.login(userData).pipe(
          map((data) => {
            if (data) {
              return AuthActions.loginSuccess({ user: data });
            }

            return AuthActions.authFailure();
          }),
          catchError((err) => [
            AuthActions.authError({
              data: {
                error: err,
                actionType: AuthActions.AuthActionType.Login,
                messages: this.errorMessages,
              },
            }),
          ]),
        ),
      ),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthActionType.Logout),
      map(() => {
        this.authService.signOut();
        return AuthActions.logoutSuccess();
      }),
      catchError((err) => [
        AuthActions.authError({
          data: {
            error: err,
            actionType: AuthActions.AuthActionType.Logout,
            messages: this.errorMessages,
          },
        }),
      ]),
    ),
  );
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ErrorMessages } from 'src/app/shared/models/error-messages.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as AuthActions from '../actions/auth.action';

@Injectable()
export class AuthEffects {
  errorMessages: ErrorMessages = ErrorMessages.authMessages;

  constructor(private actions$: Actions, private authService: AuthService) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.Signup),
      mergeMap(({ userData }) =>
        this.authService
          .signUp(userData)
          .pipe(
            map((data) =>
              AuthActions.login({ userData: { password: data.password, login: data.login } }),
            ),
          ),
      ),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.Login),
      mergeMap(({ userData }) =>
        this.authService.login(userData).pipe(
          map((data) => {
            if (data) {
              return AuthActions.loginSuccess({ user: data });
            }

            return AuthActions.authFailure();
          }),
        ),
      ),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.Logout),
      map(() => {
        this.authService.signOut();
        return AuthActions.logoutSuccess();
      }),
    ),
  );
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as AuthActions from '../actions/auth.action';

@Injectable()
export class AuthEffects {
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
        this.authService.signIn(userData).pipe(
          map((data) => {
            if (data) {
              return AuthActions.loginSuccess({ user: new User(data) });
            }

            return AuthActions.authFailure({ error: new Error('No user Found!') });
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
        return AuthActions.logout();
      }),
    ),
  );
}

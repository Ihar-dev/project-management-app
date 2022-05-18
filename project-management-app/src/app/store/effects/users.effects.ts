import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/user/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

import { UsersActions } from '../actions/users.action';

@Injectable()
export class UsersEffects {
  getAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getAll),
      mergeMap(() =>
        this.dbService.getAllUsers().pipe(map((users) => UsersActions.getAllSuccess({ users }))),
      ),
    ),
  );

  putUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.putUser),
      mergeMap((action) =>
        this.dbService
          .updateUser(action.data, action.id)
          .pipe(map((user) => UsersActions.putUserSuccess({ user }))),
      ),
    ),
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap((action) =>
        this.dbService.deleteUser(action.id).pipe(
          map(() => UsersActions.deleteUserSuccess({ id: action.id })),
          tap(() => {
            this.authService.signOut();
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private dbService: UserService,
    private authService: AuthService,
  ) {}
}

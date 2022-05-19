import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/user/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';
import { userMessages } from 'src/app/shared/errors';
import { UsersActions } from '../actions/users.action';

@Injectable()
export class UsersEffects {
  errorMessages: IHttpErrorMessage[] = userMessages;

  getAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getAll),
      mergeMap(() =>
        this.dbService.getAllUsers().pipe(
          map((users) => UsersActions.getAllSuccess({ users })),
          catchError((err) => this.handleUserError(err)),
        ),
      ),
    ),
  );

  putUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.putUser),
      mergeMap((action) =>
        this.dbService.updateUser(action.data, action.id).pipe(
          map((user) => UsersActions.putUserSuccess({ user })),
          catchError((err) => this.handleUserError(err)),
        ),
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
          catchError((err) => this.handleUserError(err)),
        ),
      ),
    ),
  );

  handleUserError(err: any) {
    return [
      UsersActions.userError({
        data: {
          error: err,
          messages: this.errorMessages,
        },
      }),
    ];
  }

  constructor(
    private actions$: Actions,
    private dbService: UserService,
    private authService: AuthService,
  ) {}
}

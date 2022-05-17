import { createAction, props } from '@ngrx/store';
import { TUserData } from 'src/app/shared/models/register-data.model';
import { User } from 'src/app/shared/models/user.model';

enum UsersAction {
  GetAll = '[Users] GET_ALL',
  GetAllSuccess = '[Users] GET_ALL_SUCCESS',
  DeleteUser = '[Users] DELETE_USER',
  DeleteUserSuccess = '[Users] DELETE_USER_SUCCESS',
  PutUser = '[Users] PUT_USER',
  PutUserSuccess = '[Users] PUT_USER_SUCCESS',
}

export namespace UsersActions {
  export const getAll = createAction(UsersAction.GetAll);
  export const getAllSuccess = createAction(UsersAction.GetAllSuccess, props<{ users: User[] }>());

  export const deleteUser = createAction(UsersAction.DeleteUser, props<{ id: string }>());
  export const deleteUserSuccess = createAction(
    UsersAction.DeleteUserSuccess,
    props<{ id: string }>(),
  );

  export const putUser = createAction(
    UsersAction.PutUser,
    props<{ data: TUserData; id: string }>(),
  );
  export const putUserSuccess = createAction(UsersAction.PutUserSuccess, props<{ user: User }>());
}

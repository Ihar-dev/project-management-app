import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserDataResponse } from 'src/app/shared/models/user.model';
import { UsersState } from '../reducers/users.reducer';

export namespace UsersSelectors {
  export const selectState = createFeatureSelector<UsersState>('users');

  export const selectUsers = createSelector(
    selectState,
    (state: UsersState): UserDataResponse[] => state.users,
  );
}

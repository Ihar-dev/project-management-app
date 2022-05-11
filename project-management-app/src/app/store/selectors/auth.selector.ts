import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../auth-state.model';

export const featureAuthKey = 'auth';

export const selectFeatureAuth = createFeatureSelector<AuthState>(featureAuthKey);

export const selectIsAuth = createSelector(
  selectFeatureAuth,
  (state: AuthState) => state.isAuthenticated,
);

import { createSelector } from '@ngrx/store';
import { StoreState } from '../store.model';

export const selectAuth = (state: StoreState) => state.auth;

export const isAuth = createSelector(selectAuth, (state) => state.isAuthenticated);

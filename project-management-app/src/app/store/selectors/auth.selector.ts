import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreState } from '../store.model';

export const selectAuth = createFeatureSelector<StoreState>('auth');

export const selectIsAuth = createSelector(selectAuth, (state) => state.auth.isAuthenticated);

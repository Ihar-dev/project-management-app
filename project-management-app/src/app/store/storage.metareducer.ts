import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { AuthState } from './auth-state.model';
import { StoreState } from './store.model';

const lsAuthKey = 'auth-state';

function catchErr(err: unknown) {
  console.log(err);
}

function handleLsState(callback: () => void) {
  try {
    callback();
  } catch (err) {
    catchErr(err);
  }
}

export function lsStateReducer(reducer: ActionReducer<StoreState>): ActionReducer<any, any> {
  let onInit = true;
  return (state: StoreState, action: Action) => {
    const nextState = reducer(state, action);

    if (onInit) {
      onInit = false;
      handleLsState(() => {
        const stateFromLs = localStorage.getItem(lsAuthKey);
        if (stateFromLs) {
          const stateAuth = <AuthState>JSON.parse(stateFromLs);
          nextState.auth = stateAuth;
        }
      });
    } else {
      handleLsState(() => {
        localStorage.setItem(lsAuthKey, JSON.stringify(nextState.auth));
      });
    }

    return nextState;
  };
}

export const metaReducers: MetaReducer<StoreState>[] = [lsStateReducer];

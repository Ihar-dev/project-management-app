import { User } from '../shared/models/user.model';

export interface AuthState {
  isAuthenticated: boolean;
  profile: User | null;
  error: Error | null;
}

export const authInitialState: AuthState = {
  isAuthenticated: false,
  profile: null,
  error: null,
};

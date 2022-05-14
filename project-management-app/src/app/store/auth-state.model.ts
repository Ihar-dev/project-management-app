import { User } from '../shared/models/user.model';

export interface AuthState {
  isAuthenticated: boolean;
  profile: User | null;
}

export const authInitialState: AuthState = {
  isAuthenticated: false,
  profile: null,
};

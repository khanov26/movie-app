import { User } from '../../types/user';

export interface UserState {
  isLoading: boolean;
  entity: User | null;
  error?: string;
}

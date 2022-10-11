import { Actor } from '../../types/actor';

export interface ActorsState {
  isLoading: boolean;
  items: Actor[];
  error?: string;
}

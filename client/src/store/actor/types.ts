import { Actor } from '../../types/actor';

export interface ActorState {
  isLoading: boolean;
  entity: Actor | null;
  error?: string;
}

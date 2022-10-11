import { Movie } from '../../types/movie';

export interface MovieState {
  isLoading: boolean;
  entity: Movie | null;
  error?: string;
}

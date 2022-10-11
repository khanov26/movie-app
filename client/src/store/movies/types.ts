import { Movie } from '../../types/movie';

export interface MoviesState {
  isLoading: boolean;
  items: Movie[];
  error?: string;
}

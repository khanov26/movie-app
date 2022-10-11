import { Character } from '../../types/character';

export interface CharactersSearchParams {
  movieId?: string;
  actorId?: string;
}

export interface CharactersState {
  isLoading: boolean;
  items: Character[];
  error?: string;
}

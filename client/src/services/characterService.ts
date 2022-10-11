import api from './api';
import { Character } from '../types/character';

export const getByMovieId = async (movieId: string): Promise<Character[]> => {
  const response = await api.get<Character[]>(`movie/${movieId}/characters`);
  return response.data;
};

export const getByActorId = async (actorId: string): Promise<Character[]> => {
  const response = await api.get<Character[]>(`actor/${actorId}/characters`);
  return response.data;
};

export const create = async (character: Character): Promise<Character> => {
  const response = await api.post<Character>('/character', character);
  return response.data;
};

export const deleteById = async (id: string) => {
  await api.delete(`/character/${id}`);
};

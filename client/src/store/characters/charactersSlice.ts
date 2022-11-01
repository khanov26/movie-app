import { Character } from '../../types/character';
import { apiSlice } from '../api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCharacters: builder.query<
      Character[],
      { actorId: string } | { movieId: string }
    >({
      query: (param) =>
        'actorId' in param
          ? `actor/${param.actorId}/characters`
          : `movie/${param.movieId}/characters`,
      providesTags: (_result, _error, param) => [
        {
          type: 'Character',
          id: 'actorId' in param ? param.actorId : param.movieId,
        },
      ],
    }),
    addCharacter: builder.mutation<Character, Character>({
      query: (character) => ({
        url: '/character',
        method: 'POST',
        body: character,
      }),
      invalidatesTags: (_result, _error, character) => [
        { type: 'Character', id: character.actor.id },
        { type: 'Character', id: character.movie.id },
      ],
    }),
    deleteCharacter: builder.mutation<void, Character>({
      query: (character) => ({
        url: `/character/${character.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, character) => [
        { type: 'Character', id: character.actor.id },
        { type: 'Character', id: character.movie.id },
      ],
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useAddCharacterMutation,
  useDeleteCharacterMutation,
} = extendedApiSlice;

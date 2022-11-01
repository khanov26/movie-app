import { Actor } from '../../types/actor';
import { Movie } from '../../types/movie';
import { apiSlice } from '../api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<{ movies: Movie[]; actors: Actor[] }, string>({
      query: (query) => ({
        url: '/search',
        params: { query },
      }),
    }),
  }),
});

export const { useSearchQuery } = extendedApiSlice;

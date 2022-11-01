import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthState } from '../auth/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState() as { auth: AuthState | null };
      if (auth) {
        headers.set('Authorization', `Bearer ${auth.accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    'Actor',
    'Character',
    'Movie',
    'User',
    'FavoriteMovie',
    'MovieRating',
  ],
  endpoints: () => ({}),
});

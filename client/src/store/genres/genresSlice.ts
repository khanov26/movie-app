import { apiSlice } from '../api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query<string[], void>({
      query: () => '/genres',
    }),
  }),
});

export const { useGetGenresQuery } = extendedApiSlice;

import { User } from '../../types/user';
import { convertObjectToFormData } from '../../utils/data';
import { apiSlice } from '../api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => `/user/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    addUser: build.mutation<User, { user: User; password: string }>({
      query: ({ user, password }) => ({
        url: '/signup',
        method: 'POST',
        body: { ...user, password },
      }),
    }),
    updateUser: build.mutation<User, { user: User; profile: File | null }>({
      query: ({ user, profile }) => {
        const data = convertObjectToFormData(user);

        if (profile) {
          data.set('profile', profile);
        }
        return {
          url: '/user',
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (result, error, { user: { id } }) => [
        { type: 'User', id },
      ],
    }),
    addFavoriteMovie: build.mutation<void, { userId: string; movieId: string }>(
      {
        query: (params) => ({
          url: '/user/favorite-movies',
          method: 'POST',
          body: params,
        }),
        invalidatesTags: ['FavoriteMovie'],
      }
    ),
    removeFavoriteMovie: build.mutation<
      void,
      { userId: string; movieId: string }
    >({
      query: ({ userId, movieId }) => ({
        url: `/user/${userId}/favorite-movies/${movieId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FavoriteMovie'],
    }),
    checkFavoriteMovie: build.query<
      { isFavorite: boolean },
      { userId: string; movieId: string }
    >({
      query: (params) => ({
        url: '/user/favorite-movies',
        params,
      }),
      providesTags: ['FavoriteMovie'],
    }),
    rateMovie: build.mutation<
      void,
      { userId: string; movieId: string; userRating: number }
    >({
      query: (params) => ({
        url: '/user/rate-movie',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['MovieRating'],
    }),
    getMovieRating: build.query<
      { rating: number | null },
      { userId: string; movieId: string }
    >({
      query: (params) => ({
        url: '/user/rate-movie',
        params,
      }),
      providesTags: ['MovieRating'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useAddFavoriteMovieMutation,
  useAddUserMutation,
  useLazyCheckFavoriteMovieQuery,
  useLazyGetMovieRatingQuery,
  useRateMovieMutation,
  useRemoveFavoriteMovieMutation,
  useUpdateUserMutation,
} = extendedApiSlice;

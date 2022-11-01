import { Movie, MovieSearchParams } from '../../types/movie';
import { convertObjectToFormData } from '../../utils/data';
import { apiSlice } from '../api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], MovieSearchParams | void>({
      query: (movieSearchParams) => ({
        url: '/movies',
        params: movieSearchParams ?? undefined,
      }),
      providesTags: (movies) =>
        movies
          ? [
              ...movies.map(({ id }) => ({ type: 'Movie' as const, id })),
              { type: 'Movie', id: 'LIST' },
            ]
          : [{ type: 'Movie', id: 'LIST' }],
    }),
    getMovie: builder.query<Movie, string>({
      query: (movieId) => `/movie/${movieId}`,
      providesTags: (_result, _error, id) => [{ type: 'Movie', id }],
    }),
    addMovie: builder.mutation<
      Movie,
      { movie: Movie; poster: File | null; backdrop: File | null }
    >({
      query: ({ movie, poster, backdrop }) => {
        const data = convertObjectToFormData(movie);

        if (poster) {
          data.set('poster', poster);
        }

        if (backdrop) {
          data.set('backdrop', backdrop);
        }

        return {
          url: '/movie',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Movie', id: 'LIST' }],
    }),
    updateMovie: builder.mutation<
      Movie,
      { movie: Movie; poster: File | null; backdrop: File | null }
    >({
      query: ({ movie, poster, backdrop }) => {
        const data = convertObjectToFormData(movie);

        if (poster) {
          data.set('poster', poster);
        }

        if (backdrop) {
          data.set('backdrop', backdrop);
        }

        return {
          url: '/movie',
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (_result, _error, { movie: { id } }) => [
        { type: 'Movie', id: 'LIST' },
        { type: 'Movie', id },
      ],
    }),
    deleteMovie: builder.mutation<void, Movie>({
      query: (movie) => ({
        url: `/movie/${movie.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Movie', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useAddMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = extendedApiSlice;

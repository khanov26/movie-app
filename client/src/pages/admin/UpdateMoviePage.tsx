import React from 'react';
import useSnackbar from '../../hooks/snackbar';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Movie } from '../../types/movie';
import { Alert, Box, CircularProgress, Link, Typography } from '@mui/material';
import MovieForm from '../../components/admin/MovieForm';
import { FormType } from '../../types/form';
import {
  useGetMovieQuery,
  useUpdateMovieMutation,
} from '../../store/movies/moviesSlice';
import { parseRTKQueryError } from '../../utils/error';

const UpdateMoviePage: React.FC = () => {
  const { movieId } = useParams();
  const { data: movie, isLoading, error } = useGetMovieQuery(movieId!);

  const [update, { isLoading: isSaving }] = useUpdateMovieMutation();

  const { openSnackbar, snackbar } = useSnackbar();

  const updateMovie = async (
    movie: Movie,
    posterFile: File | null,
    backdropFile: File | null
  ) => {
    try {
      const updateData = {
        id: movieId,
        ...movie,
      };

      const updatedMovie = await update({
        movie: updateData,
        poster: posterFile,
        backdrop: backdropFile,
      }).unwrap();

      const message = (
        <Typography>
          Фильм{' '}
          <Link
            component={RouterLink}
            to={`/admin/movie/update/${updatedMovie.id}`}
          >
            {updatedMovie.title}
          </Link>{' '}
          успешно изменен
        </Typography>
      );
      openSnackbar(message);
    } catch (e) {
      openSnackbar('Не удалось изменить фильм');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {movie && (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Обновить фильм
          </Typography>

          <MovieForm
            isSaving={isSaving}
            onSave={updateMovie}
            movie={movie}
            formType={FormType.update}
          />

          {snackbar}
        </>
      )}

      {error && (
        <Alert severity="error">
          {parseRTKQueryError(error) as string}
        </Alert>
      )}

      {isLoading && (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default UpdateMoviePage;

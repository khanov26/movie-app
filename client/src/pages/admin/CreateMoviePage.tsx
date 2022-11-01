import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Movie } from '../../types/movie';
import useSnackbar from '../../hooks/snackbar';
import MovieForm from '../../components/admin/MovieForm';
import { FormType } from '../../types/form';
import { useAddMovieMutation } from '../../store/movies/moviesSlice';

const CreateMoviePage: React.FC = () => {
  const { openSnackbar, snackbar } = useSnackbar();
  const [addMovie, { isLoading: isSaving }] = useAddMovieMutation();

  const createMovie = async (
    movie: Movie,
    poster: File | null,
    backdrop: File | null
  ) => {
    try {
      const createdMovie = await addMovie({
        movie,
        poster,
        backdrop,
      }).unwrap();

      const message = (
        <Typography>
          Фильм{' '}
          <Link
            component={RouterLink}
            to={`/admin/movie/update/${createdMovie.id}`}
          >
            {createdMovie.title}
          </Link>{' '}
          успешно добавлен
        </Typography>
      );
      openSnackbar(message);
    } catch (e) {
      openSnackbar('Не удалось создать фильм');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Добавить фильм
      </Typography>
      <MovieForm
        isSaving={isSaving}
        onSave={createMovie}
        movie={{} as Movie}
        formType={FormType.create}
      />
      {snackbar}
    </Box>
  );
};

export default CreateMoviePage;

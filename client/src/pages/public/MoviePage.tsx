import React, { useEffect } from 'react';
import {
  Alert,
  Box,
  Breadcrumbs,
  Container,
  Link,
  Skeleton,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { documentDefaultTitle } from '../../appConfig';
import TapeLoader from '../../components/public/TapeLoader';
import MovieInfo from '../../components/public/MovieInfo';
import MovieCharacters from '../../components/public/MovieCharacters';
import { useGetCharactersQuery } from '../../store/characters/charactersSlice';
import { useGetMovieQuery } from '../../store/movies/moviesSlice';
import { parseRTKQueryError } from '../../utils/error';

const MoviePage: React.FC = () => {
  const { movieId } = useParams();

  const {
    data: movie,
    isLoading: isMovieLoading,
    isError: isMovieError,
    error: movieError,
  } = useGetMovieQuery(movieId!);

  const {
    data: characters = [],
    isLoading: isCharactersLoading,
    isError: isCharactersError,
    error: charactersError,
  } = useGetCharactersQuery({ movieId: movieId! });

  useEffect(() => {
    if (movie) {
      document.title = `${documentDefaultTitle} | ${movie.title}`;
    } else {
      document.title = documentDefaultTitle;
    }
  }, [movie]);

  useEffect(() => {
    window.scroll(0, 0);
  });

  let movieContent;
  if (isMovieLoading) {
    movieContent = (
      <Container>
        <Skeleton variant="rectangular" sx={{ height: 400 }} />
      </Container>
    );
  } else if (isMovieError) {
    movieContent = (
      <Alert severity="error">
        {parseRTKQueryError(movieError) as string}
      </Alert>
    );
  } else if (movie) {
    movieContent = <MovieInfo movie={movie} />;
  }

  let charactersContent;
  if (isCharactersLoading) {
    charactersContent = (
      <Container>
        <TapeLoader />
      </Container>
    );
  } else if (isCharactersError) {
    charactersContent = (
      <Alert severity="error">
        {parseRTKQueryError(charactersError) as string}
      </Alert>
    );
  } else if (characters.length > 0) {
    charactersContent = <MovieCharacters characters={characters} />;
  }

  return (
    <Box component="main">
      <Container>
        <Breadcrumbs aria-label="breadcrumb" sx={{ py: 2 }}>
          <Link component={RouterLink} underline="hover" color="inherit" to="/">
            Главная
          </Link>
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to="/movies"
          >
            Фильмы
          </Link>
          {movie && <Typography color="text.primary">{movie.title}</Typography>}
        </Breadcrumbs>
      </Container>

      {movieContent}
      {charactersContent}
    </Box>
  );
};

export default MoviePage;

import React from 'react';
import { Container, Typography } from '@mui/material';
import TapeLoader from './TapeLoader';
import MovieTape from './MovieTape';
import Section from './Section';
import { Movie } from '../../types/movie';

interface Props {
  sectionTitle: string;
  movies: Movie[];
  isLoading: boolean;
  error?: string;
}

const MovieTapeSection: React.FC<Props> = ({
  isLoading,
  error,
  movies,
  sectionTitle,
}) => {
  return (
    <Section>
      <Container>
        <Typography variant="h4">{sectionTitle}</Typography>

        {isLoading && <TapeLoader />}
        {error && <Typography variant="h5">Ошибка: {error}</Typography>}
        {movies.length > 0 && <MovieTape movies={movies} />}
      </Container>
    </Section>
  );
};

export default MovieTapeSection;

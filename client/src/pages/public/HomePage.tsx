import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { documentDefaultTitle } from '../../appConfig';
import SearchBanner from '../../components/public/SearchBanner';
import MovieTapeSection from '../../components/public/MovieTapeSection';
import { useGetMoviesQuery } from '../../store/movies/moviesSlice';
import { parseRTKQueryError } from '../../utils/error';

const topRatedMoviesParams = {
  orderField: 'rating',
  orderDir: 'desc',
};

const mostPopularMoviesParams = {
  orderField: 'rateNumber',
  orderDir: 'desc',
};

const HomePage: React.FC = () => {
  const {
    data: topRatedMovies = [],
    isLoading: isTopRatedMoviesLoading,
    error: topRatedMoviesError,
  } = useGetMoviesQuery(topRatedMoviesParams);

  const {
    data: mostPopularMovies = [],
    isLoading: isMostPopularMoviesLoading,
    error: mostPopularMoviesError,
  } = useGetMoviesQuery(mostPopularMoviesParams);

  useEffect(() => {
    document.title = documentDefaultTitle;
  }, []);

  return (
    <Box component="main">
      <SearchBanner />

      <MovieTapeSection
        sectionTitle="Фильмы с высоким рейтингом"
        movies={topRatedMovies}
        isLoading={isTopRatedMoviesLoading}
        error={
          topRatedMoviesError &&
          (parseRTKQueryError(topRatedMoviesError) as string)
        }
      />

      <MovieTapeSection
        sectionTitle="Популярные фильмы"
        movies={mostPopularMovies}
        isLoading={isMostPopularMoviesLoading}
        error={
          mostPopularMoviesError &&
          (parseRTKQueryError(mostPopularMoviesError) as string)
        }
      />
    </Box>
  );
};

export default HomePage;

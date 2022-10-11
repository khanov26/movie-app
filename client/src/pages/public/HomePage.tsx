import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { documentDefaultTitle } from '../../appConfig';
import SearchBanner from '../../components/public/SearchBanner';
import MovieTapeSection from '../../components/public/MovieTapeSection';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchTopRatedMovies } from '../../store/movies/topRatedMovies';
import { fetchMostPopularMovies } from '../../store/movies/mostPopularMovies';

const topRatedMoviesParams = {
  orderField: 'rating',
  orderDir: 'desc',
};

const mostPopularMoviesParams = {
  orderField: 'rateNumber',
  orderDir: 'desc',
};

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    items: topRatedMovies,
    isLoading: isTopRatedMoviesLoading,
    error: topRatedMoviesError,
  } = useAppSelector((state) => state.topRatedMovies);

  const {
    items: mostPopularMovies,
    isLoading: isMostPopularMoviesLoading,
    error: mostPopularMoviesError,
  } = useAppSelector((state) => state.mostPopularMovies);

  useEffect(() => {
    document.title = documentDefaultTitle;

    dispatch(fetchTopRatedMovies(topRatedMoviesParams));
    dispatch(fetchMostPopularMovies(mostPopularMoviesParams));
  }, [dispatch]);

  return (
    <Box component="main">
      <SearchBanner />

      <MovieTapeSection
        sectionTitle="Фильмы с высоким рейтингом"
        movies={topRatedMovies}
        isLoading={isTopRatedMoviesLoading}
        error={topRatedMoviesError}
      />

      <MovieTapeSection
        sectionTitle="Популярные фильмы"
        movies={mostPopularMovies}
        isLoading={isMostPopularMoviesLoading}
        error={mostPopularMoviesError}
      />
    </Box>
  );
};

export default HomePage;

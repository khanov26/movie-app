import React, {useEffect, useMemo} from 'react';
import {Box} from "@mui/material";
import {documentDefaultTitle} from "../../appConfig";
import SearchBanner from "../../components/public/SearchBanner";
import MovieTapeSection from "../../components/public/MovieTapeSection";
import useFetchMovies from "../../hooks/fetchMovies";

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
        movies: topRatedMovies,
        isLoading: isTopRatedMoviesLoading,
        error: topRatedMoviesError
    } = useFetchMovies(topRatedMoviesParams);

    const {
        movies: mostPopularMovies,
        isLoading: isMostPopularMoviesLoading,
        error: mostPopularMoviesError
    } = useFetchMovies(mostPopularMoviesParams);

    useEffect(() => {
        document.title = documentDefaultTitle;
    }, []);

    return (
        <Box component="main">
            <SearchBanner/>

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

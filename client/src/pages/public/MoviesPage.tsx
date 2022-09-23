import React, {useEffect, useState} from 'react';
import {Alert, Box, Breadcrumbs, CircularProgress, Container, Grid, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import MoviesGrid from "../../components/public/MoviesGrid";
import MovieFilters from "../../components/public/MovieFilters";
import useFetchMovies from "../../hooks/fetchMovies";
import {FilterValue, MovieSearchParams} from "../../types/movie";
import {documentDefaultTitle} from "../../appConfig";

const MoviesPage: React.FC = () => {
    const [searchParams, setSearchParams] = useState<MovieSearchParams>({});

    const handleSearchParamsUpdates = ({updateField, updateValue}: FilterValue) => {
        setSearchParams(searchParams => {
            const newSearchParams = {...searchParams};
            if (updateValue === null) {
                delete newSearchParams[updateField];
            } else {
                newSearchParams[updateField] = updateValue;
            }
            console.log(newSearchParams);
            return newSearchParams;
        });
    };

    const {movies, isLoading, error} = useFetchMovies(searchParams);

    let moviesContent;
    if (isLoading) {
        moviesContent = (
            <Box sx={{textAlign: 'center'}}>
                <CircularProgress/>
            </Box>
        );
    } else if (error) {
        moviesContent = (
            <Alert severity="error">{error}</Alert>
        );
    } else if (movies.length > 0) {
        moviesContent = (
            <MoviesGrid movies={movies}/>
        );
    } else {
        moviesContent = (
            <Alert severity="info">Ничего не найдено</Alert>
        );
    }

    useEffect(() => {
        document.title = `${documentDefaultTitle} | Фильмы`;
    }, []);

    return (
        <Box component="main">
            <Container>
                <Breadcrumbs aria-label="breadcrumb" sx={{py: 2}}>
                    <Link component={RouterLink} underline="hover" color="inherit" to="/">
                        Главная
                    </Link>
                    <Typography color="text.primary">
                        Фильмы
                    </Typography>
                </Breadcrumbs>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <MovieFilters searchParams={searchParams} onSearchParamsUpdates={handleSearchParamsUpdates}/>
                    </Grid>

                    <Grid item xs={9}>
                        {moviesContent}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default MoviesPage;

import React, {useEffect} from 'react';
import {Alert, Box, Breadcrumbs, Container, Link, Skeleton, Typography} from "@mui/material";
import {Link as RouterLink, useParams} from 'react-router-dom';
import {documentDefaultTitle} from "../../appConfig";
import TapeLoader from "../../components/public/TapeLoader";
import MovieInfo from "../../components/public/MovieInfo";
import MovieCharacters from "../../components/public/MovieCharacters";
import useFetchMovie from "../../hooks/fetchMovie";
import useFetchCharacters from "../../hooks/fetchCharacters";

const MoviePage: React.FC = () => {
    const {movieId} = useParams();

    const {movie, isLoading: isMovieLoading, error: movieError} = useFetchMovie(movieId!);
    const {characters, isLoading: isCharactersLoading, error: charactersError} = useFetchCharacters({movieId});

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
                <Skeleton variant="rectangular" sx={{height: 400}} />
            </Container>
        );
    } else if (movieError) {
        movieContent = (
            <Alert severity="error">{movieError}</Alert>
        );
    } else if (movie) {
        movieContent = (
            <MovieInfo movie={movie}/>
        );
    }

    let charactersContent;
    if (isCharactersLoading) {
        charactersContent = (
            <Container>
                <TapeLoader/>
            </Container>
        );
    } else if (charactersError) {
        charactersContent = (
            <Alert severity="error">{charactersError}</Alert>
        );
    } else if (characters.length > 0) {
        charactersContent = (
            <MovieCharacters characters={characters}/>
        );
    }

    return (
        <Box component="main">
            <Container>
                <Breadcrumbs aria-label="breadcrumb" sx={{py: 2}}>
                    <Link component={RouterLink} underline="hover" color="inherit" to="/">
                        Главная
                    </Link>
                    <Link component={RouterLink} underline="hover" color="inherit" to="/movies">
                        Фильмы
                    </Link>
                    {movie &&
                    <Typography color="text.primary">
                        {movie.title}
                    </Typography>
                    }
                </Breadcrumbs>
            </Container>

            {movieContent}
            {charactersContent}
        </Box>
    );
};

export default MoviePage;

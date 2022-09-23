import React from 'react';
import {Alert, Box, CircularProgress, IconButton, Typography} from "@mui/material";
import {Movie} from "../../types/movie";
import * as movieService from '../../services/movieService';
import MovieGrid from "../../components/admin/MovieGrid";
import {Link} from "react-router-dom";
import {Add} from "@mui/icons-material";
import useDialog from "../../hooks/dialog";
import useFetchMovies from "../../hooks/fetchMovies";
import useSnackbar from "../../hooks/snackbar";

const MoviesPage: React.FC = () => {
    const {movies, isLoading, error, forceFetch} = useFetchMovies();

    const handleMovieDelete = (movie: Movie) => {
        const message = `Удалить фильм "${movie.title}"?`;
        openDialog(message, async () => {
            try {
                await movieService.deleteById(movie.id!);
                await forceFetch();
                openSnackbar(`Фильм "${movie.title}" удален`);
            } catch (error) {
                if (typeof error === 'string') {
                    openSnackbar(error);
                } else if (error instanceof Error) {
                    openSnackbar(error.message);
                }
            }
        });
    };

    const {openDialog, dialog} = useDialog();
    const {openSnackbar, snackbar} = useSnackbar();

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
            <MovieGrid movies={movies} onDelete={handleMovieDelete} />
        );
    } else {
        moviesContent = (
            <Alert severity="info">Ничего не найдено</Alert>
        );
    }

    return (
        <Box sx={{p: 2}}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2,
            }}>
                <Typography variant="h4" sx={{mr: 1}}>Фильмы</Typography>

                <IconButton component={Link} to='/admin/movie/create' title='Добавить' sx={{
                    backgroundColor: theme => theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme => theme.palette.primary.dark,
                    }
                }}>
                    <Add sx={{
                        color: theme => theme.palette.primary.contrastText,
                    }}/>
                </IconButton>
            </Box>
            {moviesContent}
            {dialog}
            {snackbar}
        </Box>
    );
};

export default MoviesPage;

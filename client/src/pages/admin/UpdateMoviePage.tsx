import React, {useState} from 'react';
import useSnackbar from "../../hooks/snackbar";
import * as movieService from "../../services/movieService";
import {Link as RouterLink, useParams} from "react-router-dom";
import {Movie} from "../../types/movie";
import {Alert, Box, CircularProgress, Link, Typography} from "@mui/material";
import MovieForm from "../../components/admin/MovieForm";
import {FormType} from "../../types/form";
import useFetchMovie from "../../hooks/fetchMovie";

const UpdateMoviePage: React.FC = () => {
    const {movieId} = useParams();
    const {movie, isLoading, error} = useFetchMovie(movieId!);
    const {openSnackbar, snackbar} = useSnackbar();
    const [isSaving, setIsSaving] = useState(false);

    const updateMovie = async (movie: Movie, posterFile: File | null, backdropFile: File | null) => {
        setIsSaving(true);
        try {
            const updateData = {
                id: movieId,
                ...movie,
            }

            const updatedMovie: Movie = await movieService.update(updateData, posterFile, backdropFile);

            const message =
                <Typography>
                    Фильм{' '}
                    <Link component={RouterLink} to={`/admin/movie/update/${updatedMovie.id}`}>{updatedMovie.title}</Link>
                    {' '}успешно изменен
                </Typography>;
            openSnackbar(message);
        } catch (e) {
            openSnackbar('Не удалось изменить фильм');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Box sx={{p: 2}}>
            {movie &&
            <>
                <Typography variant="h4" sx={{mb: 2}}>Обновить фильм</Typography>

                <MovieForm isSaving={isSaving} onSave={updateMovie} movie={movie} formType={FormType.update}/>

                {snackbar}
            </>
            }

            {error && <Alert severity="error">{error}</Alert>}

            {isLoading &&
            <Box sx={{textAlign: 'center'}}>
                <CircularProgress/>
            </Box>
            }
        </Box>
    );
};

export default UpdateMoviePage;

import React, {useState} from 'react';
import {Box, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {Movie} from "../../types/movie";
import * as movieService from "../../services/movieService";
import useSnackbar from "../../hooks/snackbar";
import MovieForm from "../../components/admin/MovieForm";
import {FormType} from "../../types/form";

const CreateMoviePage: React.FC = () => {
    const {openSnackbar, snackbar} = useSnackbar();
    const [isSaving, setIsSaving] = useState(false);

    const createMovie = async (movie: Movie, posterFile: File | null, backdropFile: File | null) => {
        setIsSaving(true);
        try {
            const createdMovie: Movie = await movieService.create(movie, posterFile, backdropFile);

            const message =
                <Typography>
                    Фильм{' '}
                    <Link component={RouterLink} to={`/admin/movie/update/${createdMovie.id}`}>
                        {createdMovie.title}
                    </Link>
                    {' '}успешно добавлен
                </Typography>;
            openSnackbar(message);
        } catch (e) {
            openSnackbar('Не удалось создать фильм');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Box sx={{p: 2}}>
            <Typography variant="h4" sx={{mb: 2}}>Добавить фильм</Typography>
            <MovieForm isSaving={isSaving} onSave={createMovie} movie={{} as Movie} formType={FormType.create} />
            {snackbar}
        </Box>
    );
};

export default CreateMoviePage;
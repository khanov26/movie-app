import React from 'react';
import {Actor} from "../../types/actor";
import * as actorService from "../../services/actorService";
import useDialog from "../../hooks/dialog";
import {Alert, Box, CircularProgress, IconButton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Add} from "@mui/icons-material";
import ActorsGrid from "../../components/admin/ActorsGrid";
import useFetchActors from "../../hooks/fetchActors";
import useSnackbar from "../../hooks/snackbar";

const ActorsPage: React.FC = () => {
    const {actors, isLoading, error, forceFetch} = useFetchActors();

    const handleActorDelete = (actor: Actor) => {
        const message = `Удалить актера "${actor.name}"?`;
        openDialog(message, async () => {
            try {
                await actorService.deleteById(actor.id!);
                await forceFetch();
                openSnackbar(`Актер "${actor.name}" удален`);
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

    let actorsContent;
    if (isLoading) {
        actorsContent = (
            <Box sx={{textAlign: 'center'}}>
                <CircularProgress/>
            </Box>
        );
    } else if (error) {
        actorsContent = (
            <Alert severity="error">{error}</Alert>
        );
    } else if (actors.length > 0) {
        actorsContent = (
            <ActorsGrid actors={actors} onDelete={handleActorDelete} />
        );
    } else {
        actorsContent = (
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
                <Typography variant="h4" sx={{mr: 1}}>Актеры</Typography>

                <IconButton component={Link} to='/admin/actor/create' title='Добавить' sx={{
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
            {actorsContent}
            {dialog}
            {snackbar}
        </Box>
    );
};

export default ActorsPage;

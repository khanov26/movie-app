import React from 'react';
import { Actor } from '../../types/actor';
import useDialog from '../../hooks/dialog';
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import ActorsGrid from '../../components/admin/ActorsGrid';
import useSnackbar from '../../hooks/snackbar';
import {
  useDeleteActorMutation,
  useGetActorsQuery,
} from '../../store/actors/actorsSlice';
import { parseRTKQueryError } from '../../utils/error';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const ActorsPage: React.FC = () => {
  const {
    data: actors = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetActorsQuery();

  const [deleteActor] = useDeleteActorMutation();

  const handleActorDelete = (actor: Actor) => {
    const message = `Удалить актера "${actor.name}"?`;
    openDialog(message, async () => {
      try {
        await deleteActor(actor).unwrap();
        openSnackbar(`Актер "${actor.name}" удален`);
      } catch (error) {
        if (error) {
          const errorText = parseRTKQueryError(
            error as FetchBaseQueryError | SerializedError
          ) as string;
          openSnackbar(errorText);
        }
      }
    });
  };

  const { openDialog, dialog } = useDialog();
  const { openSnackbar, snackbar } = useSnackbar();

  let actorsContent;
  if (isLoading) {
    actorsContent = (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else if (isError) {
    actorsContent = (
      <Alert severity="error">
        {parseRTKQueryError(error) as string}
      </Alert>
    );
  } else if (actors.length > 0) {
    actorsContent = (
      <ActorsGrid
        actors={actors}
        onDelete={handleActorDelete}
        disabled={isFetching}
      />
    );
  } else {
    actorsContent = <Alert severity="info">Ничего не найдено</Alert>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ mr: 1 }}>
          Актеры
        </Typography>

        <IconButton
          component={Link}
          to="/admin/actor/create"
          title="Добавить"
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
          }}
        >
          <Add
            sx={{
              color: (theme) => theme.palette.primary.contrastText,
            }}
          />
        </IconButton>
      </Box>
      {actorsContent}
      {dialog}
      {snackbar}
    </Box>
  );
};

export default ActorsPage;

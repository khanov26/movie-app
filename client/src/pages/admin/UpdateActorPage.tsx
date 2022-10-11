import React, { useEffect, useState } from 'react';
import useSnackbar from '../../hooks/snackbar';
import { Actor } from '../../types/actor';
import * as actorService from '../../services/actorService';
import { Alert, Box, CircularProgress, Link, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import ActorForm from '../../components/admin/ActorForm';
import { FormType } from '../../types/form';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchActor } from '../../store/actor';

const UpdateActorPage: React.FC = () => {
  const { actorId } = useParams();
  const {
    entity: actor,
    isLoading,
    error,
  } = useAppSelector((state) => state.actor);
  const { openSnackbar, snackbar } = useSnackbar();
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActor(actorId!));
  }, [actorId, dispatch]);

  const updateActor = async (actor: Actor, profileFile: File | null) => {
    setIsSaving(true);
    try {
      const updateData = {
        id: actorId,
        ...actor,
      };

      const updatedActor: Actor = await actorService.update(
        updateData,
        profileFile
      );

      const message = (
        <Typography>
          Актер{' '}
          <Link
            component={RouterLink}
            to={`/admin/actor/update/${updatedActor.id}`}
          >
            {updatedActor.name}
          </Link>{' '}
          успешно изменен
        </Typography>
      );
      openSnackbar(message);
    } catch (e) {
      openSnackbar('Не удалось обновить актера');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {isLoading && (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {actor && (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Обновить актера
          </Typography>
          <ActorForm
            isSaving={isSaving}
            onSave={updateActor}
            actor={actor}
            formType={FormType.update}
          />
          {snackbar}
        </>
      )}
    </Box>
  );
};

export default UpdateActorPage;

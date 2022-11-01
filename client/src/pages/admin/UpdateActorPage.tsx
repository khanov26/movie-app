import React from 'react';
import useSnackbar from '../../hooks/snackbar';
import { Actor } from '../../types/actor';
import { Alert, Box, CircularProgress, Link, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import ActorForm from '../../components/admin/ActorForm';
import { FormType } from '../../types/form';
import {
  useGetActorQuery,
  useUpdateActorMutation,
} from '../../store/actors/actorsSlice';
import { parseRTKQueryError } from '../../utils/error';

const UpdateActorPage: React.FC = () => {
  const { actorId } = useParams();
  const { data: actor, isLoading, error } = useGetActorQuery(actorId!);
  const [update, { isLoading: isSaving }] = useUpdateActorMutation();
  const { openSnackbar, snackbar } = useSnackbar();

  const updateActor = async (actor: Actor, profileFile: File | null) => {
    try {
      const updateData = {
        id: actorId,
        ...actor,
      };

      const updatedActor = await update({
        actor: updateData,
        profile: profileFile,
      }).unwrap();

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
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {isLoading && (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error">
          {parseRTKQueryError(error) as string}
        </Alert>
      )}

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

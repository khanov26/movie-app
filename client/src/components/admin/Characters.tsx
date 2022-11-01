import React, { useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  Typography,
} from '@mui/material';
import { Character } from '../../types/character';
import { Add, Close } from '@mui/icons-material';
import AddCharacterDialog from './AddCharacterDialog';
import {
  useAddCharacterMutation,
  useDeleteCharacterMutation,
  useGetCharactersQuery,
} from '../../store/characters/charactersSlice';
import { parseRTKQueryError } from '../../utils/error';

interface Props {
  movieId: string;
}

const Characters: React.FC<Props> = ({ movieId }) => {
  const {
    data: characters = [],
    isLoading,
    isError,
    error,
  } = useGetCharactersQuery({ movieId });

  const [addCharacter, {isLoading: isSaving}] = useAddCharacterMutation();
  const [deleteCharacter] = useDeleteCharacterMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleCharacterDeleteClick = (characterToDelete: Character) => () => {
    deleteCharacter(characterToDelete);
  };

  let charactersContent;
  if (isLoading) {
    charactersContent = (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else if (isError) {
    charactersContent = (
      <Alert severity="error">
        {parseRTKQueryError(error) as string}
      </Alert>
    );
  } else if (characters.length > 0) {
    charactersContent = (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 30px',
          gap: 1,
        }}
      >
        {characters.map((character) => (
          <React.Fragment key={character.id}>
            <Typography variant="body2" color="text.secondary">
              {character.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {character.actor.name}
            </Typography>
            <IconButton
              size="small"
              title="Удалить"
              sx={{ ml: 'auto' }}
              onClick={handleCharacterDeleteClick(character)}
            >
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        ))}
      </Box>
    );
  } else {
    charactersContent = (
      <Typography variant="body2" color="text.secondary">
        Роли не добавлены
      </Typography>
    );
  }

  return (
    <>
      <FormControl
        variant="outlined"
        sx={{
          p: 1,
        }}
      >
        <Box
          component="fieldset"
          sx={{
            border: (theme) => `1px solid ${theme.palette.grey.A400}`,
            borderRadius: 1,
            position: 'absolute',
            top: -12,
            bottom: 0,
            left: 0,
            right: 0,
            px: 1,
            py: 0,
            m: 0,
            zIndex: -1,
          }}
        >
          <Box component="legend" sx={{ visibility: 'hidden' }}>
            Роли
          </Box>
        </Box>
        <InputLabel shrink>Роли</InputLabel>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <IconButton title="Добавить" onClick={handleClickOpenDialog}>
            <Add />
          </IconButton>
        </Box>

        {charactersContent}
      </FormControl>

      <AddCharacterDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        isSaving={isSaving}
        onSave={addCharacter}
        movieId={movieId}
      />
    </>
  );
};

export default Characters;

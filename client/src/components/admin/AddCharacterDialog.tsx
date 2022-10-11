import React, { useMemo, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  debounce,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import useInput from '../../hooks/input';
import { Close } from '@mui/icons-material';
import { Actor } from '../../types/actor';
import * as actorService from '../../services/actorService';
import { Character } from '../../types/character';
import { Movie } from '../../types/movie';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (character: Character) => void;
  isSaving: boolean;
  movieId: string;
}

const AddCharacterDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  isSaving,
  onSave,
  movieId,
}) => {
  const characterName = useInput('');
  const [actorName, setActorName] = useState('');
  const [actor, setActor] = useState<Actor | null>(null);
  const [options, setOptions] = useState<Actor[]>([]);

  const validateField = () => {
    return [characterName.value, actor].every(
      (value) => value !== '' && value !== null
    );
  };

  const canSave = !isSaving && validateField();

  const handleSubmit = async () => {
    if (!validateField()) {
      return;
    }

    const character: Character = {
      name: characterName.value,
      actor: actor!,
      movie: { id: movieId } as Movie,
    };
    await onSave(character);
    resetFields();
  };

  const resetFields = () => {
    characterName.reset();
    setActorName('');
    setActor(null);
  };

  const searchActors = useMemo(
    () =>
      debounce(async (value: string) => {
        const actors = await actorService.getAll(value);
        setOptions(actors);
      }, 300),
    []
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          width: '90%',
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">Новая роль</DialogTitle>
      <DialogContent sx={{ overflowY: 'visible' }}>
        <Box component="form">
          <TextField
            required
            fullWidth
            label="Имя героя"
            value={characterName.value}
            onChange={characterName.onChange}
            disabled={isSaving}
          />

          <Autocomplete
            fullWidth
            sx={{ my: 2 }}
            filterOptions={(x) => x}
            options={options}
            getOptionLabel={(option: Actor) => {
              return option.name;
            }}
            value={actor}
            onChange={(event, value, reason) => {
              setActor(value);
            }}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            inputValue={actorName}
            onInputChange={(event, value, reason) => {
              setActorName(value);
              if (!value || reason === 'reset') {
                return;
              }
              searchActors(value);
            }}
            renderInput={(params) => (
              <TextField required {...params} label="Актер" />
            )}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={!canSave}
            onClick={handleSubmit}
          >
            {isSaving && (
              <CircularProgress color="inherit" size={20} sx={{ mr: 1 }} />
            )}
            Добавить
          </Button>
        </Box>
      </DialogContent>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
        }}
      >
        <Close />
      </IconButton>
    </Dialog>
  );
};

export default AddCharacterDialog;

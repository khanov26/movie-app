import React, { useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import useInput from '../../hooks/input';
import { Close } from '@mui/icons-material';
import { Actor } from '../../types/actor';
import { Character } from '../../types/character';
import { Movie } from '../../types/movie';
import { useSearchActorsQuery } from '../../store/actors/actorsSlice';
import useDebounce from '../../hooks/debounce';

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

  const [searchingActorName, setSearchingActorName] = useState('');
  const actorNameDebounced = useDebounce(searchingActorName, 300);

  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  
  const { data: options = [] } = useSearchActorsQuery(actorNameDebounced, {
    skip: !actorNameDebounced || actorNameDebounced === selectedActor?.name,
  });

  const validateField = () => {
    return [characterName.value, selectedActor].every(
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
      actor: selectedActor!,
      movie: { id: movieId } as Movie,
    };
    await onSave(character);
    resetFields();
  };

  const resetFields = () => {
    characterName.reset();
    setSearchingActorName('');
    setSelectedActor(null);
  };

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
            value={selectedActor}
            onChange={(event, value, reason) => {
              setSelectedActor(value);
            }}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            inputValue={searchingActorName}
            onInputChange={(event, value, reason) => {
              setSearchingActorName(value);
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

import React, { ChangeEvent, MouseEvent, useState } from 'react';
import useInput from '../../hooks/input';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import ImageUploader from './ImageUploader';
import { Actor } from '../../types/actor';
import { Gender } from '../../types/gender';
import { FormType } from '../../types/form';

interface Props {
  actor: Actor;
  isSaving: boolean;
  onSave: (actor: Actor, profileFile: File | null) => void;
  formType: FormType;
}

const ActorForm: React.FC<Props> = ({ actor, isSaving, onSave, formType }) => {
  const name = useInput(actor.name || '');
  const biography = useInput(actor.biography || '');
  const gender = useInput(String(actor.gender ?? ''));
  const birthday = useInput(actor.birthday || '');
  const deathday = useInput(actor.deathday || '');

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState(actor.profile);

  const handleProfileUpload = (file: File) => {
    setProfilePreview(URL.createObjectURL(file));
    setProfileFile(file);
  };

  const resetFields = () => {
    name.reset();
    biography.reset();
    gender.reset();
    birthday.reset();
    deathday.reset();

    setProfileFile(null);
    setProfilePreview('');
  };

  const validateFields = () => {
    return [name.value, gender.value, birthday.value, profilePreview].every(
      (value) => value !== '' && value !== undefined
    );
  };

  const canSave = !isSaving && validateFields();

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    const actor: Actor = {
      name: name.value,
      biography: biography.value,
      gender: Number(gender.value) as Gender,
      birthday: birthday.value,
      deathday: deathday.value,
    };
    await onSave(actor, profileFile);
    if (formType === FormType.create) {
      resetFields();
    }
  };

  return (
    <Grid
      container
      spacing={2}
      component="form"
      sx={{
        '& .MuiFormControl-root': {
          width: '100%',
        },
        '& .MuiFormControl-root + .MuiFormControl-root': {
          mt: 2,
        },
      }}
    >
      <Grid item sm={6} container spacing={2}>
        <Grid item xs={4}>
          <ImageUploader
            title="Профиль"
            imageRatio="2 / 3"
            imagePreview={profilePreview}
            onUpload={handleProfileUpload}
            isDisabled={isSaving}
          />
        </Grid>
      </Grid>

      <Grid item sm={6}>
        <TextField
          required
          label="Имя"
          value={name.value}
          onChange={name.onChange}
          disabled={isSaving}
        />

        <TextField
          multiline
          rows={5}
          label="Биография"
          value={biography.value}
          onChange={biography.onChange}
          disabled={isSaving}
        />

        <FormControl variant="outlined" required>
          <InputLabel>Пол</InputLabel>
          <Select
            label="Пол"
            value={gender.value}
            onChange={(e) =>
              gender.onChange(e as ChangeEvent<HTMLInputElement>)
            }
          >
            <MenuItem value={Gender.female}>Женский</MenuItem>
            <MenuItem value={Gender.male}>Мужской</MenuItem>
          </Select>
        </FormControl>

        <TextField
          required
          type="date"
          label="День рождения"
          value={birthday.value}
          onChange={birthday.onChange}
          disabled={isSaving}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          type="date"
          label="Дата смерти"
          value={deathday.value}
          onChange={deathday.onChange}
          disabled={isSaving}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          variant="contained"
          size="large"
          sx={{ mt: 2, width: '100%' }}
          disabled={!canSave}
          onClick={handleSubmit}
        >
          {isSaving && (
            <CircularProgress color="inherit" size={20} sx={{ mr: 1 }} />
          )}
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActorForm;

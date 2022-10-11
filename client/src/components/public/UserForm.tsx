import React, { MouseEvent, useState } from 'react';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import ImageUploader from '../admin/ImageUploader';
import { User } from '../../types/user';
import useInput from '../../hooks/input';

interface Props {
  user: User;
  isSaving: boolean;
  onSave: (user: User, profileFile: File | null) => void;
}

const UserForm: React.FC<Props> = ({ user, isSaving, onSave }) => {
  const name = useInput(user.name || '');

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState(user.profile);

  const handleProfileUpload = (file: File) => {
    setProfilePreview(URL.createObjectURL(file));
    setProfileFile(file);
  };

  const validateFields = () => {
    return name.value !== '';
  };

  const canSave = !isSaving && validateFields();

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    const data: User = {
      name: name.value,
      email: user.email,
    };
    await onSave(data, profileFile);
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
            imageRatio="1"
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
        <TextField required label="Email" value={user.email} disabled />

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

export default UserForm;

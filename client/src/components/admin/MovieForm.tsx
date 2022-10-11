import React, { MouseEvent, useState } from 'react';
import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import ImageUploader from './ImageUploader';
import Genres from './Genres';
import useInput from '../../hooks/input';
import { formatDate } from '../../utils/date';
import { Movie } from '../../types/movie';
import { FormType } from '../../types/form';
import Characters from './Characters';

interface Props {
  movie: Movie;
  isSaving: boolean;
  onSave: (
    movie: Movie,
    posterFile: File | null,
    backdropFile: File | null
  ) => void;
  formType: FormType;
}

const MovieForm: React.FC<Props> = ({ movie, isSaving, onSave, formType }) => {
  const title = useInput(movie.title || '');
  const overview = useInput(movie.overview || '');
  const runtime = useInput(String(movie.runtime || ''));
  const releaseDate = useInput(() =>
    formatDate(movie.releaseDate || Date.now())
  );
  const [genres, setGenres] = useState<string[]>(movie.genres || []);

  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState(movie.poster);
  const [backdropFile, setBackdropFile] = useState<File | null>(null);
  const [backdropPreview, setBackdropPreview] = useState(movie.backdrop);

  const handlePosterUpload = (file: File) => {
    setPosterPreview(URL.createObjectURL(file));
    setPosterFile(file);
  };

  const handleBackdropUpload = (file: File) => {
    setBackdropPreview(URL.createObjectURL(file));
    setBackdropFile(file);
  };

  const resetFields = () => {
    title.reset();
    overview.reset();
    releaseDate.reset();
    runtime.reset();
    setGenres([]);
    setPosterFile(null);
    setBackdropFile(null);
    setPosterPreview('');
    setBackdropPreview('');
  };

  const validateFields = () => {
    return [
      title.value,
      overview.value,
      releaseDate.value,
      runtime.value,
      genres,
      posterPreview,
    ].every((value) => {
      if (Array.isArray(value) && value.length > 0) {
        return true;
      } else if (value) {
        return true;
      }
      return false;
    });
  };

  const canSave = !isSaving && validateFields();

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    const movie: Movie = {
      title: title.value,
      overview: overview.value,
      runtime: Number(runtime.value),
      genres: genres,
      releaseDate: Date.parse(releaseDate.value),
    };
    await onSave(movie, posterFile, backdropFile);
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
            title="Постер"
            imageRatio="2 / 3"
            imagePreview={posterPreview}
            onUpload={handlePosterUpload}
            isDisabled={isSaving}
          />
        </Grid>
        <Grid item xs={8}>
          <ImageUploader
            title="Фон"
            imageRatio="12 / 5"
            imagePreview={backdropPreview}
            onUpload={handleBackdropUpload}
            isDisabled={isSaving}
          />
        </Grid>
      </Grid>

      <Grid item sm={6}>
        <TextField
          required
          label="Название"
          value={title.value}
          onChange={title.onChange}
          disabled={isSaving}
        />

        <TextField
          required
          multiline
          rows={5}
          label="Описание"
          value={overview.value}
          onChange={overview.onChange}
          disabled={isSaving}
        />

        <TextField
          required
          type="date"
          label="Дата выхода"
          value={releaseDate.value}
          onChange={releaseDate.onChange}
          disabled={isSaving}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          required
          label="Продолжительность (в минутах)"
          value={runtime.value}
          onChange={runtime.onChange}
          disabled={isSaving}
          sx={{ mb: 2 }}
        />

        <Genres
          selectedGenres={genres}
          onChange={setGenres}
          isDisabled={isSaving}
        />

        <Box sx={{ mb: 2 }} />

        {formType === FormType.update && <Characters movieId={movie.id!} />}

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

export default MovieForm;

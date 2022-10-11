import React, { useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchGenres } from '../../store/genres';

interface Props {
  selectedGenres: string[];
  onChange: (genres: string[]) => void;
  isDisabled?: boolean;
}

const Genres: React.FC<Props> = ({
  selectedGenres,
  onChange,
  isDisabled = false,
}) => {
  const genres = useAppSelector((state) => state.genres.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <Autocomplete
      multiple
      freeSolo
      options={genres}
      value={selectedGenres}
      onChange={(event, value) => {
        onChange(value.map((genre) => genre.trim()));
      }}
      disabled={isDisabled}
      renderInput={(params) => (
        <TextField {...params} label="Жанры *" placeholder="Жанры" />
      )}
    />
  );
};

export default Genres;

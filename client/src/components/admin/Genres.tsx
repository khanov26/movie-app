import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useGetGenresQuery } from '../../store/genres/genresSlice';

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
  const { data: genres = [] } = useGetGenresQuery();

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

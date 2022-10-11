import React, { FormEvent } from 'react';
import { Box, Button, InputBase } from '@mui/material';
import useInput from '../../hooks/input';

interface Props {
  queryInitialValue?: string;
  onSubmit: (queryValue: string) => void;
}

const SearchForm: React.FC<Props> = ({ queryInitialValue, onSubmit }) => {
  const query = useInput(queryInitialValue || '');

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = query.value.trim();
    if (value) {
      onSubmit(value);
    }
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit} sx={{ display: 'flex' }}>
      <InputBase
        value={query.value}
        onChange={query.onChange}
        placeholder="Найти фильм, сериал, актера"
        sx={{
          backgroundColor: 'white',
          px: 2,
          py: 1,
          border: '1px solid gray',
          borderRadius: '4px',
          width: '100%',
          mr: 1,
        }}
      />
      <Button type="submit" variant="contained">
        Поиск
      </Button>
    </Box>
  );
};

export default SearchForm;

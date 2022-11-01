import React, { ChangeEvent, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { FilterValue, MovieSearchParams } from '../../types/movie';
import { getRuntimeLabel } from '../../utils/date';
import { useGetGenresQuery } from '../../store/genres/genresSlice';

interface Props {
  searchParams: MovieSearchParams;
  onSearchParamsUpdate: (filterValue: FilterValue) => void;
}

const MovieFilters: React.FC<Props> = ({
  searchParams,
  onSearchParamsUpdate,
}) => {
  const { data: allGenres = [] } = useGetGenresQuery();

  const selectedGenres = (searchParams.genres as string[]) || [];
  const handleGenreClick = (genre: string) => () => {
    let newGenres;
    if (selectedGenres.includes(genre)) {
      newGenres = selectedGenres.filter(
        (selectedGenre) => selectedGenre !== genre
      );
    } else {
      newGenres = [...selectedGenres, genre];
    }
    onSearchParamsUpdate({
      updateField: 'genres',
      updateValue: newGenres.length > 0 ? newGenres : null,
    });
  };

  const [rating, setRating] = useState(() => {
    const maxRating = (searchParams.maxRating as number) || 10;
    const minRating = (searchParams.minRating as number) || 0;

    return [minRating, maxRating];
  });
  const isRatingFilterActive = rating[0] !== 0 || rating[1] !== 10;

  const handleRatingChangeCommitted = (
    event: React.SyntheticEvent | Event,
    value: number | number[]
  ) => {
    const [minRating, maxRating] = value as number[];
    onSearchParamsUpdate({
      updateField: 'minRating',
      updateValue: minRating > 0 ? minRating : null,
    });
    onSearchParamsUpdate({
      updateField: 'maxRating',
      updateValue: maxRating < 10 ? maxRating : null,
    });
    onSearchParamsUpdate({ updateField: 'orderField', updateValue: 'rating' });
  };

  const [runtime, setRuntime] = useState(() => {
    const minRuntime = (searchParams.minRuntime as number) || 0;
    const maxRuntime = (searchParams.maxRuntime as number) || 360;

    return [minRuntime, maxRuntime];
  });
  const isRuntimeFilterActive = runtime[0] !== 0 || runtime[1] !== 360;

  const handleRuntimeChangeCommitted = (
    event: React.SyntheticEvent | Event,
    value: number | number[]
  ) => {
    let [minRuntime, maxRuntime] = value as number[];
    onSearchParamsUpdate({
      updateField: 'minRuntime',
      updateValue: minRuntime > 0 ? minRuntime : null,
    });
    onSearchParamsUpdate({
      updateField: 'maxRuntime',
      updateValue: maxRuntime < 360 ? maxRuntime : null,
    });
    onSearchParamsUpdate({
      updateField: 'orderField',
      updateValue: 'runtime',
    });
  };
  
  const [minReleaseYear, setMinReleaseYear] = useState(() => {
    const minReleaseDate = (searchParams.minReleaseDate as number) || 0;

    return minReleaseDate ? new Date(minReleaseDate).getFullYear() : '';
  });

  const [maxReleaseYear, setMaxReleaseYear] = useState(() => {
    const maxReleaseDate = (searchParams.maxReleaseDate as number) || 0;

    return maxReleaseDate ? new Date(maxReleaseDate).getFullYear() : '';
  });
  const isReleaseFilterActive = minReleaseYear !== '' || maxReleaseYear !== '';

  const handleMinReleaseYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setMinReleaseYear(newValue);
    updateReleaseDate('minReleaseDate', newValue);
  };

  const handleMaxReleaseYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setMaxReleaseYear(event.target.value);
    updateReleaseDate('maxReleaseDate', newValue);
  };

  const updateReleaseDate = (field: string, year: string) => {
    if (year === '' || /\d{4}/.test(year)) {
      const timestamp = year ? new Date(`${year}-01-01`).getTime() : null;
      onSearchParamsUpdate({ updateField: field, updateValue: timestamp });
      onSearchParamsUpdate({
        updateField: 'orderField',
        updateValue: 'releaseDate',
      });
    }
  };

  const orderField = (searchParams.orderField as string) || '';
  const handleOrderFieldChange = (event: SelectChangeEvent) => {
    onSearchParamsUpdate({
      updateField: 'orderField',
      updateValue: event.target.value,
    });
  };

  const orderDir = (searchParams.orderDir as string) || '';
  const handleOrderDirChange = (event: SelectChangeEvent) => {
    onSearchParamsUpdate({
      updateField: 'orderDir',
      updateValue: event.target.value,
    });
  };

  const orderFieldOptions = [
    {
      name: 'Популярности',
      value: 'rateNumber',
      disabled: [
        isReleaseFilterActive,
        isRuntimeFilterActive,
        isRatingFilterActive,
      ].includes(true),
    },
    {
      name: 'Рейтингу',
      value: 'rating',
      disabled: [isReleaseFilterActive, isRuntimeFilterActive].includes(true),
    },
    {
      name: 'Названию',
      value: 'title',
      disabled: [
        isReleaseFilterActive,
        isRuntimeFilterActive,
        isRatingFilterActive,
      ].includes(true),
    },
    {
      name: 'Продолжительности',
      value: 'runtime',
      disabled: [isReleaseFilterActive, isRatingFilterActive].includes(true),
    },
    {
      name: 'Дате выпуска',
      value: 'releaseDate',
      disabled: [isRuntimeFilterActive, isRatingFilterActive].includes(true),
    },
  ];

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle2">Фильтры</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth>
            <FormLabel>Пользовательский рейтинг</FormLabel>
            <Slider
              value={rating}
              onChange={(_, value) => setRating(value as number[])}
              onChangeCommitted={handleRatingChangeCommitted}
              min={0}
              max={10}
              step={1}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: 0 },
                { value: 10, label: 10 },
              ]}
              disabled={[isRuntimeFilterActive, isReleaseFilterActive].includes(
                true
              )}
              sx={{ mt: 1 }}
            />
          </FormControl>

          <Divider sx={{ my: 2 }} />

          <FormControl fullWidth>
            <FormLabel>Продолжительность</FormLabel>
            <Slider
              value={runtime}
              onChange={(_, value) => setRuntime(value as number[])}
              onChangeCommitted={handleRuntimeChangeCommitted}
              min={0}
              max={360}
              step={10}
              valueLabelDisplay="auto"
              marks={[
                { value: 0, label: 0 },
                { value: 360, label: getRuntimeLabel(360) },
              ]}
              valueLabelFormat={(value) => (
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    minWidth: 75,
                    textAlign: 'center',
                  }}
                >
                  {value > 0 ? getRuntimeLabel(value) : 0}
                </Typography>
              )}
              disabled={[isRatingFilterActive, isReleaseFilterActive].includes(
                true
              )}
              sx={{ mt: 1 }}
            />
          </FormControl>

          <Divider sx={{ my: 2 }} />

          <FormControl fullWidth>
            <FormLabel>Год выпуска</FormLabel>
            <TextField
              label="от"
              value={minReleaseYear}
              onChange={handleMinReleaseYearChange}
              disabled={[isRuntimeFilterActive, isRatingFilterActive].includes(
                true
              )}
              sx={{ mt: 1 }}
            />
            <TextField
              label="до"
              value={maxReleaseYear}
              onChange={handleMaxReleaseYearChange}
              disabled={[isRuntimeFilterActive, isRatingFilterActive].includes(
                true
              )}
              sx={{ mt: 1 }}
            />
          </FormControl>

          <Divider sx={{ my: 2 }} />

          <FormControl>
            <FormLabel>Жанры</FormLabel>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mt: 1,
              }}
            >
              {allGenres.map((genre) => {
                return (
                  <Chip
                    key={genre}
                    label={genre}
                    color={
                      selectedGenres.includes(genre) ? 'primary' : 'default'
                    }
                    onClick={handleGenreClick(genre)}
                    sx={{ cursor: 'pointer' }}
                  />
                );
              })}
            </Box>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle2">Сортировка</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth>
            <InputLabel>Сортировать результаты по</InputLabel>
            <Select
              label="Сортировать результаты по"
              value={orderField}
              onChange={handleOrderFieldChange}
            >
              {orderFieldOptions.map(({ name, value, disabled }) => (
                <MenuItem key={value} value={value} disabled={disabled}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Порядок сортировки</InputLabel>
            <Select
              label="Порядок сортировки"
              value={orderDir}
              onChange={handleOrderDirChange}
            >
              <MenuItem value="asc">по возрастанию</MenuItem>
              <MenuItem value="desc">по убыванию</MenuItem>
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default MovieFilters;

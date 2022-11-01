import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Popover,
  Rating as MuiRating,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import Rating from './Rating';
import { Favorite, Grade } from '@mui/icons-material';
import Section from './Section';
import { Movie } from '../../types/movie';
import { red, yellow } from '@mui/material/colors';
import { ratingDeclension } from '../../utils/wordDeclension';
import { getRuntimeLabel } from '../../utils/date';
import { useAppSelector } from '../../hooks/store';
import {
  useAddFavoriteMovieMutation,
  useLazyGetMovieRatingQuery,
  useLazyCheckFavoriteMovieQuery,
  useRemoveFavoriteMovieMutation,
  useRateMovieMutation,
} from '../../store/user/userSlice';

interface Props {
  movie: Movie;
}

const MovieInfo: React.FC<Props> = ({ movie }) => {
  const user = useAppSelector((state) => state.auth);

  const [checkFavoriteMovie, { data: { isFavorite = false } = {} }] =
    useLazyCheckFavoriteMovieQuery();

  const [addFavoriteMovie] = useAddFavoriteMovieMutation();
  const [removeFavoriteMovie] = useRemoveFavoriteMovieMutation();

  let favoriteButtonText;
  if (user) {
    if (isFavorite) {
      favoriteButtonText = 'Удалить этот фильм из списка избранных';
    } else {
      favoriteButtonText = 'Добавить этот фильм в список избранных';
    }
  } else {
    favoriteButtonText =
      'Войдите для добавления этого фильма в список избранных';
  }

  const handleFavoriteClick = () => {
    if (!user) {
      return;
    }
    if (isFavorite) {
      removeFavoriteMovie({ userId: user.id, movieId: movie.id! });
    } else {
      addFavoriteMovie({ userId: user.id, movieId: movie.id! });
    }
  };

  const [getMovieRating, { data: { rating: userRating = null } = {} }] =
    useLazyGetMovieRatingQuery();

  const [rateMovie] = useRateMovieMutation();

  let rateButtonText;
  if (!user) {
    rateButtonText = 'Войдите для для оценки этого фильма';
  } else {
    rateButtonText = 'Оценить фильм';
  }

  const [rateAnchorEl, setRateAnchorEl] = useState<HTMLElement | null>(null);
  const [rateHover, setRateHover] = useState(-1);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (user) {
      setRateAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setRateAnchorEl(null);
  };

  const handleRatingChange = (
    event: React.SyntheticEvent,
    value: number | null
  ) => {
    if (!user) {
      return;
    }
    rateMovie({
      userId: user.id,
      movieId: movie.id!,
      userRating: Number(value),
    });
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    
    checkFavoriteMovie({ userId: user.id, movieId: movie.id! });

    getMovieRating({ userId: user.id, movieId: movie.id! });
  }, [checkFavoriteMovie, getMovieRating, movie.id, user]);

  const backgroundColor = 'rgba(0, 0, 0, 0.7)';

  return (
    <Section
      sx={{
        background: `linear-gradient(${backgroundColor}, ${backgroundColor}), url(${movie.backdrop}) center / cover`,
        color: 'white',
      }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Box component="img" src={movie.poster} sx={{ width: '100%' }} />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {movie.title}{' '}
              <Typography
                component="span"
                variant="h5"
                sx={{ fontSize: 'inherit' }}
              >
                ({new Date(movie.releaseDate).getFullYear()})
              </Typography>
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ backgroundColor: 'white' }}
                />
              }
            >
              <Typography key={0} sx={{ flexShrink: 0 }}>
                {new Date(movie.releaseDate).toLocaleDateString('ru-RU')}
              </Typography>
              <Typography key={1}>{movie.genres.join(', ')}</Typography>
              {movie.runtime && (
                <Typography key={2} sx={{ flexShrink: 0 }}>
                  {getRuntimeLabel(movie.runtime)}
                </Typography>
              )}
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              {movie.rating ? (
                <Stack direction="row" alignItems="center">
                  <Box sx={{ width: 60, height: 60 }}>
                    <Rating value={movie.rating} />
                  </Box>
                  <Typography sx={{ ml: 1 }}>
                    Пользовательский <br /> рейтинг
                  </Typography>
                </Stack>
              ) : null}

              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  '& button': {
                    backgroundColor: 'black',
                    p: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    },
                  },
                  '& svg': {
                    fontSize: '80%',
                  },
                }}
              >
                <Tooltip title={favoriteButtonText}>
                  <IconButton onClick={handleFavoriteClick}>
                    <Favorite sx={{ color: isFavorite ? red[700] : 'white' }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title={rateButtonText}>
                  <IconButton onClick={handlePopoverOpen}>
                    <Grade sx={{ color: userRating ? yellow[700] : 'white' }} />
                  </IconButton>
                </Tooltip>
                <Popover
                  open={Boolean(rateAnchorEl)}
                  anchorEl={rateAnchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  onClose={handlePopoverClose}
                  sx={{ mt: 1 }}
                >
                  <Box sx={{ p: 2 }}>
                    {userRating && (
                      <Typography sx={{ mb: 2 }}>
                        Вы оценили этот фильм на {userRating}{' '}
                        {ratingDeclension(userRating)}. Хотите изменить?
                      </Typography>
                    )}
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: 'center' }}
                    >
                      <MuiRating
                        value={userRating}
                        onChange={handleRatingChange}
                        onChangeActive={(event, value) => {
                          setRateHover(value);
                        }}
                        max={10}
                      />
                      {rateHover !== -1 && (
                        <Typography variant="subtitle2">{rateHover}</Typography>
                      )}
                    </Stack>
                  </Box>
                </Popover>
              </Stack>
            </Stack>

            <Typography sx={{ mt: 2 }}>{movie.overview}</Typography>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
};

export default MovieInfo;

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import * as searchService from '../../services/searchService';
import SearchForm from '../../components/public/SearchForm';
import { Movie } from '../../types/movie';
import { Actor } from '../../types/actor';
import TabPanel from '../../components/public/TabPanel';
import MoviesGrid from '../../components/public/MoviesGrid';
import ActorsGrid from '../../components/public/ActorsGrid';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [tabsValue, setTabsValue] = useState('movies');

  const [movies, setMovies] = useState<Movie[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async (queryValue: string) => {
    setIsLoading(true);
    try {
      const { movies, actors } = await searchService.search(queryValue);
      setMovies(movies);
      setActors(actors);
      if (movies.length > 0) {
        setTabsValue('movies');
      } else if (actors.length > 0) {
        setTabsValue('actors');
      }
    } catch (error) {
      if (typeof error === 'string') {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      search(query);
    }
  }, [searchParams]);

  const searchSections = {
    movies: {
      title: 'Фильмы',
      count: movies.length,
    },
    actors: {
      title: 'Актеры',
      count: actors.length,
    },
  };

  const notFountContent = (
    <Container>
      <Alert severity="info">Ничего не найдено</Alert>
    </Container>
  );

  let searchContent;
  if (isLoading) {
    searchContent = (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else if (error) {
    searchContent = (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  } else {
    searchContent = (
      <>
        <TabPanel tabsValue={tabsValue} currentTabValue="movies">
          {movies.length > 0 ? <MoviesGrid movies={movies} /> : notFountContent}
        </TabPanel>

        <TabPanel tabsValue={tabsValue} currentTabValue="actors">
          {actors.length > 0 ? <ActorsGrid actors={actors} /> : notFountContent}
        </TabPanel>
      </>
    );
  }

  return (
    <Box component="main">
      <Container sx={{ py: 2 }}>
        <SearchForm
          queryInitialValue={searchParams.get('query') || ''}
          onSubmit={search}
        />

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={3}>
            <Stack
              sx={{
                border: '1px solid gray',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  p: 1,
                  textAlign: 'center',
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.contrastText,
                }}
              >
                Результаты поиска
              </Typography>
              <Stack>
                {Object.entries(searchSections).map(
                  ([section, { title, count }]) => (
                    <Box
                      key={section}
                      onClick={() => setTabsValue(section)}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 2,
                        py: 1.5,
                        backgroundColor:
                          tabsValue === section ? 'lightgray' : 'white',
                        cursor: 'pointer',
                      }}
                    >
                      <Typography variant="subtitle2" component="span">
                        {title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          width: 25,
                          height: 25,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: (theme) =>
                            theme.palette.primary.main,
                          color: (theme) => theme.palette.primary.contrastText,
                          borderRadius: '50%',
                        }}
                      >
                        {count}
                      </Typography>
                    </Box>
                  )
                )}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            {searchContent}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchPage;

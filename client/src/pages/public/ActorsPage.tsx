import React, { useEffect } from 'react';
import {
  Alert,
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Link,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ActorsGrid from '../../components/public/ActorsGrid';
import { documentDefaultTitle } from '../../appConfig';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchActors } from '../../store/actors';

const ActorsPage: React.FC = () => {
  const {
    items: actors,
    isLoading,
    error,
  } = useAppSelector((state) => state.actors);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActors());
  }, [dispatch]);

  let actorsContent;
  if (isLoading) {
    actorsContent = (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else if (error) {
    actorsContent = (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  } else if (actors.length > 0) {
    actorsContent = <ActorsGrid actors={actors} />;
  } else {
    actorsContent = (
      <Container>
        <Alert severity="info">Ничего не найдено</Alert>
      </Container>
    );
  }

  useEffect(() => {
    document.title = `${documentDefaultTitle} | Актеры`;
  }, []);

  return (
    <Box component="main">
      <Container>
        <Breadcrumbs aria-label="breadcrumb" sx={{ py: 2 }}>
          <Link component={RouterLink} underline="hover" color="inherit" to="/">
            Главная
          </Link>
          <Typography color="text.primary">Актеры</Typography>
        </Breadcrumbs>
      </Container>

      {actorsContent}
    </Box>
  );
};

export default ActorsPage;

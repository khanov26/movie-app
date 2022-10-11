import React, { useEffect } from 'react';
import {
  Alert,
  Box,
  Breadcrumbs,
  Container,
  Link,
  Skeleton,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import ActorInfo from '../../components/public/ActorInfo';
import TapeLoader from '../../components/public/TapeLoader';
import ActorCharacters from '../../components/public/ActorCharacters';
import { documentDefaultTitle } from '../../appConfig';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchCharacters } from '../../store/characters';
import { fetchActor } from '../../store/actor';

const ActorPage: React.FC = () => {
  const { actorId } = useParams();
  const dispatch = useAppDispatch();
  const {
    entity: actor,
    isLoading: isActorLoading,
    error: actorError,
  } = useAppSelector((state) => state.actor);
  const {
    items: characters,
    isLoading: isCharactersLoading,
    error: charactersError,
  } = useAppSelector((state) => state.characters);

  useEffect(() => {
    dispatch(fetchActor(actorId!));
    dispatch(fetchCharacters({ actorId }));
  }, [actorId, dispatch]);

  useEffect(() => {
    if (actor) {
      document.title = `${documentDefaultTitle} | ${actor.name}`;
    } else {
      document.title = documentDefaultTitle;
    }
  }, [actor]);

  let actorContent;
  if (isActorLoading) {
    actorContent = (
      <Container>
        <Skeleton variant="rectangular" sx={{ height: 400 }} />
      </Container>
    );
  } else if (actorError) {
    actorContent = <Alert severity="error">{actorError}</Alert>;
  } else if (actor) {
    actorContent = <ActorInfo actor={actor} />;
  }

  let charactersContent;
  if (isCharactersLoading) {
    charactersContent = (
      <Container>
        <TapeLoader />
      </Container>
    );
  } else if (charactersError) {
    charactersContent = <Alert severity="error">{charactersError}</Alert>;
  } else if (characters.length > 0) {
    charactersContent = <ActorCharacters characters={characters} />;
  }

  return (
    <Box component="main">
      <Container>
        <Breadcrumbs aria-label="breadcrumb" sx={{ py: 2 }}>
          <Link component={RouterLink} underline="hover" color="inherit" to="/">
            Главная
          </Link>
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to="/actors"
          >
            Актеры
          </Link>
          {actor && <Typography color="text.primary">{actor.name}</Typography>}
        </Breadcrumbs>
      </Container>

      {actorContent}
      {charactersContent}
    </Box>
  );
};

export default ActorPage;

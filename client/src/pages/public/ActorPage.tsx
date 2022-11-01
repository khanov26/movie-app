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
import { useGetActorQuery } from '../../store/actors/actorsSlice';
import { useGetCharactersQuery } from '../../store/characters/charactersSlice';
import { parseRTKQueryError } from '../../utils/error';

const ActorPage: React.FC = () => {
  const { actorId } = useParams();
  const {
    data: actor,
    isLoading: isActorLoading,
    error: actorError,
  } = useGetActorQuery(actorId!);
  const {
    data: characters = [],
    isLoading: isCharactersLoading,
    isError: isCharactersError,
    error: charactersError,
  } = useGetCharactersQuery({ actorId: actorId! });

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
    actorContent = (
      <Alert severity="error">
        {parseRTKQueryError(actorError) as string}
      </Alert>
    );
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
  } else if (isCharactersError) {
    charactersContent = (
      <Alert severity="error">
        {parseRTKQueryError(charactersError) as string}
      </Alert>
    );
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

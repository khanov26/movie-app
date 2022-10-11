import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Section from './Section';
import { Character } from '../../types/character';
import StyledTape from './StyledTape';
import ActorCharacter from './ActorCharacter';

interface Props {
  characters: Character[];
}

const ActorCharacters: React.FC<Props> = ({ characters }) => {
  return (
    <Section>
      <Container>
        <Typography variant="h4">Фильмы</Typography>
        <StyledTape component="ul">
          {characters.map((character) => (
            <Box
              key={character.id}
              component="li"
              sx={{ display: 'flex', flex: '0 0 150px' }}
            >
              <ActorCharacter character={character} />
            </Box>
          ))}
        </StyledTape>
      </Container>
    </Section>
  );
};

export default ActorCharacters;

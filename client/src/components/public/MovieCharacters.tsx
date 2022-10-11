import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Section from './Section';
import { Character } from '../../types/character';
import MovieCharacter from './MovieCharacter';
import StyledTape from './StyledTape';

interface Props {
  characters: Character[];
}

const MovieCharacters: React.FC<Props> = ({ characters }) => {
  return (
    <Section>
      <Container>
        <Typography variant="h5">В ролях</Typography>

        <StyledTape component="ul">
          {characters.map((character) => (
            <Box
              key={character.id}
              component="li"
              sx={{ display: 'flex', flex: '0 0 140px' }}
            >
              <MovieCharacter character={character} />
            </Box>
          ))}
        </StyledTape>
      </Container>
    </Section>
  );
};

export default MovieCharacters;

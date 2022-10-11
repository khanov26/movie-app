import React from 'react';
import Section from './Section';
import { Container, Grid } from '@mui/material';
import ActorItem from './ActorItem';
import { Actor } from '../../types/actor';

interface Props {
  actors: Actor[];
}

const ActorsGrid: React.FC<Props> = ({ actors }) => {
  return (
    <Section>
      <Container>
        <Grid container spacing={2}>
          {actors.map((actor) => (
            <Grid
              item
              xs={6}
              sm={3}
              lg={2}
              key={actor.id}
              sx={{ display: 'flex' }}
            >
              <ActorItem actor={actor} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default ActorsGrid;

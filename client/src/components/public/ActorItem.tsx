import React from 'react';
import { Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Actor } from '../../types/actor';

interface Props {
  actor: Actor;
}

const ActorItem: React.FC<Props> = ({ actor }) => {
  return (
    <Link
      component={RouterLink}
      to={`/actor/${actor.id}`}
      underline="none"
      sx={{ display: 'flex', width: '100%' }}
    >
      <Card>
        <CardMedia
          component="img"
          image={actor.profile}
          sx={{
            aspectRatio: '2 / 3',
            backgroundColor: '#ccc',
          }}
        />
        <CardContent>
          <Typography variant="subtitle2">{actor.name}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ActorItem;

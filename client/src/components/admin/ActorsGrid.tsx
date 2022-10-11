import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Actor } from '../../types/actor';
import { Delete, Edit } from '@mui/icons-material';

interface Props {
  actors: Actor[];
  onDelete: (actor: Actor) => void;
}

const ActorsGrid: React.FC<Props> = ({ actors, onDelete }) => {
  const handleDeleteClick = (actor: Actor) => () => onDelete(actor);

  return (
    <Grid container spacing={2}>
      {actors.map((actor) => (
        <Grid item key={actor.id}>
          <Card component={Stack} sx={{ width: 150, height: '100%' }}>
            <CardMedia
              component="img"
              image={actor.profile}
              sx={{ aspectRatio: '2 / 3' }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{
                  lineHeight: 1.2,
                }}
              >
                {actor.name}
              </Typography>
            </CardContent>
            <CardActions sx={{ mt: 'auto' }}>
              <IconButton
                component={Link}
                to={`/admin/actor/update/${actor.id}`}
                size="small"
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleDeleteClick(actor)}>
                <Delete fontSize="small" />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActorsGrid;

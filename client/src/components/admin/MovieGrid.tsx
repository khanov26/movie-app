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
import { Movie } from '../../types/movie';
import { truncateMultilineTextProperties } from '../../utils/style';
import { Delete, Edit } from '@mui/icons-material';

interface Props {
  movies: Movie[];
  onDelete: (movie: Movie) => void;
}

const MovieGrid: React.FC<Props> = ({ movies, onDelete }) => {
  const handleDeleteClick = (movie: Movie) => () => onDelete(movie);

  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item key={movie.id}>
          <Card component={Stack} sx={{ width: 150, height: '100%' }}>
            <CardMedia
              component="img"
              image={movie.poster}
              sx={{ aspectRatio: '2 / 3' }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                title={movie.title}
                sx={{
                  ...truncateMultilineTextProperties(2),
                  lineHeight: 1.2,
                }}
              >
                {movie.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                title={movie.genres.join(', ')}
                sx={{
                  ...truncateMultilineTextProperties(2),
                  mb: 1,
                }}
              >
                {movie.genres.join(', ')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(movie.releaseDate).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CardActions sx={{ mt: 'auto' }}>
              <IconButton
                component={Link}
                to={`/admin/movie/update/${movie.id}`}
                size="small"
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleDeleteClick(movie)}>
                <Delete fontSize="small" />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;

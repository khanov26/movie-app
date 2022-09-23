import React from 'react';
import {Box, Card, CardContent, CardMedia, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import Rating from "./Rating";
import {Movie} from "../../types/movie";
import {truncateMultilineTextProperties} from "../../utils/style";

interface Props {
    movie: Movie;
}

const MovieItem: React.FC<Props> = ({movie}) => {
    return (
        <Link
            component={RouterLink}
            to={`/movie/${movie.id}`}
            underline="none"
            sx={{color: 'inherit', display: 'flex', width: '100%'}}
        >
            <Card sx={{width: '100%'}}>
                <Box sx={{position: 'relative'}}>
                    <CardMedia
                        component="img"
                        src={movie.poster}
                        sx={{aspectRatio: '2/3'}}
                    />

                    {movie.rating ?
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: -25,
                                left: 10,
                                width: 50,
                                height: 50,
                            }}
                        >
                            <Rating value={movie.rating}/>
                        </Box> : null
                    }
                </Box>

                <CardContent sx={{pt: 4}}>
                    <Typography
                        variant="subtitle2"
                        title={movie.title}
                        sx={{
                            ...truncateMultilineTextProperties(2)
                        }}
                    >
                        {movie.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{mt: 1, color: 'text.secondary'}}
                    >
                        {new Date(movie.releaseDate).toLocaleDateString('ru-RU')}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

export default MovieItem;

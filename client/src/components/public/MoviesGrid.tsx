import React from 'react';
import {Grid} from "@mui/material";
import MovieItem from "./MovieItem";
import {Movie} from "../../types/movie";

interface Props {
    movies: Movie[];
}

const MoviesGrid: React.FC<Props> = ({movies}) => {
    return (
        <Grid container spacing={2} sx={{py: 2}}>
            {movies.map(movie => (
                <Grid item xs={6} sm={4} md={3} key={movie.id} sx={{display: 'flex'}}>
                    <MovieItem movie={movie} />
                </Grid>
            ))}
        </Grid>
    );
};

export default MoviesGrid;

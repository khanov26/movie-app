import React from 'react';
import {Box} from "@mui/material";
import MovieItem from "./MovieItem";
import StyledTape from "./StyledTape";
import {Movie} from "../../types/movie";

interface Props {
    movies: Movie[];
}

const MovieTape: React.FC<Props> = ({movies}) => {
    return (
        <StyledTape component="ul">
            {movies.map((movie) => (
                <Box key={movie.id} component="li" sx={{display: 'flex', flex: '0 0 150px'}}>
                    <MovieItem movie={movie} />
                </Box>
            ))}
        </StyledTape>
    );
};

export default MovieTape;

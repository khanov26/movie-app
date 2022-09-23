import React from 'react';
import {Container, Typography} from "@mui/material";
import Section from "./Section";
import MovieTape from "./MovieTape";
import {Movie} from "../../types/movie";

interface Props {
    movies: Movie[];
}

const RecommendedMovies: React.FC<Props> = ({movies}) => {
    return (
        <Section>
            <Container>
                <Typography variant="h5">Рекомендации</Typography>
                <MovieTape movies={movies} />
            </Container>
        </Section>
    );
};

export default RecommendedMovies;

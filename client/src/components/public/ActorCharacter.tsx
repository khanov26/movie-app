import React from 'react';
import {Character} from "../../types/character";
import {Link as RouterLink} from "react-router-dom";
import {Card, CardContent, CardMedia, Link, Typography} from "@mui/material";
import {truncateMultilineTextProperties} from "../../utils/style";

interface Props {
    character: Character;
}

const ActorCharacter: React.FC<Props> = ({character: {name, movie}}) => {
    return (
        <Link component={RouterLink} to={`/movie/${movie.id}`} underline="none" sx={{display: 'flex', width: '100%'}}>
            <Card sx={{width: '100%'}}>
                <CardMedia
                    component="img"
                    image={movie.poster}
                    sx={{aspectRatio: '2/3'}}
                />
                <CardContent>
                    <Typography variant="subtitle2">{movie.title}</Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 1,
                            color: 'text.secondary',
                            ...truncateMultilineTextProperties(3),
                        }}
                        title={name}
                    >
                        {name}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ActorCharacter;

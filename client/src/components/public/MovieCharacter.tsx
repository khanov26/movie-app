import React from 'react';
import {Card, CardContent, CardMedia, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {Character} from "../../types/character";
import {truncateMultilineTextProperties} from "../../utils/style";

interface Props {
    character: Character;
}

const MovieCharacter: React.FC<Props> = ({character: {name, actor}}) => {
    return (
        <Link component={RouterLink} to={`/actor/${actor.id}`} underline="none" sx={{display: 'flex', width: '100%'}}>
            <Card sx={{width: '100%'}}>
                <CardMedia
                    component="img"
                    image={actor.profile}
                    sx={{aspectRatio: '2/3'}}
                />
                <CardContent>
                    <Typography variant="subtitle2">{actor.name}</Typography>
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

export default MovieCharacter;

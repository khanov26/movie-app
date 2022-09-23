import React, {useEffect} from 'react';
import {Alert, Box, Breadcrumbs, Container, Link, Skeleton, Typography} from "@mui/material";
import {Link as RouterLink, useParams} from "react-router-dom";
import ActorInfo from "../../components/public/ActorInfo";
import useFetchActor from "../../hooks/fetchActor";
import useFetchCharacters from "../../hooks/fetchCharacters";
import TapeLoader from "../../components/public/TapeLoader";
import ActorCharacters from "../../components/public/ActorCharacters";
import {documentDefaultTitle} from "../../appConfig";

const ActorPage: React.FC = () => {
    const {actorId} = useParams();
    const {actor, isLoading: isActorLoading, error: actorError} = useFetchActor(actorId!);
    const {characters, isLoading: isCharactersLoading, error: charactersError} = useFetchCharacters({actorId});

    useEffect(() => {
        if (actor) {
            document.title = `${documentDefaultTitle} | ${actor.name}`;
        } else {
            document.title = documentDefaultTitle;
        }
    }, [actor]);

    let actorContent;
    if (isActorLoading) {
        actorContent = (
            <Container>
                <Skeleton variant="rectangular" sx={{height: 400}} />
            </Container>
        );
    } else if (actorError) {
        actorContent = (
            <Alert severity="error">{actorError}</Alert>
        );
    } else if (actor) {
        actorContent = (
            <ActorInfo actor={actor}/>
        );
    }

    let charactersContent;
    if (isCharactersLoading) {
        charactersContent = (
            <Container>
                <TapeLoader/>
            </Container>
        );
    } else if (charactersError) {
        charactersContent = (
            <Alert severity="error">{charactersError}</Alert>
        );
    } else if (characters.length > 0) {
        charactersContent = (
            <ActorCharacters characters={characters}/>
        );
    }


    return (
        <Box component="main">
            <Container>
                <Breadcrumbs aria-label="breadcrumb" sx={{py: 2}}>
                    <Link component={RouterLink} underline="hover" color="inherit" to="/">
                        Главная
                    </Link>
                    <Link component={RouterLink} underline="hover" color="inherit" to="/actors">
                        Актеры
                    </Link>
                    {actor &&
                    <Typography color="text.primary">
                        {actor.name}
                    </Typography>
                    }
                </Breadcrumbs>
            </Container>

            {actorContent}
            {charactersContent}
        </Box>
    );
};

export default ActorPage;
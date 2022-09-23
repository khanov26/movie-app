import React, {useState} from 'react';
import {
    Alert,
    Box,
    CircularProgress,
    FormControl,
    IconButton,
    InputLabel,
    Typography
} from "@mui/material";
import * as characterService from "../../services/characterService";
import {Character} from "../../types/character";
import {Add, Close} from "@mui/icons-material";
import AddCharacterDialog from "./AddCharacterDialog";
import useFetchCharacters from "../../hooks/fetchCharacters";

interface Props {
    movieId: string;
}

const Characters: React.FC<Props> = ({movieId}) => {
    const {characters, setCharacters, isLoading, error} = useFetchCharacters({movieId});

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isSaving, setIsSaving] = useState(false);

    const createCharacter = async (character: Character) => {
        setIsSaving(true);
        const createdCharacter = await characterService.create(character);
        setCharacters([...characters, createdCharacter]);
        setIsSaving(false);
    };

    const handleClickOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const handleCharacterDeleteClick = (characterToDelete: Character) => () => {
        characterService.deleteById(characterToDelete.id!);
        setCharacters(characters.filter(character => character.id !== characterToDelete.id));
    };

    let charactersContent;
    if (isLoading) {
        charactersContent = (
            <Box sx={{textAlign: 'center'}}>
                <CircularProgress/>
            </Box>
        );
    } else if (error) {
        charactersContent = (
            <Alert severity="error">{error}</Alert>
        );
    } else if (characters.length > 0) {
        charactersContent = (
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 30px',
                gap: 1,
            }}>
                {characters.map(character => (
                    <React.Fragment key={character.id}>
                        <Typography variant="body2" color="text.secondary">{character.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{character.actor.name}</Typography>
                        <IconButton
                            size="small"
                            title="Удалить"
                            sx={{ml: 'auto'}}
                            onClick={handleCharacterDeleteClick(character)}
                        >
                            <Close fontSize="small"/>
                        </IconButton>
                    </React.Fragment>
                ))}
            </Box>
        );
    } else {
        charactersContent = (
            <Typography variant="body2" color="text.secondary">Роли не добавлены</Typography>
        );
    }

    return (
        <>
            <FormControl variant="outlined" sx={{
                p: 1,
            }}>
                <Box component="fieldset" sx={{
                    border: theme => `1px solid ${theme.palette.grey.A400}`,
                    borderRadius: 1,
                    position: 'absolute',
                    top: -12,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    px: 1,
                    py: 0,
                    m: 0,
                    zIndex: -1,
                }}>
                    <Box component="legend" sx={{visibility: 'hidden'}}>Роли</Box>
                </Box>
                <InputLabel shrink>Роли</InputLabel>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    mb: 1,
                }}>
                    <IconButton title='Добавить' onClick={handleClickOpenDialog}>
                        <Add/>
                    </IconButton>
                </Box>

                {charactersContent}
            </FormControl>

            <AddCharacterDialog
                isOpen={isDialogOpen}
                onClose={handleClose}
                isSaving={isSaving}
                onSave={createCharacter}
                movieId={movieId}
            />
        </>
    );
};

export default Characters;

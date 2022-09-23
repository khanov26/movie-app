import React from 'react';
import {Autocomplete, TextField} from "@mui/material";
import useFetchGenres from "../../hooks/fetchGenres";

interface Props {
    selectedGenres: string[];
    onChange: (genres: string[]) => void;
    isDisabled?: boolean
}

const Genres: React.FC<Props> = ({selectedGenres, onChange, isDisabled = false}) => {
    const {genres} = useFetchGenres();

    return (
        <Autocomplete
            multiple
            freeSolo
            options={genres}
            value={selectedGenres}
            onChange={((event, value) => {
                onChange(value.map(genre => genre.trim()));
            })}
            disabled={isDisabled}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Жанры *"
                    placeholder="Жанры"
                />
            )}
        />
    );
};

export default Genres;

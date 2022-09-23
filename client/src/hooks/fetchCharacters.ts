import {useEffect, useState} from "react";
import {Character} from "../types/character";
import * as characterService from "../services/characterService";

interface SearchParams {
    movieId?: string;
    actorId?: string;
}

export default function useFetchCharacters(searchParams: SearchParams) {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    const loadCharacters = async ({movieId, actorId}: SearchParams) => {
        setIsLoading(true);
        try {
            let characters;
            if (movieId) {
                characters = await characterService.getByMovieId(movieId);
            } else if (actorId) {
                characters = await characterService.getByActorId(actorId);
            } else {
                throw new Error('Неправильный параметр');
            }

            setCharacters(characters);
        } catch (error) {
            setError(String(error));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCharacters(searchParams);
    }, []);

    return {
        characters,
        setCharacters,
        isLoading,
        error,
    }
}

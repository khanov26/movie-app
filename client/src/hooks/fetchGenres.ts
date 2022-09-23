import {useEffect, useState} from "react";
import * as genreService from "../services/genreService";

export default function useFetchGenres() {
    const [genres, setGenres] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        setIsLoading(true);
        genreService.getAll()
            .then(setGenres)
            .catch(setError)
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return {
        genres,
        isLoading,
        error,
    }
}

import {useEffect, useState} from "react";
import {Movie, MovieSearchParams} from "../types/movie";
import * as movieService from "../services/movieService";

export default function useFetchMovies(movieParams?: MovieSearchParams) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    const fetchMovies = async () => {
        setIsLoading(true);
        try {
            const movies = await movieService.getAll(movieParams);
            setMovies(movies);
        } catch (error) {
            if (typeof error === 'string') {
                setError(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [movieParams]);

    return {
        movies,
        isLoading,
        error,
        forceFetch: fetchMovies,
    }
}

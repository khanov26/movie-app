import {useEffect, useState} from "react";
import {Movie} from "../types/movie";
import * as movieService from "../services/movieService";

export default function useFetchMovie(movieId: string) {
    const [movie, setMovie] = useState<Movie>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    const fetchMovie = async (movieId: string) => {
        setIsLoading(true);
        try {
            const movie = await movieService.getById(movieId);
            setMovie(movie);
        } catch (error) {
            setError(String(error));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovie(movieId!);
    }, []);

    return {
        movie,
        isLoading,
        error,
    }
}

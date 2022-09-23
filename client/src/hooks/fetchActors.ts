import {useEffect, useState} from "react";
import {Actor} from "../types/actor";
import * as actorService from "../services/actorService";

export default function useFetchActors() {
    const [actors, setActors] = useState<Actor[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    const fetchActors = async () => {
        setIsLoading(true);
        try {
            const actors = await actorService.getAll();
            setActors(actors);
        } catch (error) {
            setError(String(error));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchActors();
    }, []);

    return {
        actors,
        isLoading: isLoading,
        error,
        forceFetch: fetchActors,
    }
}

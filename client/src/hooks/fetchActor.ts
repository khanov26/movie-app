import {useEffect, useState} from "react";
import {Actor} from "../types/actor";
import * as actorService from "../services/actorService";

export default function useFetchActor(actorId: string) {
    const [actor, setActor] = useState<Actor>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    const fetchActor = async (id: string) => {
        setIsLoading(true);
        try {
            const actor = await actorService.getById(id);
            setActor(actor);
        } catch (error) {
            setError(String(error));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchActor(actorId);
    }, []);

    return {
        actor,
        isLoading,
        error,
    }
}

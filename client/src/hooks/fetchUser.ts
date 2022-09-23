import {useEffect, useState} from "react";
import * as userService from "../services/userService";
import {User} from "../types/user";

export default function useFetchUser(userId: string) {
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>();

    const fetchUser = async (id: string) => {
        setIsLoading(true);
        try {
            const actor = await userService.getById(id);
            setUser(actor);
        } catch (error) {
            setError(String(error));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser(userId);
    }, []);

    return {
        user,
        isLoading,
        error,
    }
}

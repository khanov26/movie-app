import api from "./api";
import {Movie} from "../types/movie";
import {Actor} from "../types/actor";

export const search = async (query: string) => {
    const response = await api.get<{movies: Movie[], actors: Actor[]}>('/search', {params: {query}});
    return response.data;
};

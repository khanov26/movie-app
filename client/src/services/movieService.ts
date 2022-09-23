import {Movie, MovieSearchParams} from "../types/movie";
import api from "./api";
import {convertObjectToFormData} from "../utils/data";

export const create = async (movie: Movie, poster: File | null, backdrop: File | null): Promise<Movie> => {
    const data = convertObjectToFormData(movie);

    if (poster) {
        data.set('poster', poster);
    }

    if (backdrop) {
        data.set('backdrop', backdrop);
    }

    const response = await api.post<Movie>('/movie', data);
    return response.data;
};

export const getById = async (movieId: string): Promise<Movie> => {
    const response = await api.get<Movie>(`/movie/${movieId}`);
    return response.data;
};

export const update = async (movie: Movie, poster: File | null, backdrop: File | null): Promise<Movie> => {
    const data = convertObjectToFormData(movie);

    if (poster) {
        data.set('poster', poster);
    }

    if (backdrop) {
        data.set('backdrop', backdrop);
    }

    const response = await api.put<Movie>('/movie', data);
    return response.data;
};

export const deleteById = async (movieId: string) => {
    await api.delete(`/movie/${movieId}`);
};

export const getAll = async (movieParams?: MovieSearchParams): Promise<Movie[]> => {
    const response = await api.get<Movie[]>('/movies', {
        params: movieParams
    });
    return response.data;
};

import {User} from "../types/user";
import api from "./api";
import {convertObjectToFormData} from "../utils/data";

export const getById = async (id: string): Promise<User> => {
    const response = await api.get<User>(`/user/${id}`);
    return response.data;
};

export const create = async (user: User, password: string): Promise<User> => {
    const response = await api.post<User>('/signup', {
        ...user,
        password,
    });
    return response.data;
};

export const update = async (user: User, profile: File | null): Promise<User> => {
    const data = convertObjectToFormData(user);

    if (profile) {
        data.set('profile', profile);
    }

    const response = await api.put<User>('/user', data);
    return response.data;
};

export const addFavoriteMovie = async (userId: string, movieId: string) => {
    await api.post('/user/favorite-movies', {userId, movieId});
};

export const removeFavoriteMovie = async (userId: string, movieId: string) => {
    await api.delete(`/user/${userId}/favorite-movies/${movieId}`);
};

export const checkFavoriteMovie = async (userId: string, movieId: string) => {
    const response = await api.get<{isFavorite: boolean}>('/user/favorite-movies', {
        params: {userId, movieId}
    });
    return response.data;
};

export const rateMovie = async (userId: string, movieId: string, userRating: number) => {
    await api.post('/user/rate-movie', {userId, movieId, userRating});
};

export const getMovieRating = async (userId: string, movieId: string) => {
    const response = await api.get<{rating: number | null}>('/user/rate-movie', {
        params: {userId, movieId}
    });
    return response.data;
};

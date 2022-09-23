import {Actor} from "../types/actor";
import api from "./api";
import {convertObjectToFormData} from "../utils/data";

export const create = async (actor: Actor, profile: File | null): Promise<Actor> => {
    const data = convertObjectToFormData(actor);

    if (profile) {
        data.set('profile', profile);
    }

    const response = await api.post<Actor>('/actor', data);
    return response.data;
};

export const getById = async (actorId: string): Promise<Actor> => {
    const response = await api.get<Actor>(`/actor/${actorId}`);
    return response.data;
};

export const update = async (actor: Actor, profile: File | null): Promise<Actor> => {
    const data = convertObjectToFormData(actor);

    if (profile) {
        data.set('profile', profile);
    }

    const response = await api.put<Actor>('/actor', data);
    return response.data;
};

export const deleteById = async (actorId: string) => {
    await api.delete(`/actor/${actorId}`);
};

export const getAll = async (name?: string): Promise<Actor[]> => {
    let url = '/actors';
    if (name) {
        url += `/?name=${name}`;
    }
    const response = await api.get<Actor[]>(url);
    return response.data;
};

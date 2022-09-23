import api from "./api";

export const getAll = async () => {
    const response = await api.get<string[]>('/genres');
    return response.data;
};

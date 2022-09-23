import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

api.interceptors.request.use(config => {
    const userData = localStorage.getItem('user');
    if (userData) {
        const {accessToken} = JSON.parse(userData);
        if (!config.headers) {
            config.headers = {};
        }
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
});

api.interceptors.response.use(response => response, error => {
    if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
    } else {
        return Promise.reject(error.message);
    }
});

export default api;

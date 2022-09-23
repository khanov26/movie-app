import React, {createContext, useContext, useEffect, useState} from "react";
import api from "../services/api";
import {parseJwt} from "../utils/auth";
import {Role} from "../types/role";

interface AuthContextType {
    user: {
        id: string;
        email: string;
        accessToken: string;
        role: Role;
        exp: number;
    } | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<AuthContextType['user']>(null);

    useEffect(() => {
        const userDataStr = localStorage.getItem('user');
        if (!userDataStr) {
            return;
        }
        const userData = JSON.parse(userDataStr);
        const decodedJwt = parseJwt(userData.accessToken);
        const user = {
            ...userData,
            role: decodedJwt.role,
            exp: decodedJwt.exp,
        };
        setUser(user);
    }, []);

    const login = async (email: string, password: string) => {
        const response = await api.post<AuthContextType['user']>('/login', {email, password});
        const userData = response.data!;

        const decodedJwt = parseJwt(userData.accessToken);
        const user = {
            ...userData,
            role: decodedJwt.role,
            exp: decodedJwt.exp,
        };

        setUser(user);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

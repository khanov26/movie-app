import React, {ReactElement} from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "./useAuth";

interface Props {
    children: ReactElement;
}

const RequireAuth: React.FC<Props> = ({children}) => {
    const {user} = useAuth();
    const location = useLocation();

    return (
        user ? children : <Navigate to="/login" state={{from: location}} replace />
    );
};

export default RequireAuth;

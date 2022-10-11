import React, {ReactElement} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import { useAppSelector } from '../hooks/store';

interface Props {
    children: ReactElement;
}

const RequireAuth: React.FC<Props> = ({children}) => {
    const user = useAppSelector(state => state.auth);
    const location = useLocation();

    return (
        user ? children : <Navigate to="/login" state={{from: location}} replace />
    );
};

export default RequireAuth;

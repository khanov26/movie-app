import React, {useEffect} from 'react';
import {useLocation, useRoutes} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import adminRoutes from "./routes/adminRoutes";
import publicRoutes from "./routes/publicRoutes";
import {useAuth} from "./auth/useAuth";

function App() {
    const routes = useRoutes([...adminRoutes, ...publicRoutes]);

    const {pathname} = useLocation();
    const {user, logout} = useAuth();

    useEffect(() => {
        // check token expiration
        if (!user) {
            return;
        }
        if (user.exp * 1000 < Date.now()) {
            logout();
        }
    }, [pathname]);

    return (
        <>
            <CssBaseline/>
            {routes}
        </>
    );
}

export default App;

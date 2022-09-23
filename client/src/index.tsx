import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {AuthProvider} from "./auth/useAuth";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);

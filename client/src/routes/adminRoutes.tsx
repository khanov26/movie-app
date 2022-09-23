import React from 'react';
import AdminTemplate from "../pages/admin/AdminTemplate";
import AdminHomePage from "../pages/admin/AdminHomePage";
import CreateMoviePage from "../pages/admin/CreateMoviePage";
import UpdateMoviePage from "../pages/admin/UpdateMoviePage";
import MoviesPage from "../pages/admin/MoviesPage";
import CreateActorPage from "../pages/admin/CreateActorPage";
import UpdateActorPage from "../pages/admin/UpdateActorPage";
import ActorsPage from "../pages/admin/ActorsPage";
import {RouteObject} from "react-router-dom";
import RequireAuth from "../auth/RequireAuth";

const adminRoutes: RouteObject[] = [
    {
        path: '/admin',
        element: (
            <RequireAuth>
                <AdminTemplate/>
            </RequireAuth>
        ),
        children: [
            {index: true, element: <AdminHomePage/>},

            {path: 'movie/create', element: <CreateMoviePage/>},
            {path: 'movie/update/:movieId', element: <UpdateMoviePage/>},
            {path: 'movies', element: <MoviesPage/>},

            {path: 'actor/create', element: <CreateActorPage/>},
            {path: 'actor/update/:actorId', element: <UpdateActorPage/>},
            {path: 'actors', element: <ActorsPage/>},
        ],
    }
];

export default adminRoutes;

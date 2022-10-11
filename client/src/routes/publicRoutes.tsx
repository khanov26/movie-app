import React from 'react';
import PublicTemplate from '../pages/public/PublicTemplate';
import HomePage from '../pages/public/HomePage';
import MoviePage from '../pages/public/MoviePage';
import ActorPage from '../pages/public/ActorPage';
import MoviesPage from '../pages/public/MoviesPage';
import ActorsPage from '../pages/public/ActorsPage';
import { RouteObject } from 'react-router-dom';
import LoginPage from '../pages/public/LoginPage';
import SignupPage from '../pages/public/SignupPage';
import RequireAuth from '../auth/RequireAuth';
import UserPage from '../pages/public/UserPage';
import SearchPage from '../pages/public/SearchPage';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicTemplate />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'movie/:movieId', element: <MoviePage /> },
      { path: 'movies', element: <MoviesPage /> },

      { path: 'actor/:actorId', element: <ActorPage /> },
      { path: 'actors', element: <ActorsPage /> },

      { path: 'search', element: <SearchPage /> },

      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      {
        path: '/user/profile',
        element: (
          <RequireAuth>
            <UserPage />
          </RequireAuth>
        ),
      },
    ],
  },
];

export default publicRoutes;

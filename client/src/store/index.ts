import { configureStore } from '@reduxjs/toolkit';
import searchMoviesReducer from './movies/movies';
import topRatedMoviesReducer from './movies/topRatedMovies';
import mostPopularMoviesReducer from './movies/mostPopularMovies';
import movieReducer from './movie';
import charactersReducer from './characters';
import actorsReducer from './actors';
import actorReducer from './actor';
import genresReducer from './genres';
import userReducer from './user';
import authReducer from './auth';

const store = configureStore({
  reducer: {
    movies: searchMoviesReducer,
    topRatedMovies: topRatedMoviesReducer,
    mostPopularMovies: mostPopularMoviesReducer,
    movie: movieReducer,
    characters: charactersReducer,
    actors: actorsReducer,
    actor: actorReducer,
    genres: genresReducer,
    user: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

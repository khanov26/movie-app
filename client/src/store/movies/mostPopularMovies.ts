import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MovieSearchParams } from '../../types/movie';
import * as movieService from '../../services/movieService';
import { MoviesState } from './types';

const initialState: MoviesState = {
  isLoading: false,
  items: [],
  error: '',
};

export const fetchMostPopularMovies = createAsyncThunk(
  'mostPopularMovies/fetch',
  (movieParams?: MovieSearchParams) => {
    return movieService.getAll(movieParams);
  }
);

const moviesSlice = createSlice({
  name: 'mostPopularMovies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMostPopularMovies.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchMostPopularMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchMostPopularMovies.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default moviesSlice.reducer;

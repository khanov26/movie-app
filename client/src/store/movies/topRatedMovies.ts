import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MovieSearchParams } from '../../types/movie';
import * as movieService from '../../services/movieService';
import { MoviesState } from './types';

const initialState: MoviesState = {
  isLoading: false,
  items: [],
  error: '',
};

export const fetchTopRatedMovies = createAsyncThunk(
  'topRatedMovies/fetch',
  (movieParams?: MovieSearchParams) => {
    return movieService.getAll(movieParams);
  }
);

const moviesSlice = createSlice({
  name: 'topRatedMovies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default moviesSlice.reducer;

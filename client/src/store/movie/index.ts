import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as movieService from '../../services/movieService';
import { MovieState } from './types';

const initialState: MovieState = {
  isLoading: false,
  entity: null,
  error: '',
};

export const fetchMovie = createAsyncThunk('movie/fetch', (id: string) => {
  return movieService.getById(id);
});

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.isLoading = true;
        state.entity = null;
        state.error = '';
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entity = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default movieSlice.reducer;

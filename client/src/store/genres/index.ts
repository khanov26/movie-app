import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as genreService from '../../services/genreService';
import { GenresState } from './types';

const initialState: GenresState = {
  isLoading: false,
  items: [],
  error: '',
};

export const fetchGenres = createAsyncThunk('genres/fetch', () => {
  return genreService.getAll();
});

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default genresSlice.reducer;

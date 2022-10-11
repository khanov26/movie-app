import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as actorService from '../../services/actorService';
import { Actor } from '../../types/actor';
import { ActorsState } from './types';

const initialState: ActorsState = {
  isLoading: false,
  items: [],
  error: '',
};

export const fetchActors = createAsyncThunk('actors/fetch', () => {
  return actorService.getAll();
});

export const deleteActor = createAsyncThunk('actors/delete', (actor: Actor) => {
  actorService.deleteById(actor.id!);
  return actor;
});

const actorsSlice = createSlice({
  name: 'actors',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActors.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchActors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchActors.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(deleteActor.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (actor) => actor.id !== action.payload.id
        );
      });
  },
});

export default actorsSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as actorService from '../../services/actorService';
import { ActorState } from './types';

const initialState: ActorState = {
  isLoading: false,
  entity: null,
  error: '',
};

export const fetchActor = createAsyncThunk('actor/fetch', (id: string) => {
  return actorService.getById(id);
});

const actorSlice = createSlice({
  name: 'actor',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActor.pending, (state) => {
        state.isLoading = true;
        state.entity = null;
        state.error = '';
      })
      .addCase(fetchActor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entity = action.payload;
      })
      .addCase(fetchActor.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default actorSlice.reducer;

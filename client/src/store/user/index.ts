import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userService from '../../services/userService';
import { UserState } from './types';

const initialState: UserState = {
  isLoading: false,
  entity: null,
  error: '',
};

export const fetchUser = createAsyncThunk('user/fetch', (id: string) => {
  return userService.getById(id);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entity = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase('auth/logout', (state) => {
        state.entity = null;
      });
  },
});

export default userSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';
import { parseJwt } from '../../utils/auth';
import { AuthState } from './types';

function getInitialState(): AuthState | null {
  const userDataStr = localStorage.getItem('user');
  if (!userDataStr) {
    return null;
  }
  const userData = JSON.parse(userDataStr);
  const decodedJwt = parseJwt(userData.accessToken);
  const user = {
    ...userData,
    role: decodedJwt.role,
    exp: decodedJwt.exp,
  };
  return user;
}

const initialState = getInitialState();

export const login = createAsyncThunk<
  AuthState,
  { email: string; password: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await api.post<AuthState>('/login', { email, password });
    return response.data!;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('user');
      return null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const userData = action.payload;
        const decodedJwt = parseJwt(userData.accessToken);
        const user: AuthState = {
            ...userData,
            role: decodedJwt.role,
            exp: decodedJwt.exp,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        return user;
      });
  }
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;

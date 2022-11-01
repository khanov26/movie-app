import { createSlice } from '@reduxjs/toolkit';
import { parseJwt } from '../../utils/auth';
import { apiSlice } from '../api/apiSlice';
import { AuthCredentials, AuthState } from './types';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthState, AuthCredentials>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = extendedApiSlice;

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
    builder.addMatcher(
      extendedApiSlice.endpoints.login.matchFulfilled,
      (state, action) => {
        const userData = action.payload;
        const decodedJwt = parseJwt(userData.accessToken);
        const user: AuthState = {
          ...userData,
          role: decodedJwt.role,
          exp: decodedJwt.exp,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        return user;
      }
    );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

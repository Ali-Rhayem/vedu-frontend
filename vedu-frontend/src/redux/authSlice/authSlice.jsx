import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      console.log('Login Success Action:', action.payload);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      console.log('State after loginSuccess:', state);
    },
    logout(state) {
      console.log('Logout Action Triggered');
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      console.log('State after logout:', state);
    },
    authError(state, action) {
      console.log('Auth Error Action:', action.payload);
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logout, authError } = authSlice.actions;
export default authSlice.reducer;

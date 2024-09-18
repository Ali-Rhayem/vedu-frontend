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
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    authError(state, action) {
      console.log('Auth Error Action:', action.payload);
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logout, authError } = authSlice.actions;
export default authSlice.reducer;

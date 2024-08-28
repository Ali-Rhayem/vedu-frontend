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
    }
  },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;

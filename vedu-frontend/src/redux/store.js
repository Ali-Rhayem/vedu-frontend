import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice/authSlice';
import userReducer from './userSlice/userSlice';  

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
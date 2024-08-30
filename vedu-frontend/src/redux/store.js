import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice/authSlice';
import userReducer from './userSlice/userSlice';
import coursesReducer from "./coursesSlice/coursesSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    courses: coursesReducer,
  },
});

export default store;
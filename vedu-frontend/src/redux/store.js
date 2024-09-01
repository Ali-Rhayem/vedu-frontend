import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice/authSlice';
import userReducer from './userSlice/userSlice';
import coursesReducer from "./coursesSlice/coursesSlice";
import assignmentsReducer from "./assignmentsSlice/assignmentsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    courses: coursesReducer,
    assignments: assignmentsReducer,
  },
});

export default store;
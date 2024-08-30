// src/redux/coursesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],  // Initialize courses as an empty array
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses(state, action) {
      state.courses = action.payload;
    },
    addCourse(state, action) {
      state.courses.push(action.payload);
    },
  },
});

export const { setCourses, addCourse } = coursesSlice.actions;

export default coursesSlice.reducer;

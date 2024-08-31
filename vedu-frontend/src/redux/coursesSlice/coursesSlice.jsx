import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
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
    resetCourses: (state) => {
      state.courses = [];
    },
  },
});

export const { setCourses, addCourse,resetCourses } = coursesSlice.actions;

export default coursesSlice.reducer;

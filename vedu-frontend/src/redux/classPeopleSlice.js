import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  instructors: {},
  students: {},
  loading: false,
  error: null,
  fetchedClasses: {}, // Track if data has been fetched for a class
};

const classPeopleSlice = createSlice({
  name: "classPeople",
  initialState,
  reducers: {
    setClassPeopleLoading: (state) => {
      state.loading = true;
    },
    setClassPeopleSuccess: (state, action) => {
      const { classId, instructors, students } = action.payload;
      state.instructors[classId] = instructors;
      state.students[classId] = students;
      state.loading = false;
      state.error = null;
      state.fetchedClasses[classId] = true;
    },
    setClassPeopleError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addInstructor: (state, action) => {
      const { classId, instructor } = action.payload;
      if (!state.instructors[classId]) {
        state.instructors[classId] = [];
      }
      state.instructors[classId].push(instructor);
    },
    addStudent: (state, action) => {
      const { classId, student } = action.payload;
      if (!state.students[classId]) {
        state.students[classId] = [];
      }
      state.students[classId].push(student);
    },
    removeInstructor: (state, action) => {
      const { classId, instructorId } = action.payload;
      state.instructors[classId] = state.instructors[classId].filter(
        (instructor) => instructor.id !== instructorId
      );
    },
    removeStudent: (state, action) => {
      const { classId, studentId } = action.payload;
      state.students[classId] = state.students[classId].filter(
        (student) => student.id !== studentId
      );
    },
    clearAllClassPeople: (state) => {
        state.instructors = {};
        state.students = {};
        state.fetchedClasses = {};
        state.error = null;
      },
  },
});

export const {
  setClassPeopleLoading,
  setClassPeopleSuccess,
  setClassPeopleError,
  addInstructor,
  addStudent,
  removeInstructor,
  removeStudent,
  clearAllClassPeople, 
} = classPeopleSlice.actions;

export default classPeopleSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments(state, action) {
      state.assignments = action.payload;
    },
    addAssignment(state, action) {
      state.assignments.push(action.payload);
    },
    resetAssignments: (state) => {
      state.assignments = [];
    },
  },
});

export const { setAssignments, addAssignment,resetAssignments } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;

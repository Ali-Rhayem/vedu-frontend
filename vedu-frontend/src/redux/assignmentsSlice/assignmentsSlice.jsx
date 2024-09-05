import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      const { classId, topics } = action.payload;
      state[classId] = topics;
    },
    addAssignment: (state, action) => {
      const { classId, topicName, assignment } = action.payload;
      if (state[classId]) {
        if (!state[classId][topicName]) {
          state[classId][topicName] = [];
        }
        state[classId][topicName].push(assignment);
      }
    },
    removeAssignment: (state, action) => {
      const { classId, topicName, assignmentId } = action.payload;
      if (state[classId] && state[classId][topicName]) {
        state[classId][topicName] = state[classId][topicName].filter(
          (assignment) => assignment.id !== assignmentId
        );
      }
    },
    clearAssignments: (state, action) => {
      const { classId } = action.payload;
      delete state[classId];
    },
  },
});

export const { setAssignments, addAssignment, removeAssignment, clearAssignments } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;

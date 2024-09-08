import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    instructors: {},
    students: {},
    loading: false,
    error: null,
};

const classPeopleSlice = createSlice({
    name: "classPeople",
    initialState,
    reducers: {
        setClassPeopleLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setClassPeopleSuccess: (state, action) => {
            const { classId, instructors, students } = action.payload;
            state.instructors[classId] = instructors;
            state.students[classId] = students;
            state.loading = false;
            state.error = null;
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
    },
});

export const {
    setClassPeopleLoading,
    setClassPeopleSuccess,
    setClassPeopleError,
    addInstructor,
    addStudent,
} = classPeopleSlice.actions;

export default classPeopleSlice.reducer;

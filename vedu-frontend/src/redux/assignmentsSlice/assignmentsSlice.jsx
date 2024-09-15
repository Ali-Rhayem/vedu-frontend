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

      if (!state[classId]) {
        state[classId] = {};
      }

      if (!state[classId][topicName]) {
        state[classId][topicName] = {
          id: assignment.topic_id,
          assignments: [],
        };
      }

      const topic = state[classId][topicName];
      const normalizedAssignment = {
        ...assignment,
        documents: Array.isArray(assignment.documents)
          ? assignment.documents
          : [assignment.documents],
      };

      const existingAssignmentIndex = topic.assignments.findIndex(
        (a) => a.id === assignment.id
      );

      if (existingAssignmentIndex >= 0) {
        topic.assignments[existingAssignmentIndex] = {
          ...topic.assignments[existingAssignmentIndex],
          ...normalizedAssignment,
        };
      } else {
        topic.assignments.push(normalizedAssignment);
      }
    },

    setAssignmentDetails: (state, action) => {
      const { classId, assignmentId, assignmentDetails } = action.payload;

      if (!state[classId]) {
        state[classId] = { assignmentDetails: {} };
      }
      if (!state[classId].assignmentDetails) {
        state[classId].assignmentDetails = {};
      }

      state[classId].assignmentDetails[assignmentId] = assignmentDetails;
    },

    removeAssignment: (state, action) => {
      const { classId, topicName, assignmentId } = action.payload;
      if (state[classId] && state[classId][topicName]) {
        state[classId][topicName].assignments = state[classId][
          topicName
        ].assignments.filter((assignment) => assignment.id !== assignmentId);
      }
    },
    clearAssignments: (state, action) => {
      const { classId } = action.payload;
      delete state[classId];
    },
    clearAllAssignments: (state) => {
      return {};
    },

    addSubmission: (state, action) => {
      const { classId, assignmentId, submission } = action.payload;
      const topics = state[classId];

      if (!topics) return;

      Object.keys(topics).forEach((topicName) => {
        const topic = topics[topicName];
        const assignmentIndex = topic.assignments.findIndex(
          (a) => a.id === parseInt(assignmentId)
        );

        if (assignmentIndex >= 0) {
          const assignment = topic.assignments[assignmentIndex];

          if (!Array.isArray(assignment.submissions)) {
            assignment.submissions = [];
          }

          assignment.submissions.push(submission);
          console.log(
            `Submission added to assignment ${assignmentId} in topic ${topicName}`
          );
        } else {
          console.log(
            `Assignment with ID ${assignmentId} not found in topic ${topicName}.`
          );
        }
      });
    },

    updateSubmissionGrade: (state, action) => {
      const { classId, assignmentId, submissionId, grade } = action.payload;
      const topics = state[classId];

      if (!topics) return;

      Object.keys(topics).forEach((topicName) => {
        const topic = topics[topicName];
        const assignmentIndex = topic.assignments.findIndex(
          (a) => a.id === parseInt(assignmentId)
        );

        if (assignmentIndex >= 0) {
          const assignment = topic.assignments[assignmentIndex];

          if (Array.isArray(assignment.submissions)) {
            const submissionIndex = assignment.submissions.findIndex(
              (s) => s.id === parseInt(submissionId)
            );

            if (submissionIndex >= 0) {
              assignment.submissions[submissionIndex].grade = grade;
              console.log(
                `Updated grade for submission ${submissionId} to ${grade}`
              );
            } else {
              console.log(
                `Submission with ID ${submissionId} not found in assignment ${assignmentId}`
              );
            }
          } else {
            console.log(`No submissions found for assignment ${assignmentId}`);
          }
        } else {
          console.log(
            `Assignment with ID ${assignmentId} not found in topic ${topicName}`
          );
        }
      });
    },
    removeSubmission: (state, action) => {
      const { classId, assignmentId, submissionId } = action.payload;
      const topics = state[classId];

      if (!topics) return;

      Object.keys(topics).forEach((topicName) => {
        const topic = topics[topicName];
        const assignmentIndex = topic.assignments.findIndex(
          (a) => a.id === parseInt(assignmentId)
        );

        if (assignmentIndex >= 0) {
          const assignment = topic.assignments[assignmentIndex];

          if (Array.isArray(assignment.submissions)) {
            assignment.submissions = assignment.submissions.filter(
              (submission) => submission.id !== parseInt(submissionId)
            );
            console.log(
              `Submission with ID ${submissionId} removed from assignment ${assignmentId}`
            );
          }
        }
      });
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  setAssignmentDetails,
  removeAssignment,
  clearAssignments,
  clearAllAssignments,
  addSubmission,
  updateSubmissionGrade,
  removeSubmission,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;

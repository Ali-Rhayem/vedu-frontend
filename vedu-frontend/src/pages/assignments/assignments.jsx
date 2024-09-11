import React from "react";
import "./assignments.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import Modal from "../addtopic/Modal";
import { useParams } from "react-router-dom";
import { useAssignments } from "./useAssignments";

function Assignments() {
  const { classId } = useParams();

  const {
    assignments,
    loading,
    course,
    newTopicName,
    setNewTopicName,
    showModal,
    handleAddTopicClick,
    handleModalClose,
    handleModalSubmit,
    handleViewDetails,
    handleViewSubmissions,
    handleCreateClick,
  } = useAssignments(classId);

  if (loading) {
    return <p>Loading assignments...</p>;
  }

  return (
    <div className="assignments-page">
      <Navbar />
      <div className="assignments-container">
        <Sidebar />
        <div className="content">
          <Tabs />
          <div className="assignments-content">
            <div className="assignments-header">
              <h3>Assignments</h3>
              {course.is_instructor_course && (
                <div className="action-buttons">
                  <button
                    className="add-topic-button"
                    onClick={handleAddTopicClick}
                  >
                    Add Topic
                  </button>
                  <button className="create-button" onClick={handleCreateClick}>
                    Create
                  </button>
                </div>
              )}
            </div>

            {Object.keys(assignments).length > 0 ? (
              Object.keys(assignments).map((topicName) => {
                const topic = assignments[topicName];
                return (
                  <div className="assignment-topic" key={topic.id}>
                    <h4>{topicName}</h4>

                    {Array.isArray(topic.assignments) &&
                    topic.assignments.length > 0 ? (
                      topic.assignments.map((assignment) => (
                        <div className="assignment-item" key={assignment.id}>
                          <div className="assignment-icon"></div>
                          <div className="assignment-details">
                            <span>{assignment.title}</span>
                            <div className="due-date">
                              {new Date(
                                assignment.due_date
                              ).toLocaleDateString()}
                            </div>
                          </div>
                          <button
                            className="view-details-button"
                            onClick={() => handleViewDetails(assignment.id)}
                          >
                            View Details
                          </button>
                          {course.is_instructor_course && (
                            <button
                              className="view-submissions-button"
                              onClick={() =>
                                handleViewSubmissions(assignment.id)
                              }
                            >
                              View Submissions
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p>No assignments available for this topic.</p>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No topics or assignments found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for adding topics */}
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      >
        <h3>Add Topic</h3>
        <div className="input-topic">
          <input
            type="text"
            placeholder="Enter topic name"
            value={newTopicName}
            onChange={(e) => setNewTopicName(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Assignments;

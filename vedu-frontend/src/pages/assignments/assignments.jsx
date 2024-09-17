import React, { useEffect, useState } from "react";
import "./assignments.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import Modal from "../addtopic/Modal";
import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate for navigation
import { useAssignments } from "./useAssignments";

function Assignments() {
  const { classId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null); // State for tracking which dropdown is visible

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <p>Loading assignments...</p>;
  }

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const toggleDropdown = (assignmentId) => {
    setDropdownVisible((prev) => (prev === assignmentId ? null : assignmentId));
  };

  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".assignment-dropdown") &&
      !event.target.closest(".dropdown-toggle")
    ) {
      setDropdownVisible(null);
    }
  };

  const handleAssignmentClick = (assignmentId) => {
    navigate(`/assignments/${assignmentId}`); 
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation(); 
  };

  return (
    <div className="assignments-page">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="assignments-container">
        <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />
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
                        <div
                          className="assignment-item"
                          key={assignment.id}
                          onClick={() => handleViewDetails(assignment.id)}
                        >
                          <div className="assignment-icon">
                            <i className="fas fa-clipboard"></i>
                          </div>
                          <div className="assignment-details">
                            <span>{assignment.title}</span>
                            <div className="due-date">
                              {new Date(
                                assignment.due_date
                              ).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="dropdown-wrapper">
                            <button
                              className="dropdown-toggle"
                              onClick={(e) => {
                                handleDropdownClick(e);
                                toggleDropdown(assignment.id);
                              }}
                            >
                              &#8942;
                            </button>
                            {dropdownVisible === assignment.id && (
                              <div className="assignment-dropdown">
                                <ul>
                                  <li
                                    onClick={(e) => {
                                      handleDropdownClick(e);
                                      handleViewDetails(assignment.id);
                                    }}
                                  >
                                    View Details
                                  </li>
                                  {course.is_instructor_course && (
                                    <li
                                      onClick={(e) => {
                                        handleDropdownClick(e);
                                        handleViewSubmissions(assignment.id);
                                      }}
                                    >
                                      View Submissions
                                    </li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
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

import React, { useEffect, useState } from "react";
import "./assignments.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import Modal from "../addtopic/Modal";
import { useParams, useNavigate } from "react-router-dom";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";

function Assignments() {
  const { classId } = useParams();
  const [topics, setTopics] = useState({});
  const [isInstructor, setIsInstructor] = useState(false);
  const [newTopicName, setNewTopicName] = useState(""); 
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDataAndCheckInstructor = async () => {
      try {
        const userData = await requestApi({
          route: "/api/user",
          requestMethod: RequestMethods.GET,
          navigationFunction: navigate,
        });

        if (userData && userData.id) {
          const userId = userData.id;

          const result = await requestApi({
            route: `/api/courses/${userId}/is-instructor/${classId}`,
            requestMethod: RequestMethods.GET,
            navigationFunction: navigate,
          });

          if (result) {
            setIsInstructor(result.is_instructor);
          }
        }
      } catch (error) {
        console.error("Error fetching user data or checking instructor status:", error);
      }
    };

    fetchUserDataAndCheckInstructor();
  }, [classId, navigate]);

  useEffect(() => {
    const fetchAssignmentsByTopic = async () => {
      const data = await requestApi({
        route: `/api/assignments/course/${classId}/by-topic`,
        requestMethod: RequestMethods.GET,
        navigationFunction: navigate,
      });

      console.log("Assignments by topic:", data);

      if (data) {
        setTopics(data.topics);
      }
    };

    fetchAssignmentsByTopic();
  }, [classId, navigate]);

  const handleViewDetails = (assignmentId) => {
    navigate(`/class/${classId}/assignments/${assignmentId}`);
  };

  const handleViewSubmissions = (assignmentId) => {
    navigate(`/class/${classId}/assignments/${assignmentId}/submissions`);
  };

  const handleCreateClick = () => {
    navigate(`/class/${classId}/add-assignment`);
  };

  const handleAddTopicClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = async () => {
    if (newTopicName.trim() === "") return;

    try {
      const newTopic = { name: newTopicName, course_id: classId };
      const response = await requestApi({
        route: "/api/topic",
        requestMethod: RequestMethods.POST,
        body: newTopic,
        navigationFunction: navigate,
      });

      setTopics((prevTopics) => ({
        ...prevTopics,
        [response.topic.name]: [],
      }));

      setNewTopicName(""); 
      setShowModal(false); 
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  return (
    <div className="assignments-page">
      <Sidebar />
      <div className="assignments-container">
        <Navbar />
        <div className="content">
          <Tabs />
          <div className="assignments-content">
            <div className="assignments-header">
              <h3>Assignments</h3>
              {isInstructor && (
                <div className="action-buttons">
                  <button className="add-topic-button" onClick={handleAddTopicClick}>
                    Add Topic
                  </button>
                  <button className="create-button" onClick={handleCreateClick}>
                    Create
                  </button>
                </div>
              )}
            </div>

            {Object.keys(topics).length > 0 ? (
              Object.keys(topics).map((topicName) => (
                <div className="assignment-topic" key={topicName}>
                  <h4>{topicName}</h4>
                  {topics[topicName].map((assignment) => (
                    <div className="assignment-item" key={assignment.id}>
                      <div className="assignment-icon"></div>
                      <div className="assignment-details">
                        <span>{assignment.title}</span>
                        <span>{assignment.description}</span>
                      </div>
                      <div className="due-date">
                        {new Date(assignment.due_date).toLocaleDateString()}
                      </div>
                      <button
                        className="view-details-button"
                        onClick={() => handleViewDetails(assignment.id)}
                      >
                        View Details
                      </button>
                      {isInstructor && (
                        <button
                          className="view-submissions-button"
                          onClick={() => handleViewSubmissions(assignment.id)}
                        >
                          View Submissions
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No topics or assignments found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for adding a new topic */}
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

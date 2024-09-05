import React, { useEffect, useState } from "react";
import "./assignments.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import Modal from "../addtopic/Modal";
import { useParams, useNavigate } from "react-router-dom";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "../../redux/assignmentsSlice/assignmentsSlice";

function Assignments() {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const assignments = useSelector((state) => state.assignments[classId]) || {};
  const [newTopicName, setNewTopicName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const course = useSelector((state) =>
    state.courses.courses.find((course) => course.id === parseInt(classId))
  );

  useEffect(() => {
    const fetchAssignmentsByTopic = async () => {
      try {
        const data = await requestApi({
          route: `/api/assignments/course/${classId}/by-topic`,
          requestMethod: RequestMethods.GET,
          navigationFunction: navigate,
        });

        if (data) {
          dispatch(setAssignments({ classId, topics: data.topics }));
          console.log("Assignments by topic:", data);
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignmentsByTopic();
  }, [classId, dispatch, navigate]);

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

      dispatch(
        setAssignments({
          classId,
          topics: { ...assignments, [response.topic.name]: [] },
        })
      );
      console.log("New topic added:", response.topic);

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
              Object.keys(assignments).map((topicName) => (
                <div className="assignment-topic" key={topicName}>
                  <h4>{topicName}</h4>
                  {assignments[topicName].map((assignment) => (
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
                      {course.is_instructor_course && (
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

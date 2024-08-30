import React, { useEffect, useState } from "react";
import "./assignments.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import { useParams, useNavigate } from "react-router-dom";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";

function Assignments() {
  const { classId } = useParams();
  const [topics, setTopics] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignmentsByTopic = async () => {
      const data = await requestApi({
        route: `/api/assignments/course/${classId}/by-topic`,
        requestMethod: RequestMethods.GET,
        navigationFunction: navigate,
      });

      if (data) {
        setTopics(data.topics);
      }
    };

    fetchAssignmentsByTopic();
  }, [classId, navigate]);

  const handleViewDetails = (assignmentId) => {
    navigate(`/class/${classId}/assignments/${assignmentId}`);
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
              <div className="action-buttons">
                <button className="add-topic-button">Add Topic</button>
                <button className="create-button">Create</button>
              </div>
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
    </div>
  );
}

export default Assignments;

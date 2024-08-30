import React, { useEffect, useState } from "react";
import "./assignments.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import { useParams } from "react-router-dom";
import axios from "axios";

function Assignments() {
  const { classId } = useParams();
  const [topics, setTopics] = useState({});

  useEffect(() => {
    const fetchAssignmentsByTopic = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/assignments/course/${classId}/by-topic`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setTopics(response.data.topics);
      } catch (error) {
        console.error("Error fetching assignments by topic:", error);
      }
    };

    fetchAssignmentsByTopic();
  }, [classId]);

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

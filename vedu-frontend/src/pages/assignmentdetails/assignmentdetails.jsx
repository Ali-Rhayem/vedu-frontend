import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import axios from "axios";
import "./assignmentdetails.css";

function AssignmentDetailsPage() {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/assignments/${assignmentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setAssignment(response.data.assignment);
      } catch (error) {
        console.error("Error fetching assignment details:", error);
      }
    };

    fetchAssignmentDetails();
  }, [assignmentId]);

  if (!assignment) {
    return <p>Loading...</p>;
  }

  return (
    <div className="assignment-details-page">
      <Sidebar />
      <div className="assignment-details-container">
        <Navbar />
        <div className="content">
          <Tabs />
          <div className="assignment-content">
            <div className="assignment-details-ad">
              <h3>{assignment.title}</h3>
              <div className="attachment">
                <button className="attachment-button">View Attachment</button>
              </div>
              <p className="description">{assignment.description}</p>
            </div>

            <div className="your-work">
              <h4>Your Work</h4>
              <div className="work-actions">
                <button className="add-work-button">+ Add Work</button>
                <button className="mark-done-button">✔ Mark Done</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentDetailsPage;

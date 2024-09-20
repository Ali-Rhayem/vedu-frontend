import React, { useState } from "react";
import "./submissions.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSubmissions } from "./usesubmissions.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Submissions() {
  const { assignmentId, classId } = useParams();
  const assignments = useSelector((state) => state.assignments[classId]) || {};
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const currentAssignment = Object.keys(assignments)
    .flatMap((topicName) => assignments[topicName].assignments)
    .find((assignment) => assignment.id === parseInt(assignmentId));

  const [updatedSubmissions, setUpdatedSubmissions] = useState(
    currentAssignment?.submissions || []
  );

  console.log("Updated Submissions:", updatedSubmissions);
  const { handleDownload, handleGradeChange, handleSaveGrade } =
    useSubmissions();

  console.log("Current Assignment from Redux:", currentAssignment);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <div className="submissions-page">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="submissions-container">
        <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />
        <div className="content">
          <Tabs />
          <div className="submissions-content">
            <h3>
              {currentAssignment
                ? currentAssignment.title
                : `Assignment ${assignmentId}`}
            </h3>
            {updatedSubmissions.map((submission) => (
              <div className="submission-item" key={submission.id}>
                <div className="submission-header">
                  <div className="student-info">
                    <div className="student-avatar">
                      <img
                        src={
                          submission.student.profile_image
                            ? `http://127.0.0.1:8000/${submission.student.profile_image}`
                            : "/assets/images/defaultpfp.jpg"
                        }
                        alt={`${submission.student.name}'s avatar`}
                        className="user-avatar"
                      />
                    </div>
                    <div className="student-name">
                      {submission.student.name}
                    </div>
                  </div>
                  <div className="download-section">
                    <a
                      className="download-icon"
                      onClick={() =>
                        handleDownload(submission.id, submission.file_url)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon"
                        width="24"
                        height="24"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="submission-body">
                  <div className="grade-section">
                    <label>Grade:</label>
                    <input
                      type="number"
                      placeholder="Enter grade"
                      value={submission.grade || ""}
                      onChange={(e) =>
                        handleGradeChange(
                          e,
                          submission.id,
                          currentAssignment,
                          setUpdatedSubmissions
                        )
                      }
                    />
                    <span>
                      /{currentAssignment ? currentAssignment.grade : "100"}
                    </span>
                    <button
                      className="save-grade-button"
                      onClick={() =>
                        handleSaveGrade(
                          submission.id,
                          submission.grade,
                          assignmentId,
                          classId
                        )
                      }
                    >
                      Save Grade
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Submissions;

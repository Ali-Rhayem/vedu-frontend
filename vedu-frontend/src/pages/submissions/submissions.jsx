import React from "react";
import "./submissions.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";

function Submissions() {
  return (
    <div className="submissions-page">
      <Sidebar />
      <div className="submissions-container">
        <Navbar />
        <div className="content">
          <Tabs />
          <div className="submissions-content">
            <h3>Assignment 1</h3>
            <div className="submission-item">
              <div className="submission-header">
                <div className="student-info">
                  <div className="student-avatar"></div>
                  <div className="student-name">Ali Rhayem</div>
                </div>
              </div>

              <div className="submission-body">
                <div className="download-section">
                  <button className="download-button">
                    <i className="fas fa-download"></i> Download Submission
                  </button>
                </div>
                <div className="grade-section">
                  <label>Grade:</label>
                  <input type="text" placeholder="Enter grade" />
                  <span>/100</span>
                  <button className="save-grade-button">Save Grade</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Submissions;

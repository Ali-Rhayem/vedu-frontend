import React from "react";
import "./assignments.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";

function Assignments() {
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

            <div className="assignment-topic">
              <h4>Topic</h4>
              <div className="assignment-item">
                <div className="assignment-icon"></div>
                <div className="assignment-details">
                  <span>Assignment Title</span>
                  <span>Description</span>
                </div>
                <div className="due-date">Due date</div>
              </div>
              <div className="assignment-item">
                <div className="assignment-icon"></div>
                <div className="assignment-details">
                  <span>Assignment Title</span>
                  <span>Description</span>
                </div>
                <div className="due-date">Due date</div>
              </div>
              {/* Repeat for additional assignments */}
            </div>

            <div className="assignment-topic">
              <h4>Topic</h4>
              <div className="assignment-item">
                <div className="assignment-icon"></div>
                <div className="assignment-details">
                  <span>Assignment Title</span>
                  <span>Description</span>
                </div>
                <div className="due-date">Due date</div>
              </div>
              <div className="assignment-item">
                <div className="assignment-icon"></div>
                <div className="assignment-details">
                  <span>Assignment Title</span>
                  <span>Description</span>
                </div>
                <div className="due-date">Due date</div>
              </div>
              {/* Repeat for additional assignments */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assignments;

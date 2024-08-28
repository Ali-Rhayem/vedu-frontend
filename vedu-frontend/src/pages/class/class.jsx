import React from "react";
import "./class.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

function Class() {
  return (
    <div className="class-page">
      <Sidebar/>
      <div className="Container">
        <Navbar />
        <div className="content">
          <div className="class-tabs">
            <a href="#" className="active">
              Stream
            </a>
            <a href="#">Classwork</a>
            <a href="#">Assignments</a>
            <a href="#">Chats</a>
            <a href="#">People</a>
          </div>

          <div className="class-header">
            <h3>Class 1</h3>
            <p>Description of Class 1</p>
          </div>

          <div className="class-actions">
            <button className="join-button">Join Meeting</button>
            <button className="announce-button">Announce</button>
          </div>

          <div className="stream">
            <div className="stream-item">
              <div className="stream-icon">
                <i className="fas fa-clipboard"></i>
              </div>
              <div className="stream-content">
                <p>Teacher posted a new assignment</p>
                <button className="view-button">View</button>
              </div>
            </div>

            <div className="stream-item">
              <div className="stream-icon">
                <i className="fas fa-clipboard"></i>
              </div>
              <div className="stream-content">
                <p>Teacher posted a new assignment</p>
                <button className="view-button">View</button>
              </div>
            </div>

            {/* More stream items can go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Class;

import React from "react";
import "./classpeople.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";

function ClassPeople() {
  return (
    <div className="people-page">
      <Sidebar />
      <div className="people-page-container">
        <Navbar />
        <div className="content">
          <Tabs />
          <div className="people-content">
            <h3>Teachers</h3>
            <div className="people-section teachers">
              <div className="person-item">
                <div className="person-icon"></div>
                <div className="person-details">
                  <span>Ali Rhayem</span>
                </div>
              </div>
              <div className="person-item">
                <div className="person-icon"></div>
                <div className="person-details">
                  <span>Ali Rhayem</span>
                </div>
              </div>
            </div>

            <h3>Students</h3>
            <div className="people-section students">
              <div className="person-item">
                <div className="person-icon"></div>
                <div className="person-details">
                  <span>Ali Rhayem</span>
                </div>
              </div>
              <div className="person-item">
                <div className="person-icon"></div>
                <div className="person-details">
                  <span>Ali Rhayem</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassPeople;

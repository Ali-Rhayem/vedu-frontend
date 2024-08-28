import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="container">
        <div className="content">
          <div className="actions">
            <button className="join-button">Join</button>
            <button className="create-button">Create</button>
          </div>
          <div className="classes">
            <h3>Student Courses</h3>
            <h3>Instructor Courses</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

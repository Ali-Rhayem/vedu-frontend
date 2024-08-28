import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

function Home() {
  return (
    <div className="home-page">
      <Sidebar />
      <div className="container">
        <Navbar />
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

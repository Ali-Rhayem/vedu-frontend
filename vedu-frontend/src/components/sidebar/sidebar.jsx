import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./sidebar.css";

const Sidebar = () => {
  const courses = useSelector((state) => state.courses.courses);
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/class/${courseId}`);
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <div className="sidebar">
      <h2>VEDU</h2>
      <ul>
        <li>
          <a className="home" onClick={handleHomeClick}>Home</a>
        </li>
        <li className="active">
          <a href="/classes">Classes</a>
        </li>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <li key={`course-${index}-${course.id}`} onClick={() => handleCourseClick(course.id)}>
              <span>{course.name}</span>
            </li>
          ))
        ) : (
          <li>No courses available</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;

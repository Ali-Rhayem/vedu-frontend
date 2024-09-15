import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./sidebar.css";

const Sidebar = ({ isVisible, closeSidebar }) => {
  const courses = useSelector((state) => state.courses.courses);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCourseClick = (courseId) => {
    closeSidebar();
    navigate(`/class/${courseId}`);
  };

  const handleHomeClick = () => {
    closeSidebar();
    navigate("/home");
  };

  const isCourseActive = (courseId) => {
    return location.pathname.startsWith(`/class/${courseId}`);
  };

  return (
    <div className={`sidebar ${isVisible ? "visible" : ""}`}>
      <ul>
        <li className={location.pathname === "/home" ? "active" : ""} onClick={handleHomeClick}>
          <span className="home">Home</span>
        </li>

        {courses.length > 0 ? (
          courses.map((course) => (
            <li key={course.id} onClick={() => handleCourseClick(course.id)} className={isCourseActive(course.id) ? "active" : ""}>
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

export default React.memo(Sidebar);

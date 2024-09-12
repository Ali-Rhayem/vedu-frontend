import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./sidebar.css";

const Sidebar = () => {
  const courses = useSelector((state) => state.courses.courses);
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleCourseClick = (courseId) => {
    navigate(`/class/${courseId}`);
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  const isCourseActive = (courseId) => {
    return location.pathname.startsWith(`/class/${courseId}`);
  };  

  return (
    <div className="sidebar">
      <ul>
        <li 
          className={location.pathname === "/home" ? "active" : ""}
          onClick={handleHomeClick}
        >
          <span className="home">Home</span>
        </li>
        
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <li 
              key={`course-${index}-${course.id}`} 
              onClick={() => handleCourseClick(course.id)}
              className={isCourseActive(course.id) ? "active" : ""}
            >
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

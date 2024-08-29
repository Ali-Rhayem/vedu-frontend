import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(
          response.data.student_courses.concat(response.data.instructor_courses)
        );
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [token]);

  const handleCourseClick = (courseId) => {
    navigate(`/class/${courseId}`);
  };

  const handleHomeClick = () =>{
    navigate('/home');
  }

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
          courses.map((course) => (
            <li key={course.id} onClick={() => handleCourseClick(course.id)}>
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

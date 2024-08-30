import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";

const Sidebar = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await requestApi({
          route: "/api/user/courses",
          requestMethod: RequestMethods.GET,
          navigationFunction: navigate, 
        });

        setCourses(data.student_courses.concat(data.instructor_courses));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [token, navigate]);

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

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./sidebar.css";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { setCourses } from "../../redux/coursesSlice/coursesSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      if (courses.length === 0) {
        try {
          const data = await requestApi({
            route: "/api/user/courses",
            requestMethod: RequestMethods.GET,
            navigationFunction: navigate,
          });

          dispatch(setCourses(data.student_courses.concat(data.instructor_courses)));
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      }
    };

    fetchCourses();
  }, [dispatch, navigate, courses]);

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

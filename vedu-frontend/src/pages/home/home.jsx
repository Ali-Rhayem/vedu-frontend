import React, { useEffect, useState } from "react";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState({
    student_courses: [],
    instructor_courses: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/courses",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses");
        setLoading(false);
      }
    };
    fetchCourses();
  }, [isAuthenticated, navigate]);

  const handleViewDetails = (courseId) => {
    navigate(`/class/${courseId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-page">
      <Sidebar />
      <div className="home-container">
        <Navbar />
        <div className="content">
          <div className="actions">
            <button className="join-button">Join</button>
            <button className="create-button">Create</button>
          </div>
          <div className="classes">
            <h3>Student Courses</h3>
            {courses.student_courses.length > 0 ? (
              courses.student_courses.map((course) => (
                <div key={course.id} className="class-card">
                  <h4>{course.name}</h4>
                  <p>{course.description}</p>
                  <div className="class-info">
                    <span>
                      Instructor(s):{" "}
                      {(course.instructors || [])
                        .map((inst) => inst.name)
                        .join(", ")}
                    </span>
                  </div>
                  <button
                    className="details-button"
                    onClick={() => handleViewDetails(course.id)}
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p>No student courses available.</p>
            )}
            <h3>Instructor Courses</h3>
            {courses.instructor_courses.length > 0 ? (
              courses.instructor_courses.map((course) => (
                <div key={course.id} className="class-card">
                  <h4>{course.name}</h4>
                  <p>{course.description}</p>
                  <div className="class-info">
                    <span>Participants: {(course.students || []).length}</span>
                  </div>
                  <button
                    className="details-button"
                    onClick={() => handleViewDetails(course.id)}
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p>No instructor courses available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

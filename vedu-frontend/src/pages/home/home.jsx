import React, { useEffect, useState } from "react";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useDispatch, useSelector } from "react-redux";
import JoinClass from "../joinclass/joinclass";  
import { setUser } from "../../redux/userSlice/userSlice";

function Home() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const [courses, setCourses] = useState({
    student_courses: [],
    instructor_courses: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classCode, setClassCode] = useState(""); 
  const [joinError, setJoinError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    if (!userData) {
      const fetchUserData = async () => {
        try {
          const data = await requestApi({
            route: "/api/user",
            requestMethod: RequestMethods.GET,
            navigationFunction: navigate,
          });
          
          dispatch(setUser(data));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userData, dispatch]);

  const fetchCourses = async () => {
    try {
      const data = await requestApi({
        route: "/api/user/courses",
        requestMethod: RequestMethods.GET,
        navigationFunction: navigate,
      });

      setCourses(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch courses");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [navigate]);

  const handleViewDetails = (courseId) => {
    navigate(`/class/${courseId}`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setJoinError(null);
    setClassCode("");
  };

  const handleJoinClass = async () => {
    try {
      const userId = userData.id;

      const response = await requestApi({
        route: "/api/courses/join",
        requestMethod: RequestMethods.POST,
        body: {
          class_code: classCode,
          student_id: userId,
        },
        navigationFunction: navigate,
      });

      if (response && response.message === "Successfully joined the class") {
        alert("Successfully joined the class!");
        fetchCourses(); 
        closeModal();
        setClassCode(""); 
      }
    } catch (err) {
      setJoinError("Failed to join class: " + err.message);
    }
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
            <button className="join-button" onClick={openModal}>
              Join
            </button>
            <button className="create-button">Create</button>
          </div>
          <JoinClass isOpen={isModalOpen} onClose={closeModal} onSubmit={handleJoinClass}>
            <h3>Join class</h3>
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              placeholder="Enter class code"
              className="input-topic"
            />
            {joinError && <p className="error-message">{joinError}</p>}
          </JoinClass>
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

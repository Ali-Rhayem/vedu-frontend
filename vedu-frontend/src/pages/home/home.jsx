import React, { useEffect, useState } from "react";
import "./home.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useDispatch, useSelector } from "react-redux";
import JoinClass from "../joinclass/joinclass";
import CreateClass from "../createclass/createclass";
import {
  setCourses,
  addCourse,
  resetCourses,
} from "../../redux/coursesSlice/coursesSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);
  const courses = useSelector((state) => state.courses.courses) || [];
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [classToEdit, setClassToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [classCode, setClassCode] = useState("");
  const [joinError, setJoinError] = useState(null);

  console.log("Courses", courses);

  const fetchCourses = async () => {
    try {
      const data = await requestApi({
        route: "/api/user/courses",
        requestMethod: RequestMethods.GET,
        navigationFunction: navigate,
      });

      const combinedCourses = [
        ...(data.student_courses || []).map((course) => ({
          ...course,
          is_student_course: true,
        })),
        ...(data.instructor_courses || []).map((course) => ({
          ...course,
          is_instructor_course: true,
        })),
      ];

      dispatch(setCourses(combinedCourses));
    } catch (err) {
      setError("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [dispatch, navigate]);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const handleViewDetails = (courseId) => {
    navigate(`/class/${courseId}`);
  };

  const openJoinModal = () => {
    setIsJoinModalOpen(true);
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
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

        const updatedCourses = [
          ...courses,
          { ...response.course, is_student_course: true },
        ];
        dispatch(setCourses(updatedCourses));

        await fetchCourses();

        closeJoinModal();
        setClassCode("");
      }
    } catch (err) {
      if (err.status === 409) {
        setJoinError(err.response.data.message);
      } else {
        console.error("Failed to join class:", err);
        setJoinError("Failed to join class. Please try again.");
      }
    }
  };

  const openCreateModal = () => {
    setClassToEdit(null);
    setIsCreateModalOpen(true);
  };

  const openEditModal = (course) => {
    setClassToEdit(course);
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateOrUpdateClass = async (classData, classId = null) => {
    try {
      if (classId) {
        const response = await requestApi({
          route: `/api/courses/${classId}`,
          requestMethod: RequestMethods.PUT,
          body: {
            ...classData,
            owner_id: userData.id,
          },
          navigationFunction: navigate,
        });

        if (response && response.course) {
          const updatedCourses = courses.map((course) =>
            course.id === classId
              ? { ...response.course, is_instructor_course: true }
              : course
          );
          dispatch(setCourses(updatedCourses));
        }
      } else {
        const response = await requestApi({
          route: "/api/courses",
          requestMethod: RequestMethods.POST,
          body: {
            ...classData,
            owner_id: userData.id,
          },
          navigationFunction: navigate,
        });

        if (response && response.course) {
          dispatch(
            addCourse({ ...response.course, is_instructor_course: true })
          );

          await requestApi({
            route: "api/course-instructor",
            requestMethod: RequestMethods.POST,
            body: {
              course_id: response.course.id,
              instructor_id: userData.id,
            },
            navigationFunction: navigate,
          });

          alert(`Class ${response.course.name} created successfully!`);
        }
      }
      closeCreateModal();
    } catch (err) {
      console.error("Failed to create or update class:", err);
    }
  };

  const toggleDropdown = (courseId) => {
    setDropdownVisible(dropdownVisible === courseId ? null : courseId);
  };

  const handleDeleteClass = async (courseId) => {
    try {
      await requestApi({
        route: `/api/courses/${courseId}`,
        requestMethod: RequestMethods.DELETE,
        navigationFunction: navigate,
      });

      const updatedCourses = courses.filter((course) => course.id !== courseId);
      dispatch(setCourses(updatedCourses));

      alert(`Class ${courseId} deleted successfully!`);
    } catch (err) {
      console.error("Failed to delete class:", err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  const instructorCourses = courses.filter(
    (course) => course.is_instructor_course
  );
  const studentCourses = courses.filter((course) => course.is_student_course);

  return (
    <div className="home-page">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="home-container">
        <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />
        <div className="content">
          <div className="actions">
            <button className="join-button-home" onClick={openJoinModal}>
              Join
            </button>
            <button className="create-button-home" onClick={openCreateModal}>
              Create
            </button>
          </div>
          <JoinClass
            isOpen={isJoinModalOpen}
            onClose={closeJoinModal}
            onSubmit={handleJoinClass}
            error={joinError}
          >
            <h3>Join class</h3>
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              placeholder="Enter class code"
              className="input-topic-joinclass"
            />
          </JoinClass>
          <CreateClass
            isOpen={isCreateModalOpen}
            onClose={closeCreateModal}
            onSubmit={handleCreateOrUpdateClass}
            classToEdit={classToEdit} 
          />
          <div className="classes">
            <h3>Instructor Courses</h3>
            {instructorCourses.length > 0 ? (
              instructorCourses.map((course) => (
                <div key={course.id} className="class-card">
                  <div className="class-card-header">
                    <h4>{course.name}</h4>
                    {course.owner_id === userData.id && (
                      <div className="dropdown-wrapper">
                        <button
                          className="dropdown-toggle"
                          onClick={() => toggleDropdown(course.id)}
                        >
                          &#8942;
                        </button>
                        {dropdownVisible === course.id && (
                          <div className="class-dropdown">
                            <ul>
                              <li onClick={() => openEditModal(course)}>
                                Edit
                              </li>
                              <li className="delete-dropdown" onClick={() => handleDeleteClass(course.id)}>
                                Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <p>{course.description}</p>
                  <div className="class-info"></div>
                  <div className="db-button">
                    <button
                      className="details-button"
                      onClick={() => handleViewDetails(course.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No instructor courses available.</p>
            )}
            <h3>Student Courses</h3>
            {studentCourses.length > 0 ? (
              studentCourses.map((course) => (
                <div key={course.id} className="class-card">
                  <h4>{course.name}</h4>
                  <p>{course.description}</p>
                  <div className="db-button">
                    <button
                      className="details-button"
                      onClick={() => handleViewDetails(course.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No student courses available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

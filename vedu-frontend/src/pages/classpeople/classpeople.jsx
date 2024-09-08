import React, { useEffect, useState, useCallback, useDebugValue } from "react";
import "./classpeople.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import { useParams } from "react-router-dom";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice/userSlice";
import AddPersonModal from "../addpersonmodal/addpersonmodal";
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  setClassPeopleLoading,
  setClassPeopleSuccess,
  setClassPeopleError,
  addInstructor,
  addStudent,
} from "../../redux/classPeopleSlice";

function ClassPeople() {
  const { classId } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const [modalType, setModalType] = useState(null);
  const courses = useSelector((state) => state.courses.courses) || [];
  const [modalError, setModalError] = useState("");
  const current_class = courses.find(
    (course) => course.id === parseInt(classId)
  );

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const { instructors, students, loading, error } = useSelector((state) => ({
    instructors: state.classPeople.instructors[classId] || [],
    students: state.classPeople.students[classId] || [],
    loading: state.classPeople.loading,
    error: state.classPeople.error,
  }));

  useEffect(() => {
    if (current_class && userData && current_class.owner_id === userData.id) {
      setIsOwner(true);
    }
  }, [current_class, userData]);

  useEffect(() => {
    if (!userData) {
      const fetchUserData = async () => {
        try {
          const data = await requestApi({
            route: "/api/user",
            requestMethod: RequestMethods.GET,
          });
          dispatch(setUser(data));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (!instructors.length || !students.length) {
      const fetchClassPeople = async () => {
        try {
          dispatch(setClassPeopleLoading());
          const courseData = await requestApi({
            route: `/api/courses/${classId}`,
            requestMethod: RequestMethods.GET,
          });

          if (userData && userData.id === courseData.course.owner_id) {
            setIsOwner(true);
          }

          const instructorsData = await requestApi({
            route: `/api/course-instructor/course/${classId}/instructors`,
            requestMethod: RequestMethods.GET,
          });

          const studentsData = await requestApi({
            route: `/api/course-student/course/${classId}/students`,
            requestMethod: RequestMethods.GET,
          });

          dispatch(
            setClassPeopleSuccess({
              classId,
              instructors: instructorsData,
              students: studentsData,
            })
          );
        } catch (err) {
          dispatch(setClassPeopleError("Failed to fetch class people"));
        }
      };

      fetchClassPeople();
    }
  }, [classId, userData, dispatch, instructors.length, students.length]);

  const handleAddPerson = async (email) => {
    try {
      const userIdResponse = await requestApi({
        route: "/api/get-user-id",
        requestMethod: RequestMethods.POST,
        body: { email },
      });

      if (!userIdResponse || !userIdResponse.user_id) {
        setModalError("User not found");
        return;
      }

      const userId = userIdResponse.user_id;

      const route =
        modalType === "Instructor"
          ? "/api/course-instructor"
          : "/api/course-student";
      const body = {
        course_id: classId,
        [`${modalType.toLowerCase()}_id`]: userId,
      };

      await requestApi({
        route,
        requestMethod: RequestMethods.POST,
        body,
      });

      const instructorsData = await requestApi({
        route: `/api/course-instructor/course/${classId}/instructors`,
        requestMethod: RequestMethods.GET,
      });

      const studentsData = await requestApi({
        route: `/api/course-student/course/${classId}/students`,
        requestMethod: RequestMethods.GET,
      });

      if (modalType === "Instructor") {
        const newInstructor = instructorsData.find(
          (instructor) => instructor.instructor_id === userId
        );
        if (newInstructor) {
          dispatch(
            addInstructor({
              classId,
              instructor: newInstructor,
            })
          );
        }
      } else {
        const newStudent = studentsData.find(
          (student) => student.student_id === userId
        );
        if (newStudent) {
          dispatch(
            addStudent({
              classId,
              student: newStudent,
            })
          );
        }
      }

      setModalError("");
      setModalType(null);
    } catch (err) {
      if (err.status === 409) {
        setModalError(err.response.data.message);
      } else {
        setModalError(err.response.data.error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="people-page">
      <Sidebar />
      <div className="people-page-container">
        <Navbar />
        <div className="content">
          <Tabs />
          <div className="people-content">
            <div className="teachers-div">
              <h3>Teachers</h3>
              {isOwner && (
                <button
                  className="add-person-button"
                  onClick={() => setModalType("Instructor")}
                >
                  <i className="fas fa-user-plus"></i>
                </button>
              )}
            </div>
            <div className="people-section teachers">
              {instructors.length > 0 ? (
                instructors.map((instructor) => {
                  const instructorData = instructor?.instructor;
                  if (!instructorData) {
                    return null;
                  }

                  return (
                    <div className="person-item" key={instructor.id}>
                      <div className="person-icon">
                        <img
                          src={
                            instructorData.profile_image
                              ? `http://127.0.0.1:8000/${instructorData.profile_image}`
                              : "/path-to-default-image/default-profile.png" 
                          }
                          alt={`${instructorData.name}'s profile`}
                          className="person-image"
                        />
                      </div>
                      <div className="person-details">
                        <span>{instructorData.name}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No instructors found</p>
              )}
            </div>

            <div className="students-div">
              <h3>Students</h3>
              {isOwner && (
                <button
                  className="add-person-button"
                  onClick={() => setModalType("Student")}
                >
                  <i className="fas fa-user-plus"></i>{" "}
                </button>
              )}
            </div>
            <div className="people-section students">
              {students.length > 0 ? (
                students.map((student) => (
                  <div className="person-item" key={student.id}>
                    <div className="person-icon">
                      <img
                        src={`http://127.0.0.1:8000/${student.student.profile_image}`}
                        alt={`${student.student.name}'s profile`}
                        className="person-image"
                      />
                    </div>
                    <div className="person-details">
                      <span>{student.student.name}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No students found</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {modalType && (
        <AddPersonModal
          type={modalType}
          onClose={() => {
            setModalType(null);
            setModalError("");
          }}
          onSubmit={handleAddPerson}
          error={modalError}
          setModalError={setModalError} 
        />
      )}
    </div>
  );
}

export default ClassPeople;

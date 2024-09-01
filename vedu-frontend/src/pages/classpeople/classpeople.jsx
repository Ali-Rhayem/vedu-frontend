import React, { useEffect, useState } from "react";
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

function ClassPeople() {
  const { classId } = useParams();
  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [modalType, setModalType] = useState(null); 

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

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
    const fetchClassPeople = async () => {
      try {
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

        setInstructors(instructorsData);
        setStudents(studentsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch class people");
        setLoading(false);
      }
    };

    if (userData) {
      fetchClassPeople();
    }
  }, [classId, userData]);

  const handleAddPerson = async (email) => {
    try {
      const userIdResponse = await requestApi({
        route: "/api/get-user-id",
        requestMethod: RequestMethods.POST,
        body: { email },
      });
  
      if (!userIdResponse || !userIdResponse.user_id) {
        console.error("User not found");
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
  
      setInstructors(instructorsData);
      setStudents(studentsData);
      setModalType(null);
    } catch (err) {
      console.error("Failed to add person:", err);
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
                  Add Instructor
                </button>
              )}
            </div>
            <div className="people-section teachers">
              {instructors.length > 0 ? (
                instructors.map((instructor) => (
                  <div className="person-item" key={instructor.id}>
                    <div className="person-icon">
                      <img
                        src={`http://127.0.0.1:8000/${instructor.instructor.profile_image}`}
                        alt={`${instructor.instructor.name}'s profile`}
                        className="person-image"
                      />
                    </div>
                    <div className="person-details">
                      <span>{instructor.instructor.name}</span>
                    </div>
                  </div>
                ))
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
                  Add Student
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
          onClose={() => setModalType(null)}
          onSubmit={handleAddPerson}
        />
      )}
    </div>
  );
}

export default ClassPeople;

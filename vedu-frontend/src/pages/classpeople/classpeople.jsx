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

function ClassPeople() {
  const { classId } = useParams();
  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

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
            <h3>Teachers</h3>
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
              {isOwner && (
                <button className="add-person-button">Add Instructor</button>
              )}
            </div>

            <h3>Students</h3>
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
              {isOwner && (
                <button className="add-person-button">Add Student</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassPeople;

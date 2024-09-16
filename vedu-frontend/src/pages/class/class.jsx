import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./class.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import Tabs from "../../components/Tabs/tabs";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useDispatch, useSelector } from "react-redux";
import {
  setClassPeopleError,
  setClassPeopleSuccess,
} from "../../redux/classPeopleSlice";
import { setAssignments } from "../../redux/assignmentsSlice/assignmentsSlice";

function Class() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses) || [];
  const { classId } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const navigate = useNavigate();
  const { fetchedClasses } = useSelector((state) => ({
    instructors: state.classPeople.instructors[classId] || [],
    students: state.classPeople.students[classId] || [],
    loading: state.classPeople.loading,
    error: state.classPeople.error,
    fetchedClasses: state.classPeople.fetchedClasses[classId],
  }));
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const foundClass = courses.find((course) => course.id === parseInt(classId));
  const assignments = useSelector((state) => state.assignments[classId]);

  useEffect(() => {
    if (!fetchedClasses && foundClass) {
      const fetchClassPeople = async () => {
        try {
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
  }, [classId, foundClass, fetchedClasses, dispatch]);

  useEffect(() => {
    if (!assignments) {
      const fetchAssignmentsByTopic = async () => {
        try {
          const data = await requestApi({
            route: `/api/assignments/course/${classId}/by-topic`,
            requestMethod: RequestMethods.GET,
            navigationFunction: navigate,
          });

          if (data && data.topics) {
            dispatch(setAssignments({ classId, topics: data.topics }));
          } else {
            dispatch(setAssignments({ classId, topics: {} }));
          }
        } catch (error) {
          console.error("Error fetching assignments:", error);
        }
      };

      fetchAssignmentsByTopic();
    }
  }, [classId, assignments, dispatch, navigate]);

  useEffect(() => {
    if (foundClass) {
      setClassDetails(foundClass);
      console.log("Class details from Redux:", foundClass);
    } else {
      const fetchClassDetails = async () => {
        try {
          const data = await requestApi({
            route: `/api/courses/${classId}`,
            requestMethod: RequestMethods.GET,
            navigationFunction: navigate,
          });

          setClassDetails(data);
        } catch (error) {
          console.error("Error fetching class details:", error);
        }
      };

      fetchClassDetails();
    }
  }, [classId, courses, navigate]);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const handleViewDetails = (assignmentId) => {
    navigate(`/class/${classId}/assignments/${assignmentId}`);
  };

  const handleJoinMeeting = () => {
    navigate(`/class/${classId}/meeting`);
  };

  const handleViewAssignment = (assignmentId) => {
    navigate(`/class/${classId}/assignment/${assignmentId}`);
  };

  if (!classDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="class-page">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="Container">
        <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />
        <div className="content">
          <Tabs />
          <div className="class-header">
            <h3>{classDetails.name}</h3>
            <p>{classDetails.description}</p>
            {foundClass.is_instructor_course && (
              <div className="class-code-container">
                <p>
                  <strong>Class Code:</strong> {classDetails.class_code}
                </p>
              </div>
            )}
          </div>

          <div className="class-actions">
            <button className="join-button" onClick={handleJoinMeeting}>
              Join Meeting
            </button>
            {foundClass.is_instructor_course && (
              <button className="announce-button">Announce</button>
            )}
          </div>

          <div className="stream">
            {assignments &&
              Object.keys(assignments).map((topicName) => (
                <div key={topicName}>
                  {assignments[topicName].assignments.map((assignment) => (
                    <div className="stream-item" key={assignment.id}>
                      <div className="stream-icon">
                        <i className="fas fa-clipboard"></i>
                      </div>
                      <div className="stream-content">
                        <p>
                          Teacher posted a new assignment: {assignment.title}
                        </p>
                        <button
                          className="view-button"
                          onClick={() => handleViewDetails(assignment.id)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Class;

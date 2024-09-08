import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./class.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import Tabs from "../../components/Tabs/tabs";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useSelector } from "react-redux";

function Class() {
  const courses = useSelector((state) => state.courses.courses) || [];
  const { classId } = useParams(); 
  const [classDetails, setClassDetails] = useState(null);
  const navigate = useNavigate();

  const foundClass = courses.find((course) => course.id === parseInt(classId));
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

  if (!classDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="class-page">
      <Sidebar />
      <div className="Container">
        <Navbar />
        <div className="content">
          <Tabs />
          <div className="class-header">
            <h3>{classDetails.name}</h3>
            <p>{classDetails.description}</p>
            {foundClass.is_instructor_course && (
              <div className="class-code-container">
                <p><strong>Class Code:</strong> {classDetails.class_code}</p>
              </div>
            )}
          </div>

          <div className="class-actions">
            <button className="join-button">Join Meeting</button>
            {foundClass.is_instructor_course && <button className="announce-button">Announce</button>}
          </div>

          <div className="stream">
            {/* Render class stream or other dynamic content here */}
            <div className="stream-item">
              <div className="stream-icon">
                <i className="fas fa-clipboard"></i>
              </div>
              <div className="stream-content">
                <p>Teacher posted a new assignment</p>
                <button className="view-button">View</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Class;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./class.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import Tabs from "../../components/Tabs/tabs";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";

function Class() {
  const { classId } = useParams(); 
  const [classDetails, setClassDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const data = await requestApi({
          route: `/api/courses/${classId}`,
          requestMethod: RequestMethods.GET,
          navigationFunction: navigate,
        });

        setClassDetails(data);
        console.log("Class details:", data);
        console.log("Class name:", data.course.name);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchClassDetails();
  }, [classId, navigate]);

  if (!classDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="class-page">
      <Sidebar />
      <div className="Container">
        <Navbar />
        <div className="content">
          <Tabs/>
          <div className="class-header">
            <h3>{classDetails.course.name}</h3>
            <p>{classDetails.course.description}</p>
          </div>

          <div className="class-actions">
            <button className="join-button">Join Meeting</button>
            <button className="announce-button">Announce</button>
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

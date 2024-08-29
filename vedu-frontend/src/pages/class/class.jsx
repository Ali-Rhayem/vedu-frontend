import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./class.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import Tabs from "../../components/Tabs/tabs";

function Class() {
  const { classId } = useParams(); 
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/courses/${classId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setClassDetails(response.data);
        console.log("Class details:", response.data);
        console.log("Class name:", response.data.course.name);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchClassDetails();
  }, [classId]);

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

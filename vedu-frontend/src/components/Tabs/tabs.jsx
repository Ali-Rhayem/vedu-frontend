import React from "react";
import "./tabs.css";
import { useNavigate, useParams } from "react-router-dom";

const Tabs = () => {
  const { classId } = useParams(); 
  const navigate = useNavigate();

  const handleAssignmentsClick = () => {
    navigate(`/class/${classId}/assignments`);
  };

  const handlePeopleClick = () =>{
    navigate(`/class/${classId}/people`);
  }

  return (
    <div className="class-tabs">
      <a href="#" className="active">
        Stream
      </a>
      <a href="#" onClick={handleAssignmentsClick}>Assignments</a>
      <a href="#">Chats</a>
      <a onClick={handlePeopleClick}>People</a>
    </div>
  );
};

export default Tabs;

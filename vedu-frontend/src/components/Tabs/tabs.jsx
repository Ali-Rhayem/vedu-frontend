import React from "react";
import "./tabs.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Tabs = () => {
  const { classId } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleAssignmentsClick = () => {
    navigate(`/class/${classId}/assignments`);
  };

  const handlePeopleClick = () =>{
    navigate(`/class/${classId}/people`);
  };

  const handleStreamClick = () => {
    navigate(`/class/${classId}`);
  };

  const handleChatsClick = () => {
    navigate(`/class/${classId}/chats`);
  };

  return (
    <div className="class-tabs">
      <a
        className={location.pathname === `/class/${classId}` ? "active" : ""}
        onClick={handleStreamClick}
      >
        Stream
      </a>
      <a
        href="#"
        className={location.pathname === `/class/${classId}/assignments` ? "active" : ""}
        onClick={handleAssignmentsClick}
      >
        Assignments
      </a>
      <a
        href="#"
        className={location.pathname === `/class/${classId}/chats` ? "active" : ""}
        onClick={handleChatsClick}
      >
        Chats
      </a>
      <a
        href="#"
        className={location.pathname === `/class/${classId}/people` ? "active" : ""}
        onClick={handlePeopleClick}
      >
        People
      </a>
    </div>
  );
};

export default Tabs;

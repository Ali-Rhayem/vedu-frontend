import React from "react";
import "./tabs.css";

const Tabs = () => {
  return (
    <div className="class-tabs">
      <a href="#" className="active">
        Stream
      </a>
      <a href="#">Classwork</a>
      <a href="#">Assignments</a>
      <a href="#">Chats</a>
      <a href="#">People</a>
    </div>
  );
};

export default Tabs;

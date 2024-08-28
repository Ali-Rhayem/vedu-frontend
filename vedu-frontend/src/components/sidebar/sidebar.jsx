import React from "react";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>VEDU</h2>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li className="active">
          <a href="/classes">Classes</a>
        </li>
        <li>
          <a href="/classes/class1">Class 1</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React from "react";
import "./navbar.css";
const Navbar = () => {

  return (
    <header className="top-bar">
      <div className="search-bar">
        <input type="text" placeholder="Search here" />
      </div>
      <div className="user-profile">
        <div className="profile-info">
          <span>Ali Rhayem</span>
          <span>alirhayem@gmail.com</span>
        </div>
        <div className="profile-dropdown">
          <ul>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

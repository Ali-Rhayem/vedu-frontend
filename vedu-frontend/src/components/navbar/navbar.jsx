import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  
  const handleProfile = () => {
    navigate("/profile");
  }

  const handleEditProfile = () => {
    navigate("/edit-profile");
  }

  const handleEditPersonalInfo = () => {
    navigate("/edit-personal-info");
  }

  const handleEditAddress = () => {
    navigate("/edit-address");
  }

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
              <a onClick={handleProfile}>Profile</a>
            </li>
            <li>
              <a onClick={handleEditAddress}>address</a>
            </li>
            <li>
              <a onClick={handleEditPersonalInfo}>edit personal info</a>
            </li>
            <li>
              <a onClick={handleEditProfile}>edit profile</a>
            </li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

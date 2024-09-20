import React, { useEffect, useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCourses } from "../../redux/coursesSlice/coursesSlice";
import { clearUser } from "../../redux/userSlice/userSlice";
import { clearAllAssignments } from "../../redux/assignmentsSlice/assignmentsSlice";
import { clearAllClassPeople } from "../../redux/classPeopleSlice";
import logo from "../../assets/logo2.png";

const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".user-profile") &&
      !event.target.closest(".profile-dropdown")
    ) {
      setDropdownVisible(false);
    }
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleEditPersonalInfo = () => {
    navigate("/edit-personal-info");
  };

  const handleEditAddress = () => {
    navigate("/edit-address");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(resetCourses());
    dispatch(clearUser());
    dispatch(clearAllAssignments());
    dispatch(clearAllClassPeople());
    navigate("/");
  };

  return (
    <header className="top-bar">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Logo" />
        <h2>VEDU</h2>
      </div>

      <div className="menu-icon">
        <div>
          <img
            src={
              userData?.profile_image
                ? `http://127.0.0.1:8000/${userData.profile_image}`
                : "/assets/images/defaultpfp.jpg"
            }
            alt="User Profile"
            className="profile-image-navbar"
            onClick={toggleDropdown}
          />
        </div>
        <span onClick={toggleSidebar}>&#9776;</span>
      </div>

      {dropdownVisible && (
        <div className="profile-dropdown menu-profile">
          <ul>
            <li onClick={handleProfile}>
              <a>Profile</a>
            </li>
            <li onClick={handleEditAddress}>
              <a>Address</a>
            </li>
            <li onClick={handleEditPersonalInfo}>
              <a>Edit Personal Info</a>
            </li>
            <li onClick={handleEditProfile}>
              <a>Edit Profile</a>
            </li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}

      <div className="user-profile-navbar" onClick={toggleDropdown}>
        <div className="profile-info">
          <div className="name-email">
            <span>{userData.name}</span>
            <span>{userData.email}</span>
          </div>
          <img
            src={
              userData?.profile_image
                ? `http://127.0.0.1:8000/${userData.profile_image}`
                : "/assets/images/defaultpfp.jpg"
            }
            alt="User Profile"
            className="profile-image-navbar"
          />
        </div>
      </div>
    </header>
  );
};

export default React.memo(Navbar);

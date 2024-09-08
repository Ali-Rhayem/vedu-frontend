import React, { useEffect, useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCourses } from "../../redux/coursesSlice/coursesSlice";
import { clearUser, setUser } from "../../redux/userSlice/userSlice";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { clearAllAssignments } from "../../redux/assignmentsSlice/assignmentsSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".user-profile")) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!userData) {
      const fetchUserData = async () => {
        try {
          const data = await requestApi({
            route: "/api/user",
            requestMethod: RequestMethods.GET,
            navigationFunction: navigate,
          });

          dispatch(setUser(data));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userData, dispatch]);

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

  const handleLogout = () => {
    // localStorage.removeItem("token");

    // const persistor = persistStore(store);
    // persistor.pause();

    // persistor.flush().then(() => {
    //   return persistor.purge();
    // }).then(() => {
    //   dispatch(resetCourses());
    //   dispatch(clearUser());
    //   console.log(userData);

    // });
    localStorage.clear();
    dispatch(resetCourses());
    dispatch(clearUser());
    dispatch(clearAllAssignments());
    navigate("/login");
  };

  return (
    <header className="top-bar">
      <div className="search-bar">
        <input type="text" placeholder="Search here" />
      </div>
      <div className="user-profile" onClick={toggleDropdown}>
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
            className="profile-image"
          />
        </div>
        {dropdownVisible && (
          <div className="profile-dropdown">
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
      </div>
    </header>
  );
};

export default React.memo(Navbar);

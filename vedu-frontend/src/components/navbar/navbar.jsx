import React, { useEffect } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCourses } from "../../redux/coursesSlice/coursesSlice";
import { clearUser, setUser } from "../../redux/userSlice/userSlice";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import persistStore from "redux-persist/es/persistStore";
import store from "../../redux/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.data);

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
    localStorage.removeItem("token");
  
    const persistor = persistStore(store);
    persistor.pause();  
  
    persistor.flush().then(() => {
      return persistor.purge(); 
    }).then(() => {
      dispatch(resetCourses());
      dispatch(clearUser());
      console.log(userData);
  
      navigate("/login");
    });
  };
  

  return (
    <header className="top-bar">
      <div className="search-bar">
        <input type="text" placeholder="Search here" />
      </div>
      <div className="user-profile">
        <div className="profile-info">
          <span>{userData.name}</span>
          <span>{userData.email}</span>
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
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

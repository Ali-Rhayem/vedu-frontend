import React, { useEffect } from "react";
import "./profile.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleEditPersonalInfo = () => {
    navigate("/edit-personal-info");
  };

  const handleEditAddress = () => {
    navigate("/edit-address");
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <Sidebar />
        <div className="profile-content-pfp">
          <div className="profile-section-content">
            <h3>Profile</h3>

            <div className="profile-section">
              <div className="profile-section-header">
                <h4>My Profile</h4>
                <button
                  className="profile-edit-button"
                  onClick={handleEditProfile}
                >
                  Edit
                </button>
              </div>
              <div className="profile-info">
                <div className="profile-image">
                  <img
                    src={
                      userData?.profile_image
                        ? `http://127.0.0.1:8000/${userData.profile_image}`
                        : "/assets/images/defaultpfp.jpg"
                    }
                    alt="Profile"
                  />
                </div>
                <div className="profile-name">
                  <p>Name: {userData.name}</p>
                  <p>Bio: {userData.bio}</p>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-header">
                <h4>Personal Information</h4>
                <button
                  className="profile-edit-button"
                  onClick={handleEditPersonalInfo}
                >
                  Edit
                </button>
              </div>
              <div className="profile-personal-info">
                <div className="profile-info-group profile-flex-row">
                  <p className="profile-email">Email: {userData.email}</p>
                  <p className="profile-phone">
                    Phone Number: {userData.phone_number}
                  </p>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-header">
                <h4>Address</h4>
                <button
                  className="profile-edit-button"
                  onClick={handleEditAddress}
                >
                  Edit
                </button>
              </div>
              <div className="profile-address-info">
                <div className="profile-info-group profile-address-cc">
                  <p>Country: {userData.country}</p>
                  <p className="profile-city">City: {userData.city}</p>
                </div>
                <div className="profile-info-group profile-address-code">
                  <p className="profile-code">Code: {userData.code}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

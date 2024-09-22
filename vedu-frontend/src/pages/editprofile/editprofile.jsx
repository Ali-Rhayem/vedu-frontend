import React, { useState, useEffect, useRef } from "react";
import "./editprofile.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice/userSlice";

function Editprofile() {
  const userData = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(userData?.name || "");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const baseUrl =
    process.env.REACT_APP_API_BASE_URL_PRODUCTION ||
    process.env.REACT_APP_API_BASE_URL_LOCAL;

  const [profileImage, setProfileImage] = useState(
    userData?.profile_image ? `${baseUrl}/${userData.profile_image}` : ""
  );
  const fileInputRef = useRef();

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  async function handleSubmitProfile(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    if (fileInputRef.current.files.length > 0) {
      formData.append("profile_image", fileInputRef.current.files[0]);
    }

    try {
      const data = await requestApi({
        route: "/api/user/update-profile",
        requestMethod: RequestMethods.POST,
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.errors) {
        console.error(data.errors);
      } else {
        console.log("Profile updated successfully", data);
        dispatch(setUser(data.user));

        setProfileImage(`${baseUrl}/${data.user.profile_image}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <div className="edit-personal-info-page">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="ep-Container">
        <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />
        <div className="content">
          <div className="profile-content">
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmitProfile}>
              <div className="profile-section-ep">
                <div className="profile-picture">
                  <div className="profile-img">
                    <img
                      src={profileImage || "/assets/images/defaultpfp.jpg"}
                      alt="Profile"
                    />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
                  <span
                    onClick={handleFileInputClick}
                    className="upload-image-ep"
                  >
                    Upload Image
                  </span>
                </div>
                <div className="profile-info">
                  <div className="info-group">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Example"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="confirm-button">
                    Confirm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editprofile;

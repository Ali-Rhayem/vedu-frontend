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
  const userData = useSelector((state) => state.user.data); // Get user data from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(userData?.name || ""); // Initialize with userData
  const [profileImage, setProfileImage] = useState(userData?.profile_image ? `http://127.0.0.1:8000/${userData.profile_image}` : "");
  const fileInputRef = useRef();

  useEffect(() => {
    // We no longer need to fetch user data here because it’s already available in userData.
    if (!userData) {
      navigate("/login"); // Redirect if no userData available
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
        dispatch(setUser(data.user)); // Update userData in Redux with the new user data

        setProfileImage(`http://127.0.0.1:8000/${data.user.profile_image}`);
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
  }

  return (
    <div className="edit-personal-info-page">
      <Sidebar />
      <div className="ep-Container">
        <Navbar />
        <div className="content">
          <div className="profile-content">
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmitProfile}>
              <div className="profile-section-ep">
                <div className="profile-picture">
                  <div className="profile-img">
                    <img
                      src={profileImage || "path/to/default-image.png"}
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
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
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
                  <button type="button" className="cancel-button" onClick={handleCancel}>
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

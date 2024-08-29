import React, { useState, useEffect, useRef } from "react";
import "./editprofile.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import axios from "axios";

function Editprofile() {
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = response.data;
        setName(data.name);
        setProfileImage(`http://127.0.0.1:8000/${data.profile_image}`); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  async function handleSubmitProfile(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    if (fileInputRef.current.files.length > 0) {
      formData.append("profile_image", fileInputRef.current.files[0]);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      if (data.errors) {
        console.error(data.errors);
      } else {
        console.log("Profile updated successfully", data);
        setProfileImage(`http://127.0.0.1:8000/${data.user.profile_image}`); 
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click(); 
  };

  return (
    <div className="edit-personal-info-page">
      <Sidebar />
      <div className="Container">
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
                  <button type="button" className="cancel-button">
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

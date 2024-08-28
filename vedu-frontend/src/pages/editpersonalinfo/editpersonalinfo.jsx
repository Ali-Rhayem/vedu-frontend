import React from "react";
import "./editpersonalinfo.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

function EditPersonalInfo() {
  return (
    <div className="edit-personal-info-page">
      <Sidebar />
      <div className="Container">
        <Navbar />
        <div className="content">
          <div className="profile-content">
            <h3>Edit Profile</h3>

            <div className="profile-section">
              <div className="profile-picture">
                <div className="profile-img">
                  <img src="path/to/profile-image.png" alt="Profile" />
                </div>
                <button className="change-photo-button">Change Photo</button>
              </div>

              <div className="profile-info">
                <div className="info-group">
                  <label>Name</label>
                  <input type="text" placeholder="Example" />
                </div>
              </div>
              <div className="form-actions">
                <button className="cancel-button">Cancel</button>
                <button className="confirm-button">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPersonalInfo;

import React, { useState } from "react";
import "./editprofile.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

function EditProfile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");


  return (
    <div className="edit-profile-page">
      <Sidebar/>
      <div className="Container">
        <Navbar />
        <div className="content">
          <div className="profile-content">
            <h3>Edit Personal Information</h3>

            <div className="profile-section">
              <div className="section-header">
                <h4>Personal Information</h4>
              </div>
              <div className="personal-info">
                <div className="info-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Example"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="info-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Example"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="info-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="info-group">
                  <label>Bio</label>
                  <input
                    type="text"
                    placeholder="Example"
                  />
                </div>
                <div className="info-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="***********"
                  />
                </div>
                <div className="info-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="***********"
                  />
                </div>
                <div className="info-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    placeholder="123456789"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="cancel-button">
                Cancel
              </button>
              <button className="confirm-button">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

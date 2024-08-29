import React, { useEffect } from "react";
import "./profile.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import axios from "axios";

function Profile() {
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = response.data;
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-page">
      <Sidebar />

      <div className="Container">
        <Navbar />
        <div className="content">
          <div className="profile-content">
            <h3>Profile</h3>

            <div className="profile-section">
              <div className="section-header">
                <h4>My Profile</h4>
                <button className="edit-button">Edit</button>
              </div>
              <div className="profile-info">
                <div className="profile-image">
                  <img src="path/to/profile-image.png" alt="Profile" />
                </div>
                <div className="profile-name">
                  <p>Name: Ali Rhayem</p>
                  <p>Bio: Some text about Ali</p>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <div className="section-header">
                <h4>Personal Information</h4>
                <button className="edit-button">Edit</button>
              </div>
              <div className="personal-info">
                <div className="info-group">
                  <p>First Name: Ali</p>
                  <p>Last Name: Rhayem</p>
                </div>
                <div className="info-group">
                  <p>Email: alirhayem@gmail.com</p>
                  <p>Phone Number: 123456789</p>
                </div>
                <div className="info-group">
                  <p>Bio: Text</p>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <div className="section-header">
                <h4>Address</h4>
                <button className="edit-button">Edit</button>
              </div>
              <div className="address-info">
                <div className="info-group">
                  <p>Country: Text</p>
                  <p>City: Text</p>
                </div>
                <div className="info-group">
                  <p>Code: 0000</p>
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

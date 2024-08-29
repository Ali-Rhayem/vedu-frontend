import React, { useEffect, useState } from "react";
import "./profile.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");
  const [profileImage, setProfileImage] = useState("");

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
        setBio(data.bio);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setPhoneNumber(data.phone_number);
        setCountry(data.country);
        setCity(data.city);
        setCode(data.code);
        setProfileImage(`http://127.0.0.1:8000/${data.profile_image}`);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  }

  const handleEditPersonalInfo = () => {
    navigate("/edit-personal-info");
  }

  const handleEditAddress = () => {
    navigate("/edit-address");
  }

  return (
    <div className="profile-page">
      <Sidebar />

      <div className="profile-container">
        <Navbar />
        <div className="profile-content">
          <div className="profile-section-content">
            <h3>Profile</h3>

            <div className="profile-section">
              <div className="profile-section-header">
                <h4>My Profile</h4>
                <button className="profile-edit-button" onClick={handleEditProfile}>Edit</button>
              </div>
              <div className="profile-info">
                <div className="profile-image">
                  <img src={profileImage} alt="Profile" />
                </div>
                <div className="profile-name">
                  <p>Name: {name}</p>
                  <p>Bio: {bio}</p>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-header">
                <h4>Personal Information</h4>
                <button className="profile-edit-button" onClick={handleEditPersonalInfo}>Edit</button>
              </div>
              <div className="profile-personal-info">
                <div className="profile-info-group profile-flex-row">
                  <p>Email: {email}</p>
                  <p className="profile-phone">Phone Number: {phoneNumber}</p>
                </div>
                <div className="profile-info-group">
                  <p>Bio: {bio}</p>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-header">
                <h4>Address</h4>
                <button className="profile-edit-button" onClick={handleEditAddress}>Edit</button>
              </div>
              <div className="profile-address-info">
                <div className="profile-info-group profile-flex-row">
                  <p>Country: {country}</p>
                  <p className="profile-city">City: {city}</p>
                </div>
                <div className="profile-info-group">
                  <p>Code: {code}</p>
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

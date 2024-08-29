import React, { useState } from "react";
import "./editpersonalinfo.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";

function EditPersonalInfo() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCancel = () =>{
    navigate("/profile");
  }

  function handleSubmitPersonalInfo() {
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      bio: bio,
      password: password,
      password_confirmation: confirmPassword,
      phone_number: phoneNumber,
    };

    fetch("http://127.0.0.1:8000/api/user/update-personal-info", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          console.error("Validation errors:", data.errors);
          alert("There are validation errors. Please check your input.");
        } else {
          console.log("Success:", data.message);
          alert("Personal information updated successfully.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  }

  return (
    <div className="edit-profile-page">
      <Sidebar />
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
                <div className="flex-row">
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
                </div>
                <div className="flex-row">
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
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-row">
                  <div className="info-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="***********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="info-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="***********"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-row">
                  <div className="info-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      placeholder="123456789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="info-group"></div>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
              <button
                className="confirm-button"
                onClick={handleSubmitPersonalInfo}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPersonalInfo;

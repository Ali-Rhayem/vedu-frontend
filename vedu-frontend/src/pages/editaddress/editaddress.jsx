import React, { useEffect, useState } from "react";
import "./editaddress.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditAddress() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = response.data;
        setCountry(data.country);
        setCity(data.city);
        setCode(data.code);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleCancel = () => {
    navigate("/profile");
  };

  async function handleSubmitAddress() {
    const payload = {
      country: country,
      city: city,
      code: code,
    };

    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/user/update-address",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;

      if (data.errors) {
        // Handle validation errors
      } else {
        console.log("success");
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  }

  return (
    <div className="edit-address-page">
      <Sidebar />
      <div className="Container">
        <Navbar />
        <div className="content">
          <div className="address-content">
            <h3>Edit Address</h3>

            <div className="address-section">
              <div className="section-header">
                <h4>Address</h4>
              </div>
              <div className="address-info">
                <div className="info-group">
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder="Example"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="info-group">
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="Example"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="info-group">
                  <label>Code</label>
                  <input
                    type="text"
                    placeholder="0000"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="confirm-button" onClick={handleSubmitAddress}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAddress;

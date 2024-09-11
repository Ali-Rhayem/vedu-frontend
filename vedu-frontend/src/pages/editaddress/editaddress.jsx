import React, { useEffect, useState } from "react";
import "./editaddress.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";

function EditAddress() {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await requestApi({
          route: "/api/user",
          requestMethod: RequestMethods.GET,
          navigationFunction: navigate,
        });

        setCountry(data.country);
        setCity(data.city);
        setCode(data.code);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

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
      const data = await requestApi({
        route: "/api/user/update-address",
        requestMethod: RequestMethods.PUT,
        body: payload,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (data.errors) {
        console.error("Validation errors:", data.errors);
      } else {
        console.log("Address updated successfully", data);
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  }
  return (
    <div className="edit-address-page">
      <Navbar />
      <div className="Container">
        <Sidebar />
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

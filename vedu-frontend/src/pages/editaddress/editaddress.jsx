import React, { useState } from "react";
import "./editaddress.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";

function EditAddress() {
  const [country, setCountry] = useState("");

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
                  <input type="text" placeholder="Example" />
                </div>
                <div className="info-group">
                  <label>Code</label>
                  <input type="text" placeholder="0000" />
                </div>
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
  );
}

export default EditAddress;

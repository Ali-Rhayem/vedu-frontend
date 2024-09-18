import React, { useState } from "react";
import "./addpersonmodal.css";

function AddPersonModal({ type, onClose, onSubmit, error, setModalError }) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setModalError(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="addperson-overlay">
      <div className="addperson-content">
        <h3>Add {type} by Email</h3>
        {error && <p className="error-message-addpersonmodal">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            {type} Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Enter email address"
            />
          </label>
          <div className="button-container">
            <button type="button" className="close-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="action-button">
              Add {type}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPersonModal;

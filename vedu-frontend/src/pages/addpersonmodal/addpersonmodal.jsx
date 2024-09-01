import React, { useState } from "react";
import "./addpersonmodal.css";

function AddPersonModal({ type, onClose, onSubmit }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="addperson-overlay">
      <div className="addperson-content">
        <h3>Add {type} by Email</h3>
        <form onSubmit={handleSubmit}>
          <label>
            {type} Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email address"
            />
          </label>
          <div className="button-container">
            <button
              type="button"
              className="close-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="action-button"
            >
              Add {type}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPersonModal;

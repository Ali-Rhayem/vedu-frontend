import React from 'react';
import './joinclass.css';

function JoinClass({ isOpen, onClose, onSubmit, children }) {
  if (!isOpen) return null;

  return (
    <div className="joinclass-overlay">
      <div className="joinclass-content">
        {children}
        <div className="joinclass-actions">
          <button className="joinclass-button cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="joinclass-button join" onClick={onSubmit}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinClass;

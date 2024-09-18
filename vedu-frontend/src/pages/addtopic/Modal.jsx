import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, onSubmit, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <div className="modal-actions">
          <button className="modal-button cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-button join" onClick={onSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

import React, { useState, useEffect } from "react";
import "./createclass.css";

function CreateClass({ isOpen, onClose, onSubmit }) {
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };

  const handleClassDescriptionChange = (event) => {
    setClassDescription(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({
      name: className,
      description: classDescription,
    });
    setClassName("");
    setClassDescription("");
  };

  // Reset fields when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setClassName("");
      setClassDescription("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="createclass-overlay">
      <div className="createclass-content">
        <h3>Create Class</h3>
        <input
          type="text"
          placeholder="Enter class name"
          value={className}
          onChange={handleClassNameChange}
          className="createclass-input"
        />
        <input
          type="text"
          placeholder="Enter class description"
          value={classDescription}
          onChange={handleClassDescriptionChange}
          className="createclass-input"
        />
        <div className="createclass-actions">
          <button className="createclass-button cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="createclass-button submit" onClick={handleSubmit}>
            Add Class
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateClass;

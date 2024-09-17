import React, { useState, useEffect } from "react";
import "./createclass.css";

function CreateClass({ isOpen, onClose, onSubmit, classToEdit = null }) {
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");

  useEffect(() => {
    if (classToEdit) {
      setClassName(classToEdit.name);
      setClassDescription(classToEdit.description);
    } else {
      setClassName("");
      setClassDescription("");
    }
  }, [classToEdit, isOpen]);

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };

  const handleClassDescriptionChange = (event) => {
    setClassDescription(event.target.value);
  };

  const handleSubmit = () => {
    const classData = {
      name: className,
      description: classDescription,
    };
    
    if (classToEdit) {
      onSubmit(classData, classToEdit.id); 
    } else {
      onSubmit(classData); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="createclass-overlay">
      <div className="createclass-content">
        <h3>{classToEdit ? "Edit Class" : "Create Class"}</h3>
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
            {classToEdit ? "Update Class" : "Add Class"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateClass;

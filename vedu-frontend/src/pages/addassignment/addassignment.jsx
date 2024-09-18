import React, { useState } from "react";
import "./addassignment.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";

import { useAddAssignment } from "./useAddAssignment";

function AddAssignment() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const {
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    grade,
    setGrade,
    files,
    handleFileUpload,
    handleRemoveFile,
    topicId,
    setTopicId,
    topics,
    handleSubmit,
  } = useAddAssignment();

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <div className="add-assignment-page">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="Container">
        <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />
        <div className="content">
          <div className="assignment-form">
            <div className="form-left">
              <h3>New Assignment</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Topic</label>
                  <select
                    value={topicId}
                    onChange={(e) => setTopicId(e.target.value)}
                  >
                    <option value="">Select a topic</option>
                    {topics.map((topic, index) => (
                      <option
                        key={topic.id || `topic-${index}`}
                        value={topic.id || ""}
                      >
                        {topic.name || `Unnamed topic ${index + 1}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Attach files</label>
                  <div className="file-upload">
                    <input type="file" multiple onChange={handleFileUpload} />
                  </div>
                  <div className="uploaded-files">
                    {files.map((file, index) => (
                      <div key={index} className="uploaded-file">
                        <span>{file.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </div>
              </form>
            </div>

            <div className="form-right">
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Grade</label>
                <input
                  type="text"
                  placeholder="Enter grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAssignment;

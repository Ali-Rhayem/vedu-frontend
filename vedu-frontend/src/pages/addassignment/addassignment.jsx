import React, { useState } from "react";
import "./addassignment.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";

function AddAssignment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [grade, setGrade] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((file, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <div className="add-assignment-page">
      <Sidebar />
      <div className="Container">
        <Navbar />
        <div className="content">
          <div className="assignment-form">
            <div className="form-left">
              <h3>New Assignment</h3>
              <form>
                <div className="form-group">
                  <label>Topic</label>
                  <select>
                    <option value="default">Select a topic</option>
                    {/* Add other topics here */}
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
                    <button type="button" className="upload-button">
                      Upload
                    </button>
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
                  <button type="button" className="cancel-button">
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

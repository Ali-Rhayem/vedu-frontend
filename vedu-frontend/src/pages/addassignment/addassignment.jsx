import React, { useState } from "react";
import "./addassignment.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";

function AddAssignment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
                    <input type="file" multiple />
                    <button type="button" className="upload-button">
                      Upload
                    </button>
                  </div>
                  <div className="uploaded-files"></div>
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
                <input type="date" />
              </div>

              <div className="form-group">
                <label>Grade</label>
                <input type="text" placeholder="Enter grade" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAssignment;

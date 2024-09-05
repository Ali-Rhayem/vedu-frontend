import React, { useEffect, useState } from "react";
import "./addassignment.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAssignment } from "../../redux/assignmentsSlice/assignmentsSlice";

function AddAssignment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [grade, setGrade] = useState("");
  const [files, setFiles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState("");
  const { classId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await requestApi({
          route: `/api/topic/class/${classId}`,
          requestMethod: RequestMethods.GET,
          navigationFunction: navigate,
        });

        if (data && data.topics) {
          setTopics(data.topics);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, [classId, navigate]);

  const handleFileUpload = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((file, i) => i !== index);
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const assignmentData = {
        course_id: classId,
        title,
        description,
        due_date: dueDate,
        topic_id: topicId,
        grade: grade,
      };

      const assignmentResponse = await requestApi({
        route: "/api/assignments",
        requestMethod: RequestMethods.POST,
        body: assignmentData,
        navigationFunction: navigate,
      });

      const assignmentId = assignmentResponse.assignment.id;

      dispatch(
        addAssignment({
          classId,
          topicId,
          assignment: assignmentResponse.assignment,
        })
      );

      if (files.length > 0) {
        const formData = new FormData();
        formData.append("assignment_id", assignmentId);

        files.forEach((file) => {
          formData.append("file", file);
        });

        await requestApi({
          route: "/api/assignment-documents",
          requestMethod: RequestMethods.POST,
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          navigationFunction: navigate,
        });
      }

      navigate(`/class/${classId}/assignments`);
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
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
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Topic</label>
                  <select
                    value={topicId}
                    onChange={(e) => setTopicId(e.target.value)}
                  >
                    <option value="">Select a topic</option>
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.name}
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

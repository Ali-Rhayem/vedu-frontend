import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import "./assignmentdetails.css";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice/userSlice";

function AssignmentDetailsPage() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const { assignmentId, classId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [grade, setUserGrade] = useState(null);

  useEffect(() => {
    if (!userData) {
      const fetchUserData = async () => {
        try {
          const data = await requestApi({
            route: "/api/user",
            requestMethod: RequestMethods.GET,
          });

          dispatch(setUser(data));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userData, dispatch]);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const data = await requestApi({
          route: `/api/assignments/${assignmentId}`,
          requestMethod: RequestMethods.GET,
        });
        console.log(data);

        if (data) {
          setAssignment(data.assignment);

          if (data.assignment.submissions) {
            const userSubmission = data.assignment.submissions.find(
              (submission) => submission.student_id === userData.id
            );
            if (userSubmission) {
              setUserGrade(userSubmission.grade);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching assignment details:", error);
      }
    };

    fetchAssignmentDetails();
  }, [assignmentId, userData]);

  const handleAddWork = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setUploadedFile(selectedFile);
      }
    };
    fileInput.click();
  };

  const handleMarkDone = async () => {
    if (!uploadedFile) {
      alert("Please add a file before marking as done.");
      return;
    }

    if (!userData || !userData.id) {
      alert("User information not loaded. Please try again later.");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("assignment_id", assignmentId);
    formData.append("student_id", userData.id);

    try {
      const data = await requestApi({
        route: `/api/submission`,
        requestMethod: RequestMethods.POST,
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Submission created successfully!");
      setUploadedFile(null);
    } catch (error) {
      console.error("Error submitting work:", error);
      alert("Failed to submit work. Please try again.");
    }
  };

  const getFileIcon = (fileName) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    switch (fileExtension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️';
      default:
        return '📁';
    }
  };

  if (!assignment) {
    return <p>Loading...</p>;
  }

  return (
    <div className="assignment-details-page">
      <Sidebar />
      <div className="assignment-details-container">
        <Navbar />
        <div className="content">
          <Tabs />
          <div className="assignment-content">
            <div className="assignment-details-ad">
              <h3>{assignment.title}</h3>

              {assignment.documents && assignment.documents.length > 0 ? (
                <div className="attachment">
                  <h4>Attachments:</h4>
                  <ul className="file-list">
                    {assignment.documents.map((document) => (
                      <li key={document.id} className="file-item">
                        <span className="file-icon">
                          {getFileIcon(document.file_url)}
                        </span>
                        <a
                          href={`http://127.0.0.1:8000/storage/${document.file_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          {document.file_url.split('/').pop()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="no-attachment">
                  <p>No attachments available.</p>
                </div>
              )}

              <p className="description">{assignment.description}</p>
            </div>

            <div className="your-work">
              {assignment.grade !== null && (
                <div className="grade-section">
                  <h4>Your Grade: {grade} / {assignment.grade}</h4>
                </div>
              )}
              <h4>Your Work</h4>
              <div className="uploaded-file">
                {uploadedFile && (
                  <ul>
                    <li>{uploadedFile.name}</li>
                  </ul>
                )}
              </div>
              <div className="work-actions">
                <button className="add-work-button" onClick={handleAddWork}>
                  + Add Work
                </button>
                <button className="mark-done-button" onClick={handleMarkDone}>
                  ✔ Mark Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentDetailsPage;

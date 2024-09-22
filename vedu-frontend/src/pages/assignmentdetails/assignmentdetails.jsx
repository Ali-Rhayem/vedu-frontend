import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import "./assignmentdetails.css";
import { useSelector } from "react-redux";
import { useAssignmentDetails } from "./useAssignmentDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AssignmentDetailsPage() {
  const { assignmentId, classId } = useParams();
  const userData = useSelector((state) => state.user.data);
  const assignments = useSelector((state) => state.assignments[classId]) || {};

  const currentAssignment = Object.keys(assignments)
    .flatMap((topicName) => assignments[topicName].assignments)
    .find((assignment) => assignment.id === parseInt(assignmentId));

  console.log("currentAssignment", currentAssignment);

  const userSubmission = currentAssignment?.submissions?.find(
    (submission) => submission.student_id === parseInt(userData.id)
  );
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const courses = useSelector((state) => state.courses.courses) || [];
  const foundClass = courses.find((course) => course.id === parseInt(classId));
  const [IsInstructor, setIsInstructor] = useState(false);

  useEffect(() => {
    if (foundClass?.is_instructor_course) {
      setIsInstructor(true);
    }
  }, [foundClass]);

  const {
    uploadedFile,
    handleAddWork,
    handleMarkDone,
    handleUnsubmit,
    getFileIcon,
  } = useAssignmentDetails();

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  if (!currentAssignment) {
    return <p>Loading assignment...</p>;
  }

  return (
    <div className="assignment-details-page">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="assignment-details-container">
        <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />
        <div className="content">
          <Tabs />
          <div className="assignment-content">
            <div className="assignment-details-ad">
              <h3>{currentAssignment.title}</h3>
              <p className="description">{currentAssignment.description}</p>
              {currentAssignment.documents &&
              currentAssignment.documents.length > 0 ? (
                <div className="attachment">
                  <h4>Attachments:</h4>
                  <ul className="file-list">
                    {currentAssignment.documents.map((document) => (
                      <li key={document.id} className="file-item">
                        <span className="file-icon">
                          {getFileIcon(document.file_url)}
                        </span>
                        <a
                          href={`${
                            process.env.REACT_APP_API_BASE_URL_PRODUCTION ||
                            process.env.REACT_APP_API_BASE_URL_LOCAL
                          }/storage/${document.file_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          {document.file_url.split("/").pop()}
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
            </div>

            {!IsInstructor && (
              <div className="your-work">
                {currentAssignment.grade !== null && (
                  <div className="grade-section-ad">
                    <h4>
                      Your Grade: {userSubmission?.grade || "N/A"} /{" "}
                      {currentAssignment.grade}
                    </h4>
                  </div>
                )}

                <h4>Your Work</h4>
                <div className="submission-details">
                  {userSubmission ? (
                    <>
                      <div className="submitted-file">
                        {userSubmission.file_url && (
                          // <a
                          //   href={`http://127.0.0.1:8000/storage/${userSubmission.file_url}`}
                          //   target="_blank"
                          //   rel="noopener noreferrer"
                          // >
                          <a
                            href={`${
                              process.env.REACT_APP_API_BASE_URL_PRODUCTION ||
                              process.env.REACT_APP_API_BASE_URL_LOCAL
                            }${userSubmission.file_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {userSubmission.file_url.split("/").pop()}
                          </a>
                        )}
                      </div>
                      <div className="work-actions">
                        <button
                          className="unsubmit-button"
                          onClick={() =>
                            handleUnsubmit(
                              userSubmission.id,
                              classId,
                              assignmentId
                            )
                          }
                        >
                          ❌ Unsubmit
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="uploaded-file">
                        {uploadedFile && (
                          <ul>
                            <li>{uploadedFile.name}</li>
                          </ul>
                        )}
                      </div>
                      <div className="work-actions">
                        <button
                          className="add-work-button"
                          onClick={handleAddWork}
                        >
                          + Add Work
                        </button>
                        <button
                          className="mark-done-button"
                          onClick={() => handleMarkDone(assignmentId, classId)}
                        >
                          ✔ Mark Done
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AssignmentDetailsPage;

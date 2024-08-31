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

        if (data) {
          setAssignment(data.assignment);
        }
      } catch (error) {
        console.error("Error fetching assignment details:", error);
      }
    };

    fetchAssignmentDetails();
  }, [assignmentId]);

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
              <div className="attachment">
                <button className="attachment-button">View Attachment</button>
              </div>
              <p className="description">{assignment.description}</p>
            </div>

            <div className="your-work">
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

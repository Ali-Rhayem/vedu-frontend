import React, { useEffect, useState } from "react";
import "./submissions.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useParams } from "react-router-dom";

function Submissions() {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const data = await requestApi({
          route: `/api/assignments/${assignmentId}`,
          requestMethod: RequestMethods.GET,
        });
        setAssignment(data.assignment);
      } catch (error) {
        console.error("Error fetching assignment details:", error);
      }
    };

    const fetchSubmissions = async () => {
      try {
        const data = await requestApi({
          route: `/api/assignments/${assignmentId}/submissions`,
          requestMethod: RequestMethods.GET,
        });
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchAssignmentDetails();
    fetchSubmissions();
  }, [assignmentId]);

  const handleGradeChange = (e, submissionId) => {
    const value = parseInt(e.target.value, 10);
    if (assignment && value > assignment.max_grade) {
      alert(`Grade cannot exceed ${assignment.max_grade}`);
    } else if (value < 0) {
      alert(`Grade cannot be less than 0`);
    } else {
      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((submission) =>
          submission.id === submissionId
            ? { ...submission, grade: value }
            : submission
        )
      );
    }
  };

  const handleSaveGrade = async (submissionId, grade) => {
    if (grade === null || grade === undefined || grade === "") {
      alert("Please enter a grade.");
      return;
    }

    try {
      const data = await requestApi({
        route: `/api/assignments/${assignmentId}/submissions/${submissionId}/grade`,
        requestMethod: RequestMethods.POST,
        body: {
          grade,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      alert("Grade saved successfully!");
    } catch (error) {
      console.error("Error saving grade:", error);
      alert("Failed to save grade. Please try again.");
    }
  };

  return (
    <div className="submissions-page">
      <Sidebar />
      <div className="submissions-container">
        <Navbar />
        <div className="content">
          <Tabs />
          <div className="submissions-content">
            <h3>
              {assignment ? assignment.title : `Assignment ${assignmentId}`}
            </h3>
            {submissions.map((submission) => (
              <div className="submission-item" key={submission.id}>
                <div className="submission-header">
                  <div className="student-info">
                    <div className="student-avatar"></div>
                    <div className="student-name">
                      {submission.student.name}
                    </div>
                  </div>
                </div>
                <div className="submission-body">
                  <div className="download-section">
                    <a
                      href={`http://127.0.0.1:8000/storage/${submission.file_url}`}
                      className="download-button"
                      download
                    >
                      <i className="fas fa-download"></i> Download Submission
                    </a>
                  </div>
                  <div className="grade-section">
                    <label>Grade:</label>
                    <input
                      type="number"
                      placeholder="Enter grade"
                      value={submission.grade || ""}
                      onChange={(e) => handleGradeChange(e, submission.id)}
                    />
                    <span>/{assignment ? assignment.grade : "100"}</span>
                    <button
                      className="save-grade-button"
                      onClick={() =>
                        handleSaveGrade(submission.id, submission.grade)
                      }
                    >
                      Save Grade
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Submissions;

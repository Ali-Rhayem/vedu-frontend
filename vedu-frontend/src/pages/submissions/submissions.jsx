import React, { useEffect, useState } from "react";
import "./submissions.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import { requestApi } from "../../utils/request"; 
import { RequestMethods } from "../../utils/request_methods";
import axios from "axios";
import { useParams } from "react-router-dom";

function Submissions() {
  const { assignmentId } = useParams(); // Extract assignmentId from useParams()
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await requestApi({
          route: `/api/assignments/${assignmentId}/submissions`,
          requestMethod: RequestMethods.GET,
        });
        setSubmissions(data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, [assignmentId]);

  return (
    <div className="submissions-page">
      <Sidebar />
      <div className="submissions-container">
        <Navbar />
        <div className="content">
          <Tabs />
          <div className="submissions-content">
            <h3>Assignment {assignmentId}</h3> {/* assignmentId is now properly extracted */}
            {submissions.map((submission) => (
              <div className="submission-item" key={submission.id}>
                <div className="submission-header">
                  <div className="student-info">
                    <div className="student-avatar"></div>
                    <div className="student-name">{submission.student.name}</div>
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
                    <input type="text" placeholder="Enter grade" />
                    <span>/100</span>
                    <button className="save-grade-button">Save Grade</button>
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

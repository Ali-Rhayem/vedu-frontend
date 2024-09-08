import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useDispatch } from "react-redux";
import { updateSubmissionGrade } from "../../redux/assignmentsSlice/assignmentsSlice";

export const useSubmissions = () => {
  const dispatch = useDispatch();

  const handleDownload = async (submissionId, fileUrl) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/submissions/${submissionId}/download`, {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const fileName = fileUrl.split('/').pop();
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        alert('Failed to download the file.');
      }
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const handleGradeChange = (e, submissionId, currentAssignment, setUpdatedSubmissions) => {
    const value = parseInt(e.target.value, 10);
    if (currentAssignment && value > currentAssignment.grade) {
      alert(`Grade cannot exceed ${currentAssignment.grade}`);
    } else if (value < 0) {
      alert(`Grade cannot be less than 0`);
    } else {
      setUpdatedSubmissions((prevSubmissions) =>
        prevSubmissions.map((submission) =>
          submission.id === submissionId
            ? { ...submission, grade: value }
            : submission
        )
      );
    }
  };

  const handleSaveGrade = async (submissionId, grade, assignmentId, classId) => {
    if (grade === null || grade === undefined || grade === "") {
      alert("Please enter a grade.");
      return;
    }

    try {
      await requestApi({
        route: `/api/assignments/${assignmentId}/submissions/${submissionId}/grade`,
        requestMethod: RequestMethods.POST,
        body: { grade },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      alert("Grade saved successfully!");

      dispatch(
        updateSubmissionGrade({
          classId,
          assignmentId,
          submissionId,
          grade,
        })
      );
    } catch (error) {
      console.error("Error saving grade:", error);
      alert("Failed to save grade. Please try again.");
    }
  };

  return {
    handleDownload,
    handleGradeChange,
    handleSaveGrade,
  };
};

import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useDispatch } from "react-redux";
import { updateSubmissionGrade } from "../../redux/assignmentsSlice/assignmentsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.error('Failed to download the file.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error downloading the file:', error);
      toast.error('Error downloading the file. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleGradeChange = (e, submissionId, currentAssignment, setUpdatedSubmissions) => {
    const value = parseInt(e.target.value, 10);
    if (currentAssignment && value > currentAssignment.grade) {
      toast.error(`Grade cannot exceed ${currentAssignment.grade}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else if (value < 0) {
      toast.error(`Grade cannot be less than 0`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
      });
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
      toast.error("Please enter a grade.", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
      });
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

      toast.success("Grade saved successfully!", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
      });

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
      toast.error("Failed to save grade. Please try again.", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return {
    handleDownload,
    handleGradeChange,
    handleSaveGrade,
  };
};

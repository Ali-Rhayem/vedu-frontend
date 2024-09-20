import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { requestApi } from "../../utils/request";
import { addSubmission, removeSubmission } from "../../redux/assignmentsSlice/assignmentsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useAssignmentDetails = () => {
    const dispatch = useDispatch();
    const [uploadedFile, setUploadedFile] = useState(null);
    const userData = useSelector((state) => state.user.data);

    const handleUnsubmit = async (submissionId, classId, assignmentId) => {
        try {
            await requestApi({
                route: `/api/submission/${submissionId}`,
                requestMethod: "DELETE",
            });

            dispatch(
                removeSubmission({
                    classId,
                    assignmentId,
                    submissionId,
                })
            );

            toast.success("Submission removed successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error("Error removing submission:", error);
            toast.error("Failed to remove submission. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

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

    const handleMarkDone = async (assignmentId, classId) => {
        if (!uploadedFile) {
            toast.error("Please add a file before marking as done.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        if (!userData || !userData.id) {
            toast.error("User information not loaded. Please try again later.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        const formData = new FormData();
        formData.append("file", uploadedFile);
        formData.append("assignment_id", assignmentId);
        formData.append("student_id", userData.id);

        try {
            const data = await requestApi({
                route: `/api/submission`,
                requestMethod: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Submission created successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: true,
                draggable: true,
            });

            dispatch(
                addSubmission({
                    classId,
                    assignmentId,
                    submission: data.submission,
                })
            );

            setUploadedFile(null);
        } catch (error) {
            console.error("Error submitting work:", error);
            toast.error("Failed to submit work. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: true,
                draggable: true,
            });
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

    return {
        uploadedFile,
        setUploadedFile,
        handleAddWork,
        handleUnsubmit,
        handleMarkDone,
        getFileIcon,
    };
};

// useAddAssignment.js
import { useEffect, useState } from "react";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment } from "../../redux/assignmentsSlice/assignmentsSlice";

export const useAddAssignment = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [grade, setGrade] = useState("");
    const [files, setFiles] = useState([]);
    const [topicId, setTopicId] = useState("");

    const { classId } = useParams();
    const course = useSelector((state) =>
        state.courses.courses.find((course) => course.id === parseInt(classId))
    );
    
    const assignments = useSelector((state) => state.assignments[classId]) || {};

    const topics = Object.keys(assignments).map((topicName) => {
        const topicData = assignments[topicName];
        return { id: topicData?.id || null, name: topicName };
    });

    console.log("Topics:", topics);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!course.is_instructor_course) {
            navigate("/home");
        }
    }, [course, navigate]);

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
            const selectedTopic = topics.find(
                (topic) => topic.id === parseInt(topicId)
            );
            const topicName = selectedTopic ? selectedTopic.name : null;

            if (!topicName) {
                alert("Please select a valid topic.");
                return;
            }

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
            let assignment = assignmentResponse.assignment;

            if (files.length > 0) {
                const formData = new FormData();
                formData.append("assignment_id", assignmentId);

                files.forEach((file) => {
                    formData.append("file", file);
                });

                const fileUploadResponse = await requestApi({
                    route: "/api/assignment-documents",
                    requestMethod: RequestMethods.POST,
                    body: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    navigationFunction: navigate,
                });

                assignment = {
                    ...assignment,
                    documents: Array.isArray(fileUploadResponse.document)
                        ? fileUploadResponse.document
                        : [fileUploadResponse.document],
                };
            } else {
                assignment.documents = [];
            }

            dispatch(
                addAssignment({
                    classId,
                    topicName,
                    assignment: { ...assignment, submissions: [] },
                })
            );

            navigate(`/class/${classId}/assignments`);
        } catch (error) {
            console.error("Error adding assignment:", error);
        }
    };

    return {
        title,
        setTitle,
        description,
        setDescription,
        dueDate,
        setDueDate,
        grade,
        setGrade,
        files,
        handleFileUpload,
        handleRemoveFile,
        topicId,
        setTopicId,
        topics,
        handleSubmit,
    };
};

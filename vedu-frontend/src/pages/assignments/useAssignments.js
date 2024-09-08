// useAssignments.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestApi } from "../../utils/request";
import { setAssignments } from "../../redux/assignmentsSlice/assignmentsSlice";
import { RequestMethods } from "../../utils/request_methods";
import { useNavigate } from "react-router-dom";

export const useAssignments = (classId) => {
  const dispatch = useDispatch();
  const assignments = useSelector((state) => state.assignments[classId]) || {};
  console.log("Assignments:", assignments);
  const [loading, setLoading] = useState(true);
  const [newTopicName, setNewTopicName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const course = useSelector((state) =>
    state.courses.courses.find((course) => course.id === parseInt(classId))
  );

  useEffect(() => {
    if (!assignments || Object.keys(assignments).length === 0) {
      const fetchAssignmentsByTopic = async () => {
        try {
          setLoading(true);
          const data = await requestApi({
            route: `/api/assignments/course/${classId}/by-topic`,
            requestMethod: RequestMethods.GET,
            navigationFunction: navigate,
          });

          if (data && data.topics) {
            dispatch(setAssignments({ classId, topics: data.topics }));
          } else {
            dispatch(setAssignments({ classId, topics: {} }));
          }
        } catch (error) {
          console.error("Error fetching assignments:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAssignmentsByTopic();
    } else {
      setLoading(false);
    }
  }, [classId, dispatch, navigate, assignments]);

  const handleViewDetails = (assignmentId) => {
    navigate(`/class/${classId}/assignments/${assignmentId}`);
  };

  const handleViewSubmissions = (assignmentId) => {
    navigate(`/class/${classId}/assignments/${assignmentId}/submissions`);
  };

  const handleCreateClick = () => {
    navigate(`/class/${classId}/add-assignment`);
  };

  const handleAddTopicClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = async () => {
    if (newTopicName.trim() === "") return;

    try {
      const newTopic = { name: newTopicName, course_id: classId };
      const response = await requestApi({
        route: "/api/topic",
        requestMethod: RequestMethods.POST,
        body: newTopic,
        navigationFunction: navigate,
      });

      dispatch(
        setAssignments({
          classId,
          topics: { ...assignments, [response.topic.name]: [] },
        })
      );

      setNewTopicName("");
      setShowModal(false);
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  return {
    assignments,
    loading,
    course,
    newTopicName,
    setNewTopicName,
    showModal,
    handleAddTopicClick,
    handleModalClose,
    handleModalSubmit,
    handleViewDetails,
    handleViewSubmissions,
    handleCreateClick,
  };
};

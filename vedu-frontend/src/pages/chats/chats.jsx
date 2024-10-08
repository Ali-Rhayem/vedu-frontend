import React, { useEffect, useState } from "react";
import "./chats.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import { useDispatch, useSelector } from "react-redux";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { useParams, useNavigate } from "react-router-dom";
import {
  setClassPeopleLoading,
  setClassPeopleSuccess,
  setClassPeopleError,
} from "../../redux/classPeopleSlice";

function Chats() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const dispatch = useDispatch();
  const { classId } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data);
  const { instructors, students, error, loading } = useSelector(
    (state) => state.classPeople
  );

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  useEffect(() => {
    if (!instructors[classId] || !students[classId]) {
      const fetchClassPeople = async () => {
        try {
          dispatch(setClassPeopleLoading());

          const instructorsData = await requestApi({
            route: `/api/course-instructor/course/${classId}/instructors`,
            requestMethod: RequestMethods.GET,
          });

          const studentsData = await requestApi({
            route: `/api/course-student/course/${classId}/students`,
            requestMethod: RequestMethods.GET,
          });

          dispatch(
            setClassPeopleSuccess({
              classId,
              instructors: instructorsData.instructors,
              students: studentsData.students,
            })
          );
        } catch (err) {
          dispatch(setClassPeopleError("Failed to fetch class people"));
        }
      };

      if (userData) {
        fetchClassPeople();
      }
    }
  }, [classId, dispatch, userData, instructors, students]);

  const startChat = async (receiverId, receiverName) => {
    try {
      const existingChatResponse = await requestApi({
        route: `/api/chats/check-existing`,
        requestMethod: RequestMethods.POST,
        body: JSON.stringify({
          sender_id: userData.id,
          receiver_id: receiverId,
          course_id: classId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let chatId = existingChatResponse.chat_id;

      if (!chatId) {
        const newChatResponse = await requestApi({
          route: "/api/chats",
          requestMethod: RequestMethods.POST,
          body: JSON.stringify({
            sender_id: userData.id,
            receiver_id: receiverId,
            course_id: classId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!newChatResponse || !newChatResponse.id) {
          throw new Error("Failed to create a new chat.");
        }

        chatId = newChatResponse.id;
      }

      navigate(`/class/${classId}/chats/${chatId}`, {
        state: { receiverName: receiverName },
      });
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error("Server error when starting chat:", error.response.data);
      } else {
        console.error("Error starting chat:", error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  const users = [
    ...(instructors[classId]?.map((item) => item.instructor) || []),
    ...(students[classId]?.map((item) => item.student) || []),
  ];

  return (
    <div className="chats-page">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="chats-container">
        <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />
        <div className="content">
          <div className="tabs-chat">
            <Tabs />
          </div>
          <div className="chat-content">
            <div className="people-list">
              <h3>People</h3>
              <ul>
                {Array.isArray(users) &&
                  users.map((user) => {
                    if (user.id === userData.id) {
                      return null;
                    }

                    return (
                      <li
                        key={`user-${user.id}`}
                        className="user-item-chats"
                        onClick={() => startChat(user.id, user.name)}
                      >
                        <img
                          src={
                            user.profile_image
                              ? `${
                                  process.env
                                    .REACT_APP_API_BASE_URL_PRODUCTION ||
                                  process.env.REACT_APP_API_BASE_URL_LOCAL
                                }${user.profile_image}`
                              : "/assets/images/defaultpfp.jpg"
                          }
                          alt={`${user.name}'s avatar`}
                          className="user-avatar"
                        />
                        <span className="user-name">{user.name}</span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;

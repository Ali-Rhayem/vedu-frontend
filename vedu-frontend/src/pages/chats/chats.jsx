import React, { useEffect, useState } from "react";
import "./chats.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import { useDispatch, useSelector } from "react-redux";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { setUser } from "../../redux/userSlice/userSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Chats() {
  const userData = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { classId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      const fetchUserData = async () => {
        try {
          const data = await requestApi({
            route: "/api/user",
            requestMethod: RequestMethods.GET,
          });

          dispatch(setUser(data));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [userData, dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await requestApi({
          route: `/api/course/${classId}/users`,
          requestMethod: RequestMethods.GET,
        });

        setUsers(response.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [classId]);

  const startChat = async (receiverId) => {
    console.log("receiverId:", receiverId);
    console.log("userData.id:", userData.id);
    console.log("courseId:", classId);

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

      console.log(existingChatResponse);

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

        chatId = newChatResponse.id;
      }

      // Navigate to the specific chat page with the chatId
      navigate(`/class/${classId}/chats/${chatId}`);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chats-page">
      <Sidebar />
      <div className="chats-container">
        <Navbar />
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
                      onClick={() => startChat(user.id)}
                    >
                      {user.name}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;

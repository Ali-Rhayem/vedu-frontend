import React, { useEffect, useState } from "react";
import "./chats.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Tabs from "../../components/Tabs/tabs";
import { useDispatch, useSelector } from "react-redux";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import { setUser } from "../../redux/userSlice/userSlice";
import echo from "../../echo"; // Importing the echo configuration
import { useParams } from "react-router-dom";

function Chats() {
  const userData = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const {classId} = useParams();

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
          route: `/api/course/${classId}/users`, // Adjusted to match the route in api.php
          requestMethod: RequestMethods.GET,
        });

        setUsers(response.users); // Assuming the response has a `users` field with the array of users
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

      console.log(existingChatResponse)

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

      setChatId(chatId);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  useEffect(() => {
    if (chatId) {
      const fetchMessages = async () => {
        try {
          const data = await requestApi({
            route: `/api/messages/${chatId}`, // Fetch messages for the chat
            requestMethod: RequestMethods.GET,
          });

          setMessages(data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();

      // Set up real-time messaging using Laravel Echo
      const channel = echo.private(`chat.${chatId}`);
      channel.listen("ChatMessageSent", (event) => {
        setMessages((prevMessages) => [...prevMessages, event.message]);
      });

      // Clean up the Echo channel when component unmounts or chatId changes
      return () => {
        channel.stopListening("ChatMessageSent");
      };
    }
  }, [chatId]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    try {
      await requestApi({
        route: "/api/messages",
        requestMethod: RequestMethods.POST,
        body: JSON.stringify({
          chat_id: chatId,
          sender_id: userData.id,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
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
                  // Skip the current user
                  if (user.id === userData.id) {
                    return null; // or you can use `return null;` to skip rendering
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

          <div className="chat-section">
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={`message-${msg.id}-${index}`}
                  className="message-item"
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type something..."
              />
              <button type="button" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
          <div className="ai-summary">
            <h3>AI Summary</h3>
            <p>Summary of the chat</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;

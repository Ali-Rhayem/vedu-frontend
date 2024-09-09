import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import echo from "../../echo";
import "./chatpage.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ChatPage() {
  const { chatId, classId } = useParams();
  const { state } = useLocation();
  const userData = useSelector((state) => state.user.data);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  console.log("userData", userData);
  const navigate = useNavigate();

  const recipientName = state?.receiverName || "Recipient";

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (chatId) {
      console.log(`Navigated to chat with ID: ${chatId}`);

      window.postMessage({ type: 'CHAT_NAVIGATED', chatId: chatId }, '*');
      console.log("window.postMessage", window.postMessage);
    }
  }, [chatId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await requestApi({
          route: `/api/messages/${chatId}`,
          requestMethod: RequestMethods.GET,
        });

        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    const channel = echo.private(`chat.${chatId}`);
    channel.listen("ChatMessageSent", (event) => {
      setMessages((prevMessages) => [...prevMessages, event.message]);
    });

    return () => {
      channel.stopListening("ChatMessageSent");
    };
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

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-page flex">
      <Sidebar />
      <div className="chat-container flex-1 flex flex-col">
        <Navbar />

        <div className="chat-content p-4 flex flex-col h-full">
          <div className="chat-section flex flex-col flex-1 overflow-hidden">
            <div className="chat-header-section p-4 bg-gray-800 text-white">
              <div className="header-cp">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="cursor-pointer"
                  size="lg"
                  onClick={handleBackClick}
                />{" "}
                <h2> {recipientName}</h2>
              </div>
            </div>
            <div className="messages flex-1">
              {messages.map((msg, index) => {
                const isCurrentUser = msg.sender_id === userData.id;
                const chatAlignment = isCurrentUser ? "chat-end" : "chat-start";

                return (
                  <div
                    key={`message-${msg.id}-${index}`}
                    className={`chat ${chatAlignment} mb-4`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full"></div>
                    </div>
                    <div className="chat-bubble">
                      <div className="chat-message-row">
                        <span className="message-text">{msg.message}</span>
                        <span className="time">
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="chat-input mt-4 flex items-center">
              <input
                type="text"
                className="input input-bordered flex-1 mr-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type something..."
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;

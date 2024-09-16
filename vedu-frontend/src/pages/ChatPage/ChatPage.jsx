import React, { useEffect, useState, useRef } from "react";
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
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function ChatPage() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { chatId } = useParams();
  const { state } = useLocation();
  const userData = useSelector((state) => state.user.data);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [messagesFetched, setMessagesFetched] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const recipientName = state?.receiverName || "Recipient";

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  useEffect(() => {
    if (chatId) {
      window.postMessage({ type: "CHAT_NAVIGATED", chatId: chatId }, "*");
    }
  }, [chatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!messagesFetched) {
        try {
          const data = await requestApi({
            route: `/api/messages/${chatId}`,
            requestMethod: RequestMethods.GET,
          });

          setMessages(data);
          setMessagesFetched(true);
          scrollToBottom();
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [chatId, messagesFetched]);

  useEffect(() => {
    const channel = echo.channel(`chat.${chatId}`);
    channel.listen(".message.sent", (event) => {
      setMessages((prevMessages) => [...prevMessages, event.message]);
      scrollToBottom();
    });

    return () => {
      channel.stopListening(".message.sent");
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
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-page">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="chat-container">
        <Sidebar isVisible={isSidebarVisible} closeSidebar={closeSidebar} />
        <div className="chat-content-cp">
          <div className="chat-section">
            <div className="chat-header-section">
              <div className="header-cp">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="back-icon"
                  onClick={handleBackClick}
                />
                <h2>{recipientName}</h2>
              </div>
            </div>
            <div className="messages">
              {messages.map((msg, index) => {
                const isCurrentUser = msg.sender_id === userData.id;
                const chatAlignment = isCurrentUser ? "chat-end" : "chat-start";

                return (
                  <div
                    key={`message-${msg.id}-${index}`}
                    className={`chat ${chatAlignment}`}
                  >
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
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-cp">
              <input
                type="text"
                className="input-field"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button
                type="button"
                className="send-button-cp"
                onClick={sendMessage}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;

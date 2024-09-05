import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { requestApi } from "../../utils/request";
import { RequestMethods } from "../../utils/request_methods";
import echo from "../../echo";
import "./chatpage.css";

function ChatPage() {
  const { chatId, classId } = useParams(); 
  const userData = useSelector((state) => state.user.data);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

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
    <div className="chat-page">
      <Sidebar />
      <div className="chat-container">
        <Navbar />
        <div className="chat-content">
          <div className="chat-section">
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={`message-${msg.id}-${index}`} className="message-item">
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

export default ChatPage;

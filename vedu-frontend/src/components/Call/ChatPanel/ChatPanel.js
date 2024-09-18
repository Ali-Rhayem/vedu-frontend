import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ChatPanel.css";

const ChatPanel = ({ messages, onSendMessage, onClose, currentUser }) => {
    const [message, setMessage] = useState("");
    const lastMessageRef = useRef(null);

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="chat-panel">
            <div className="chat-header">
                <span>Meeting Chat</span>
                <button className="close-chat-button" onClick={onClose}>
                    ✕
                </button>
            </div>
            <div className="chat-window">
                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.user === currentUser ? "user" : "other"}`}
                            ref={index === messages.length - 1 ? lastMessageRef : null}
                        >
                            <div className="message-sender">{msg.user === currentUser ? "You" : msg.user}</div>
                            <div className="message-content">{msg.text}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    className="chat-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button className="send-button" onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPanel;

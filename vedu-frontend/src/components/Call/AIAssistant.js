import React, { useState, useEffect, useRef } from "react";
import "./AiAssistant.css";

const AIAssistant = ({ socket, onClose }) => {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const lastMessageRef = useRef(null); 
    const handleAskQuestion = (e) => {
        e.preventDefault();
        if (question.trim()) {
            const newMessages = [...messages, { role: "user", content: question }];
            setMessages(newMessages);
    
            socket.emit("ask-question", { question, conversation: newMessages });
            setQuestion("");
        }
    };

    useEffect(() => {
        socket.on("ai-response", (response) => {
            setMessages((prevMessages) => [...prevMessages, { role: "ai", content: response }]);
        });
    }, [socket]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="ai-assistant-chat">
            {/* Close Button */}
            <button className="ai-assistant-close" onClick={onClose}>
                ✕
            </button>

            <div className="chat-window">
                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.role}`}
                            ref={index === messages.length - 1 ? lastMessageRef : null}
                        >
                            <div className="message-content">{msg.content}</div>
                        </div>
                    ))}
                </div>
            </div>
            <form className="input-container" onSubmit={handleAskQuestion}>
                <input
                    type="text"
                    className="chat-input"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question..."
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    );
};

export default AIAssistant;

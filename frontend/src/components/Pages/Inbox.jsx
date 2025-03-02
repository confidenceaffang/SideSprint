import React, { useState, useEffect } from "react";
import { FaSpinner, FaInbox, FaCheck, FaPaperPlane } from "react-icons/fa";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to the backend

const Inbox = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial messages and set up real-time updates
  useEffect(() => {
    // Fetch existing messages from the server
    socket.on("messages", (data) => {
      setMessages(data);
      setIsLoading(false);
    });

    // Listen for new messages
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("messages");
      socket.off("newMessage");
    };
  }, []);

  // Send a new message
  const sendMessage = () => {
    if (inputText.trim()) {
      const message = {
        from: user.id,
        to: user.role === "employer" ? "employee-1" : "employer-1", // Replace with dynamic recipient ID
        text: inputText,
      };
      socket.emit("sendMessage", message);
      setInputText("");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <FaSpinner className="animate-spin text-2xl text-blue-500" />
      </div>
    );
  }

  // Empty state
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-gray-500">
        <FaInbox className="text-4xl" />
        <p className="mt-2">No messages found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 mb-2 rounded-lg ${
              msg.from === user.id
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 self-start"
            }`}
            style={{ maxWidth: "70%" }}
          >
            <p>{msg.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 border rounded-l-lg focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 flex items-center"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Inbox;

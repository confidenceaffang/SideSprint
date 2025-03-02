import React, { useState, useEffect } from "react";
import { FaSpinner, FaInbox, FaPaperPlane } from "react-icons/fa";
import io from "socket.io-client";
import api from "../services/api";

const socket = io("http://localhost:5000");

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await api.get("/auth/me");
        setCurrentUser(response.data);
        // Join user's chat room
        socket.emit("joinChat", response.data._id);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data.filter((user) => user._id !== currentUser?._id));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchCurrentUser();
    fetchUsers();

    socket.on("messages", (data) => {
      setMessages(data);
      setIsLoading(false);
    });

    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("messages");
      socket.off("newMessage");
    };
  }, [currentUser?._id]);

  const sendMessage = () => {
    if (inputText.trim() && selectedUser && currentUser) {
      const message = {
        from: currentUser._id,
        to: selectedUser._id,
        text: inputText,
      };
      socket.emit("sendMessage", message);
      setInputText("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <FaSpinner className="animate-spin text-2xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Users List */}
      <div className="w-1/4 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Chats</h2>
        </div>
        <div className="overflow-y-auto">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                selectedUser?._id === user._id ? "bg-gray-100" : ""
              }`}
            >
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-4 border-b bg-white">
              <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
              <p className="text-sm text-gray-500">{selectedUser.role}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages
                .filter(
                  (msg) =>
                    (msg.from === currentUser?._id &&
                      msg.to === selectedUser._id) ||
                    (msg.from === selectedUser._id &&
                      msg.to === currentUser?._id)
                )
                .map((msg) => (
                  <div
                    key={msg._id}
                    className={`p-4 mb-2 rounded-lg ${
                      msg.from === currentUser?._id
                        ? "bg-blue-500 text-white ml-auto"
                        : "bg-gray-200"
                    }`}
                    style={{ maxWidth: "70%" }}
                  >
                    <p>{msg.text}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
            </div>
            <div className="p-4 border-t bg-white">
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FaInbox className="text-4xl mb-2" />
            <p>Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;

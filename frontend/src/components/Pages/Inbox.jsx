import React from "react";

const Inbox = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-600">{msg.from}</p>
          <p className="text-gray-700">{msg.message}</p>
          <p className="text-xs text-gray-500">{msg.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default Inbox;

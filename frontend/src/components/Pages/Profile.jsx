import React from "react";

const user = {
  profilePicture: "https://via.placeholder.com/150",
  name: "John Doe",
  role: "Software Developer",
  email: "john.doe@example.com",
  phone: "+1 234 567 890",
  skills: ["JavaScript", "React", "Node.js", "CSS"],
};

const Profile = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 shadow-md rounded-lg">
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded-full"
            src={user.profilePicture}
            alt="Profile"
          />
          <div className="ml-4">
            <h3 className="text-2xl font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.role}</p>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-medium">Contact Information</h4>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
        </div>
        <div className="mt-4">
          <h4 className="font-medium">Skills</h4>
          <ul>
            {user.skills.map((skill) => (
              <li key={skill} className="text-gray-600">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;

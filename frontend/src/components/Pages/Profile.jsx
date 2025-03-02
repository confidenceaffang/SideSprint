import React, { useState, useRef } from "react";
import { FaEnvelope, FaPhone, FaCode, FaUser, FaVideo } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    role: "Software Developer",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    skills: ["JavaScript", "React", "Node.js", "CSS"],
    profilePicture: null,
    video: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB.");
        return;
      }
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({ ...user, profilePicture: e.target.result });
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        alert("Please upload a valid video file.");
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        alert("Video size should be less than 50MB.");
        return;
      }
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({ ...user, video: e.target.result });
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = () => {
    setUser({ ...user, profilePicture: null });
  };

  const handleRemoveVideo = () => {
    setUser({ ...user, video: null });
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <div className="container mx-auto items-center text-center p-4">
      <div className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg duration-300">
        <div className="flex items-center mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fileInputRef.current.click();
                }
              }}
            >
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                getInitial(user.firstName)
              )}
            </div>
            {user.profilePicture && (
              <button
                type="button"
                onClick={handleRemoveProfilePicture}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                &times;
              </button>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleProfilePictureUpload}
            />
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-600">{user.role}</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium mb-2">Contact Information</h4>
          <div className="flex items-center text-gray-600 mb-2">
            <FaEnvelope className="mr-2" />
            <p>{user.email}</p>
          </div>
          <div className="flex items-center text-gray-600">
            <FaPhone className="mr-2" />
            <p>{user.phone}</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium mb-2">Skills</h4>
          <ul>
            {user.skills.map((skill) => (
              <li key={skill} className="flex items-center text-gray-600 mb-1">
                <FaCode className="mr-2" />
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="font-medium mb-2">Video Introduction</h4>
          <div className="relative">
            {user.video ? (
              <div className="relative">
                <video controls className="w-full rounded-lg">
                  <source src={user.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  type="button"
                  onClick={handleRemoveVideo}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  &times;
                </button>
              </div>
            ) : (
              <div
                className="w-full h-32 bg-gray-100 flex items-center justify-center rounded-lg cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => videoInputRef.current.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    videoInputRef.current.click();
                  }
                }}
              >
                <FaVideo className="text-4xl text-gray-400" />
                <p className="ml-2 text-gray-600">Upload a video</p>
              </div>
            )}
            <input
              type="file"
              accept="video/*"
              ref={videoInputRef}
              className="hidden"
              onChange={handleVideoUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

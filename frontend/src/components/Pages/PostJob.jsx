import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa";
import { IoCamera } from "react-icons/io5";

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    job: "",
    hours: "",
    description: "",
    wage: "",
    schedule: "",
    postedBy: "user", // Replace with actual user data
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recognition = useRef(null);

  // Initialize speech recognition
  const initializeSpeechRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");

        if (activeField && event.results[0].isFinal) {
          setFormData((prev) => ({
            ...prev,
            [activeField]: transcript,
          }));
          stopListening();
        }
      };

      recognition.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        stopListening();
      };
    }
  };

  const startListening = (field) => {
    setActiveField(field);
    setIsListening(true);
    recognition.current?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    setActiveField(null);
    recognition.current?.stop();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("job", formData.job);
    formDataToSend.append("hours", formData.hours);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("wage", formData.wage);
    formDataToSend.append("schedule", formData.schedule);
    formDataToSend.append("postedBy", formData.postedBy);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:8080/api/v1/jobs", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to post job");
      }

      const data = await response.json();
      console.log("Job posted successfully:", data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initialize speech recognition on component mount
  React.useEffect(() => {
    initializeSpeechRecognition();
    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Job Title"
                name="job"
                value={formData.job}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className={`p-2 rounded-full ${
                  activeField === "job" && isListening
                    ? "text-red-500 bg-red-50"
                    : "text-blue-500 bg-blue-50"
                }`}
                onClick={() =>
                  activeField === "job"
                    ? stopListening()
                    : startListening("job")
                }
              >
                <FaMicrophone className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-start gap-2">
              <textarea
                placeholder="Job Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className={`p-2 rounded-full ${
                  activeField === "description" && isListening
                    ? "text-red-500 bg-red-50"
                    : "text-blue-500 bg-blue-50"
                }`}
                onClick={() =>
                  activeField === "description"
                    ? stopListening()
                    : startListening("description")
                }
              >
                <FaMicrophone className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Hours"
                  name="hours"
                  value={formData.hours}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className={`p-2 rounded-full ${
                    activeField === "hours" && isListening
                      ? "text-red-500 bg-red-50"
                      : "text-blue-500 bg-blue-50"
                  }`}
                  onClick={() =>
                    activeField === "hours"
                      ? stopListening()
                      : startListening("hours")
                  }
                >
                  <FaMicrophone className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Wage"
                  name="wage"
                  value={formData.wage}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className={`p-2 rounded-full ${
                    activeField === "wage" && isListening
                      ? "text-red-500 bg-red-50"
                      : "text-blue-500 bg-blue-50"
                  }`}
                  onClick={() =>
                    activeField === "wage"
                      ? stopListening()
                      : startListening("wage")
                  }
                >
                  <FaMicrophone className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Schedule"
                name="schedule"
                value={formData.schedule}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className={`p-2 rounded-full ${
                  activeField === "schedule" && isListening
                    ? "text-red-500 bg-red-50"
                    : "text-blue-500 bg-blue-50"
                }`}
                onClick={() =>
                  activeField === "schedule"
                    ? stopListening()
                    : startListening("schedule")
                }
              >
                <FaMicrophone className="w-5 h-5" />
              </button>
            </div>

            <div className="border rounded-lg p-6 flex flex-col items-center gap-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="flex items-center gap-2 px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-50 transition-colors">
                  <IoCamera className="w-5 h-5" />
                  <span>Upload Image</span>
                </div>
              </label>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Job image preview"
                  className="max-w-full max-h-48 object-contain"
                />
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
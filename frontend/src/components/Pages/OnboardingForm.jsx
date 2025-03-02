import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);
  const navigate = useNavigate();

  const skillsList = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "HTML",
    "CSS",
    "SQL",
    "Git",
    "Docker",
    "AWS",
    "TypeScript",
    "GraphQL",
    "Kubernetes",
    "Azure",
    "Machine Learning",
  ];

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    if (onboardingCompleted === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    // Filter skills based on search query
    setFilteredSkills(
      skillsList
        .filter((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((skill) => !skills.includes(skill)) // Exclude already selected skills
    );
  }, [searchQuery, skills]);

  const handleNext = () => {
    if (step === 1 && !location.trim()) {
      alert("Please enter your location.");
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSkillClick = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setSearchQuery("");
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/onboarding", {
        location,
        skills,
      });
      console.log("Onboarding data submitted:", response.data);

      localStorage.setItem("onboardingCompleted", "true");

      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting onboarding data:", error);
    }
  };

  return (
    <div className="flex bg-black min-h-screen flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Complete Your Profile
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 1 && (
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <div className="mt-1">
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your address"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700"
              >
                Select Your Skills
              </label>
              <div className="mt-2">
                {/* Selected Skills Display */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-white hover:text-gray-200"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />

                {/* Filtered Skills List */}
                <div className="mt-4">
                  {filteredSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillClick(skill)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-sm text-gray-700">
                Thank you for completing your profile!
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {step === 3 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;

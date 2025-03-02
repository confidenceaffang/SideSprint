import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import api from "../services/api";

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
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
      if (!location || skills.length === 0) {
        throw new Error("Please complete all required fields");
      }

      const response = await api.post("/onboarding", {
        location,
        skills,
      });

      if (response.data) {
        localStorage.setItem("onboardingCompleted", "true");
        navigate("/dashboard", { replace: true });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error submitting onboarding data:", error);
      alert(
        error.message || "Failed to complete onboarding. Please try again."
      );
    }
  };
  const getLocationFromCoords = async (latitude, longitude) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();
    return `${
      data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.county
    }, ${data.address.state}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-white mb-2">
          Complete Your Profile
        </h2>
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i <= step ? "bg-indigo-500" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white/10 backdrop-blur-lg py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-white/20">
          {step === 1 && (
            <div className="space-y-6">
              <label className="block text-lg font-medium text-white">
                Where are you based?
              </label>
              <div className="mt-1 relative space-y-2">
                <div className="flex gap-2">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={location}
                    onChange={(e) => {
                      const value = e.target.value;
                      setLocation(value);
                      if (value.trim()) {
                        const suggestions = US_CITIES.filter((city) =>
                          city.toLowerCase().includes(value.toLowerCase())
                        );
                        setLocationSuggestions(suggestions);
                      } else {
                        setLocationSuggestions([]);
                      }
                    }}
                    className="block w-full appearance-none rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-400 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 sm:text-sm"
                    placeholder="Enter your location"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      setIsLoadingLocation(true);
                      setLocationError("");
                      try {
                        const position = await new Promise(
                          (resolve, reject) => {
                            navigator.geolocation.getCurrentPosition(
                              resolve,
                              reject
                            );
                          }
                        );
                        const locationStr = await getLocationFromCoords(
                          position.coords.latitude,
                          position.coords.longitude
                        );
                        setLocation(locationStr);
                      } catch (error) {
                        setLocationError("Failed to get your location");
                      } finally {
                        setIsLoadingLocation(false);
                      }
                    }}
                    disabled={isLoadingLocation}
                    className="px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isLoadingLocation ? "Loading..." : "📍 Use My Location"}
                  </button>
                </div>
                {locationError && (
                  <p className="text-red-500 text-sm mt-1">{locationError}</p>
                )}
                {locationSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg">
                    {locationSuggestions.map((city, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer text-white hover:bg-gray-700"
                        onClick={() => {
                          setLocation(city);
                          setLocationSuggestions([]);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-white mb-4">
                  Select Your Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-6">
                  {skillsList.map((skill) => (
                    <button
                      key={skill}
                      onClick={() =>
                        skills.includes(skill)
                          ? handleRemoveSkill(skill)
                          : handleSkillClick(skill)
                      }
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        skills.includes(skill)
                          ? "bg-indigo-600 text-white ring-2 ring-indigo-500 ring-offset-2 ring-offset-gray-900"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {skill}
                      {skills.includes(skill) && (
                        <span className="ml-2 inline-flex items-center justify-center">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="text-sm text-gray-400 mt-4">
                  Selected: {skills.length} skills
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-white">
                Profile Complete!
              </h3>
              <p className="text-gray-300">
                Thank you for setting up your profile. You're all set to explore
                opportunities!
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-between gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="flex-1 rounded-lg border border-gray-600 bg-transparent py-3 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={navigate(handleNext)}
              className={`flex-1 rounded-lg border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                !step > 1 ? "w-full" : ""
              }`}
            >
              {step === 3 ? "Go to Dashboard" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;

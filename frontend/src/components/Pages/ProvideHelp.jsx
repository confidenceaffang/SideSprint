import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const ProvideHelp = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filters, setFilters] = useState({
    availability: "all",
    skills: [],
    searchQuery: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/employees"
        );
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Failed to load employees. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Filter employees based on current filters
  useEffect(() => {
    let result = [...employees];

    // Filter by availability
    if (filters.availability !== "all") {
      result = result.filter(
        (employee) => employee.availability === filters.availability
      );
    }

    // Filter by skills
    if (filters.skills.length > 0) {
      result = result.filter(
        (employee) =>
          employee.skills &&
          filters.skills.every((skill) =>
            employee.skills.some((employeeSkill) =>
              employeeSkill.toLowerCase().includes(skill.toLowerCase())
            )
          )
      );
    }

    // Filter by search query
    if (filters.searchQuery) {
      result = result.filter(
        (employee) =>
          employee.name
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase()) ||
          (employee.skills &&
            employee.skills.some((skill) =>
              skill.toLowerCase().includes(filters.searchQuery.toLowerCase())
            ))
      );
    }

    setFilteredEmployees(result);
  }, [filters, employees]);

  const handleAvailabilityChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      availability: e.target.value,
    }));
  };

  const handleSkillChange = (skill) => {
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSearchChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: e.target.value,
    }));
  };

  // Common skills list (you can expand this)
  const commonSkills = [
    "Cleaning",
    "Gardening",
    "Painting",
    "Moving",
    "Assembly",
    "Maintenance",
    "Pet Care",
    "Errands",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-purple-900 flex items-center justify-center py-6 px-4">
      <div className="max-w-7xl w-full rounded-lg p-8 shadow-lg">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-8 glitter-effect text-center">
          Find Help
        </h1>

        {/* Filters Section */}
        <div className="bg-black/30 rounded-full backdrop-blur-xl border border-gray-800  p-6 mb-8">
          {/* Search Bar and Availability Filter */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search by name or skill..."
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={filters.searchQuery}
                onChange={handleSearchChange}
                aria-label="Search employees by name or skill"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            {/* Availability Filter */}
            <div className="w-full md:w-1/3">
              <select
                className="w-full px-4 py-2 bg-black/50 border rounded-full border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={filters.availability}
                onChange={handleAvailabilityChange}
                aria-label="Filter by availability"
              >
                <option value="all">All Availability</option>
                <option value="available">Available Now</option>
                <option value="busy">Busy</option>
                <option value="away">Away</option>
              </select>
            </div>
          </div>

          {/* Skills Filter */}
          <div className="mt-4 flex flex-col items-center w-full">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {commonSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillChange(skill)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                    filters.skills.includes(skill)
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Employees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center text-white text-lg">
              Loading employees...
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="col-span-full text-center text-white text-lg">
              No employees found with the current filters.
            </div>
          ) : (
            filteredEmployees.map((employee) => (
              <div
                key={employee._id}
                className="bg-black/30 backdrop-blur-xl border border-gray-800 rounded-lg overflow-hidden transition-all duration-200 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {employee.name}
                      </h3>
                      <p className="text-sm text-gray-400">{employee.email}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        {
                          available: "bg-green-500/20 text-green-400",
                          busy: "bg-red-500/20 text-red-400",
                          away: "bg-yellow-500/20 text-yellow-400",
                        }[employee.availability] ||
                        "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {employee.availability}
                    </span>
                  </div>

                  {employee.skills && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {employee.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <button
                      className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/50"
                      onClick={() => {
                        console.log("Contact employee:", employee._id);
                      }}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProvideHelp;

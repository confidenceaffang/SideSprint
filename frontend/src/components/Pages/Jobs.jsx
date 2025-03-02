import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState(50); 
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get("/postJob");
      setJobs(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch jobs. Please try again later.");
      setLoading(false);
      console.error("Error fetching jobs:", err);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-8 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <select
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="10">Within 10 miles</option>
              <option value="25">Within 25 miles</option>
              <option value="50">Within 50 miles</option>
              <option value="100">Within 100 miles</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={() => navigate(`/job/${job._id}`)}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.job}</h2>
            <p className="text-gray-600 mb-4">{job.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                ${job.wage}/hr
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {job.hours} hours
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {job.schedule}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              <p>Posted by: {job.postedBy}</p>
              <p>Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No jobs found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Jobs;

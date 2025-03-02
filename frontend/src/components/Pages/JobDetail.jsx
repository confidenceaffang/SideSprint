import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await api.get(`/postJob/${id}`);
        setJob(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch job details. Please try again later.");
        setLoading(false);
        console.error("Error fetching job details:", err);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
            {error || "Job not found"}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          ← Back to Jobs
        </button>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-white/20">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-white mb-4">{job.job}</h1>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
                ${job.wage}/hr
              </span>
              <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                {job.hours} hours
              </span>
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                {job.schedule}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Description
                </h2>
                <p className="text-gray-300 whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Requirements
                </h2>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {job.requirements?.map((req, index) => (
                    <li key={index}>{req}</li>
                  )) || <li>No specific requirements listed</li>}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <p>Posted by: {job.postedBy}</p>
                    <p>Location: {job.location}</p>
                  </div>
                  <div className="text-right">
                    <p>
                      Posted on: {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                    <p>Job ID: {job._id}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => {
                    // Handle apply logic here
                    console.log("Applying for job:", job._id);
                  }}
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;

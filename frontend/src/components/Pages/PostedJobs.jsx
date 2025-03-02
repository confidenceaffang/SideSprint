import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Mock data for posted jobs and applicants
const mockPostedJobs = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'Tech Corp',
    location: 'Remote',
    jobType: 'Full-time',
    salary: '$120k - $150k',
    status: 'active',
    description: 'We are looking for an experienced React developer to join our team.',
    applicants: [
      { id: 1, name: 'Jane Smith', experience: '5 years', status: 'pending' },
      { id: 2, name: 'Mike Johnson', experience: '7 years', status: 'interviewed' },
    ],
  },
  {
    id: 2,
    title: 'UX Designer',
    company: 'Design Studio',
    location: 'Hybrid',
    jobType: 'Contract',
    salary: '$80k - $100k',
    status: 'completed',
    description: 'Seeking a talented UX designer for our growing team.',
    applicants: [
      { id: 3, name: 'Sarah Wilson', experience: '3 years', status: 'accepted' },
      { id: 4, name: 'Tom Brown', experience: '4 years', status: 'rejected' },
    ],
  },
];

const PostedJobs = () => {
  const [postedJobs, setPostedJobs] = useState(mockPostedJobs);
  const [selectedJob, setSelectedJob] = useState(null);

  const toggleJobStatus = (jobId) => {
    setPostedJobs(postedJobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          status: job.status === 'active' ? 'completed' : 'active'
        };
      }
      return job;
    }));
  };

  const handleJobClick = (job) => {
    setSelectedJob(selectedJob?.id === job.id ? null : job);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Posted Jobs</h2>
      <div className="grid grid-cols-1 gap-6">
        {postedJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className={`p-6 cursor-pointer ${job.status === 'completed' ? 'bg-gray-50' : ''}`}
              onClick={() => handleJobClick(job)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {job.location} | {job.jobType} | {job.salary}
                  </p>
                  <p className="text-gray-700 mt-2">{job.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleJobStatus(job.id);
                    }}
                    className="text-2xl hover:opacity-75 transition-opacity"
                  >
                    {job.status === 'active' ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {selectedJob?.id === job.id && (
                <div className="mt-6 border-t pt-4">
                  <h4 className="text-lg font-semibold mb-4">Applicants</h4>
                  <div className="space-y-4">
                    {job.applicants.map((applicant) => (
                      <div
                        key={applicant.id}
                        className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{applicant.name}</p>
                          <p className="text-gray-600 text-sm">Experience: {applicant.experience}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(applicant.status)}`}
                        >
                          {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'interviewed':
      return 'bg-blue-100 text-blue-800';
    case 'accepted':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default PostedJobs;
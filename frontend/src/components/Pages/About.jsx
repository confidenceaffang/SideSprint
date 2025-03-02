import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 via-blue-600 to-black flex items-center justify-center p-6">
      <div className="max-w-4xl p-8">
        <h1 className="text-4xl font-bold text-gray-300 text-center">
          About Our Platform
        </h1>
        <p className="mt-4 text-gray-300 text-lg text-center">
          Built at a Hackathon at{" "}
          <span className="font-semibold">
            University of Nebraska-Lincoln (UNL)
          </span>
          , our platform connects people who need small tasks done with those
          willing to help.
        </p>
        <div className="mt-8 space-y-6">
          <div className="p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-300">
              How It Works
            </h2>
            <p className="text-gray-300 mt-2">
              Simply post a job or browse available tasks. Whether it’s data
              entry, social media help, or basic design work, you’ll find quick
              gigs with ease.
            </p>
          </div>
          <div className="p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-300">
              Why Use Our Platform?
            </h2>
            <p className="text-gray-300 mt-2">
              We make it easy to get recommendations and build credibility. The
              more tasks you complete, the better your reputation becomes!
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <a
            href="/jobs"
            className="px-6 py-3 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition"
          >
            Start Finding Jobs
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;

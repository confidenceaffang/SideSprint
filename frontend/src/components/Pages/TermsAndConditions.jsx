import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 via-blue-600 to-black flex items-center justify-center p-6">
      <div className="max-w-4xl p-8">
        <h1 className="text-4xl font-bold text-gray-300 text-center">
          Terms & Conditions
        </h1>
        <p className="mt-4 text-gray-300 text-lg text-center">
          By using our platform, you agree to the following terms and
          conditions.
        </p>
        <div className="mt-8 space-y-6">
          <div className="p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-300">
              1. Fair Use
            </h2>
            <p className="text-gray-300 mt-2">
              Users must engage respectfully and fairly. Any misuse, spamming,
              or fraudulent activity will result in account suspension.
            </p>
          </div>
          <div className="p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-300">
              2. No Guarantees
            </h2>
            <p className="text-gray-300 mt-2">
              We do not guarantee job availability, payments, or employer
              reliability. Users must exercise caution when accepting tasks.
            </p>
          </div>
          <div className="p-4 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-300">
              3. Privacy & Data
            </h2>
            <p className="text-gray-300 mt-2">
              Your data will not be shared without consent. However, public
              profiles and reviews will be visible to all users.
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <a
            href="/"
            className="px-6 py-3 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

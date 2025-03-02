import React, { useState, useEffect } from "react";
import { GrUpdate } from "react-icons/gr";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/postJob");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        console.log("Data fetched:", result);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {data &&
        data.map((job, index) => (
          <div key={index}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
          </div>
        ))}
    </div>
  );
};

const user = {
  profilePicture: "https://via.placeholder.com/150",
  name: "John Doe",
  role: "Software Developer",
  email: "john.doe@example.com",
  phone: "+1 234 567 890",
  skills: ["JavaScript", "React", "Node.js", "CSS"],
  appliedJobs: [
    { title: "Software Engineer", company: "Tech Corp", status: "Pending" },
    {
      title: "Product Manager",
      company: "Innovate Ltd.",
      status: "Interviewing",
    },
  ],
};

// const Dashboard = () => {
//   const { role } = useParams();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [jobsPerPage] = useState(6);

//   // const filteredJobs = jobs.filter((job) => {
//   //   return (
//   //     job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //     job.company.toLowerCase().includes(searchTerm.toLowerCase())
//   //   );
//   // });

//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   // const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const switchRole = () => {
//     const newRole = role === "employee" ? "employer" : "employee";
//     navigate(`/dashboard/${newRole}`);
//   };

//   return (
//     <div className="container p-4">
//       <div className="flex w-screen">
//         <div className="hidden md:flex md:w-64 md:flex-col">
//           <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
//             <div className="flex items-center flex-shrink-0 px-4">
//               <img className="w-auto h-10" src={logo} alt="Logo" />
//               <h1 className="italic text-2xl font-semibold">Side Sprint</h1>
//             </div>

//             <div className="px-4 mt-8">
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <svg
//                     className="w-5 h-5 text-gray-400"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </div>
//                 <input
//                   type="search"
//                   className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
//                   placeholder="Search here"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="px-4 mt-6">
//               <hr className="border-gray-200" />
//             </div>

//             <div className="flex flex-col flex-grow flex-1 px-3 mt-6">
//               <div className="space-y-4">
//                 <nav className="flex-1 space-y-2">
//                   <Link
//                     to="#"
//                     className="flex items-center px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-indigo-600 rounded-lg group"
//                   >
//                     <svg
//                       className="flex-shrink-0 w-5 h-5 mr-4 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                       />
//                     </svg>
//                     Dashboard
//                   </Link>
//                 </nav>

//                 <hr className="border-gray-200" />

//                 <nav className="flex-1 space-y-2">
//                   <Link
//                     to="#"
//                     className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
//                   >
//                     <svg
//                       className="flex-shrink-0 w-5 h-5 mr-4"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
//                       />
//                     </svg>
//                     Inbox
//                   </Link>

//                   {role === "employer" && (
//                     <Link
//                       to="#"
//                       className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
//                     >
//                       <svg
//                         className="flex-shrink-0 w-5 h-5 mr-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                         />
//                       </svg>
//                       Posted Jobs
//                     </Link>
//                   )}
//                   {role === "employer" && (
//                     <Link
//                       to="#"
//                       className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
//                     >
//                       <svg
//                         className="flex-shrink-0 w-5 h-5 mr-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                         />
//                       </svg>
//                       Post Jobs
//                     </Link>
//                   )}

//                   <Link
//                     to="#"
//                     className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group"
//                   >
//                     <svg
//                       className="flex-shrink-0 w-5 h-5 mr-4"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//                       />
//                     </svg>
//                     Saved Jobs
//                   </Link>
//                 </nav>

//                 <hr className="border-gray-200" />
//               </div>

//               <div className="relative mt-6 group">
//                 <button
//                   type="button"
//                   className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100"
//                 >
//                   <img
//                     className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full"
//                     src={user.profilePicture}
//                     alt="Profile"
//                   />
//                   {user.name}
//                   <svg
//                     className="w-5 h-5 ml-auto"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M8 9l4-4 4 4m0 6l-4 4-4-4"
//                     />
//                   </svg>
//                 </button>

//                 <div className="absolute bottom-full mb-2 w-48 bg-gray-700 border border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                   <ul className="py-2">
//                     <li>
//                       <Link
//                         to="/dashboard/profile"
//                         className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
//                       >
//                         Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <button
//                         onClick={switchRole}
//                         className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white text-left"
//                       >
//                         <div className="flex items-center space-x-2">
//                           <GrUpdate className="text-xl" />
//                           <span>
//                             Switch to{" "}
//                             {role === "employee" ? "Employer" : "Employee"}
//                           </span>
//                         </div>
//                       </button>
//                     </li>
//                     <li>
//                       <button className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white text-left">
//                         Log Out
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="w-3/4 p-4">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-2xl font-semibold">
//               {role === "employee" ? "My Applications" : "Manage Jobs"}
//             </h2>
//           </div>
//           {role === "employee" && (
//             <div id="myApplications" className="mb-8">
//               <div className="space-y-4">
//                 {user.appliedJobs.map((job, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-100 p-4 rounded-lg shadow-md"
//                   >
//                     <h3 className="font-semibold">
//                       {job.title} - {job.company}
//                     </h3>
//                     <p>
//                       Status:{" "}
//                       <span
//                         className={
//                           job.status === "Interviewing"
//                             ? "text-green-500"
//                             : "text-yellow-500"
//                         }
//                       >
//                         {job.status}
//                       </span>
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//           {/* <div id="jobSearch" className="mb-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {currentJobs.map((job, index) => (
//                 <JobCard key={index} {...job} />
//               ))}
//             </div> */}

//             <div className="flex justify-center mt-8">
//               <button
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               {Array.from(
//                 { length: Math.ceil(filteredJobs.length / jobsPerPage) },
//                 (_, i) => (
//                   <button
//                     key={i + 1}
//                     onClick={() => paginate(i + 1)}
//                     className={`px-4 py-2 mx-1 text-sm font-medium ${
//                       currentPage === i + 1
//                         ? "text-white bg-indigo-600"
//                         : "text-gray-700 bg-gray-200"
//                     } rounded-lg`}
//                   >
//                     {i + 1}
//                   </button>
//                 )
//               )}
//               <button
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={
//                   currentPage === Math.ceil(filteredJobs.length / jobsPerPage)
//                 }
//                 className="px-4 py-2 mx-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>);
// };

// const JobCard = ({
//   title,
//   company,
//   location,
//   jobType,
//   salary,
//   description,
// }) => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border">
//       <h3 className="text-xl font-semibold">{title}</h3>
//       <p className="text-gray-600">{company}</p>
//       <p className="text-gray-500">
//         {location} | {jobType}
//       </p>
//       <p className="text-gray-400">{salary}</p>
//       <p className="mt-2 text-gray-700">{description}</p>
//       <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md">
//         Apply
//       </button>
//     </div>
//   );
// };

export default Dashboard;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Dashboard from "./components/Pages/Dashboard";
import Profile from "./components/Pages/Profile";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import OnboardingForm from "./components/Pages/OnboardingForm";
import About from "./components/Pages/About";
import TermsAndConditions from "./components/Pages/TermsAndConditions";
import Inbox from "./components/Pages/Inbox";
import Jobs from "./components/Pages/Jobs";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import PostJob from "./components/Pages/PostJob";
import AskForHelp from "./components/Pages/AskForHelp";
import PostedJobs from "./components/Pages/PostedJobs";
import JobDetail from "./components/Pages/JobDetail";
import ProvideHelp from "./components/Pages/ProvideHelp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:role" element={<Dashboard />} />
        <Route path="/dashboard/postjobs" element={<PostJob />} />
        <Route path="/dashboard/postedjobs" element={<PostedJobs />} />
        <Route path="/dashboard/askforhelp" element={<AskForHelp />} />
        <Route path="/dashboard/providehelp" element={<ProvideHelp />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/inbox" element={<Inbox />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/onboarding" element={<OnboardingForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/terms&conditions" element={<TermsAndConditions />} />
        <Route path="/job/:id" element={<JobDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

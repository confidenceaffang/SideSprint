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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:role" element={<Dashboard />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<OnboardingForm />} />
        <Route path="/" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms&conditions" element={<TermsAndConditions />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

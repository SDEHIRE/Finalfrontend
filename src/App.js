import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./components/context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./components/Landing";
import ExplorePage from "./components/ExplorePage";
import ProLanding from "./components/ProLandingPage";
import StudentLogin from "./components/student-login";
import CompanyLogin from "./components/recruiter-login";
import ComingSoon from "./components/TempPages/ComingSoon";
import EventsPage from "./components/TempPages/events";
import RequestDemo from "./components/TempPages/RequestDemo";
import Session from "./components/session-report";
import ProfilePage from "./components/profilepage";
import Practice from "./components/practice";
import RegisterPage from "./components/RegisterPage";
import VoiceInterview from "./components/VoiceInterview";
import GuidedPractice from "./components/guided practice";
import Sessions from "./components/session-reports";
import NoAccess from "./components/TempPages/Noacess";
import Dashboard from "./components/Dashboard";
import Cariculam from "./components/curriculum";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/Sdehire-pro-landing" element={<ProLanding />} />
          <Route path="/Sdehire-pro-Student-login" element={<StudentLogin />} />
          <Route path="/Sdehire-pro-Company-login" element={<CompanyLogin />} />
          <Route path="/ComingSoon" element={<ComingSoon />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/RequestDemo" element={<RequestDemo />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cc" element={<Cariculam/>}/>

          {/* Protected Routes */}
          <Route path="/profile" element={<ProtectedRoute element={ProfilePage} />} />
          <Route path="/SessionReport" element={<ProtectedRoute element={Session} />} />
          <Route path="/landing" element={<ProtectedRoute element={Practice} />} />
          <Route path="/guided" element={<ProtectedRoute element={GuidedPractice} />} />
          <Route path="/interview" element={<ProtectedRoute element={VoiceInterview} />} />
          <Route path="/SessionReportsteve" element={<ProtectedRoute element={Sessions} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />

          {/* Fallback Route */}
          <Route path="*" element={<NoAccess />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;


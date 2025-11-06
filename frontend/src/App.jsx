import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyManagement from "./pages/FacultyManagement";
import ClassProposal from "./pages/ClassProposal";
import FacultyDashboard from "./pages/FacultyDashboard";
import CommonLogin from "./pages/CommonLogin";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
  const isFaculty = localStorage.getItem("isFacultyLoggedIn") === "true";

  return (
  
      <Routes>
         {/* 🔓 Common login */}
        <Route path="/" element={<CommonLogin />} />

        {/* 🔒 Admin-only pages */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-faculty"
          element={
            <ProtectedRoute role="admin">
              <FacultyManagement />
            </ProtectedRoute>
          }
        />

                <Route path="/admin/faculties" element={isAdmin ? <FacultyManagement /> : <Navigate to="/" replace />} />
        <Route path="/admin/proposals" element={isAdmin ? <ClassProposal /> : <Navigate to="/" replace />} />

        {/* 🔒 Faculty-only pages */}
        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute role="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
        
          
  
  );
}

export default App;

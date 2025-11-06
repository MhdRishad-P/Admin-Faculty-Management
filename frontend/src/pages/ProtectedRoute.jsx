import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
  const isFaculty = localStorage.getItem("isFacultyLoggedIn") === "true";

  // 🔒 Check if user is allowed
  if (role === "admin" && !isAdmin) return <Navigate to="/" />;
  if (role === "faculty" && !isFaculty) return <Navigate to="/" />;

  // ✅ If valid, render the page
  return children;
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MashMagicLogo from '../assets/MashMagicLogo.png';

export default function CommonLogin() {
  const [role, setRole] = useState("admin"); // admin or faculty
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const payload =
      role === "admin"
        ? { username: name, password } // backend expects username for admin
        : { name, password }; // backend expects name for faculty

    const url =
      role === "admin"
        ? "http://localhost:8080/api/admin/login"
        : "http://localhost:8080/api/faculty/login";

    try {
      const res = await axios.post(url, payload);
      console.log("✅ Login successful:", res.data);

      if (role === "admin") {
        localStorage.setItem("isAdminLoggedIn", "true");
        navigate("/admin/dashboard");
      } else {
        localStorage.setItem("isFacultyLoggedIn", "true");
        localStorage.setItem("facultyId", res.data.id);
        localStorage.setItem("facultyName", res.data.name);
        localStorage.setItem("facultyRank", res.data.facultyRank);
        navigate("/faculty/dashboard");
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      if (err.response?.status === 401) {
        setError("Invalid credentials. Please try again.");
      } else {
        setError("Server error. Please check backend connection.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-green-50 to-gray-100">
      {/* Left Section - Logo & Tagline */}
      <div className="flex flex-col items-center justify-center md:w-1/2 text-center px-6 py-10 md:py-20">
        <img
          src={MashMagicLogo}
          alt="Mash Magic Logo"
          className="w-28 h-28 md:w-36 md:h-36 mb-4 animate-bounce-slow"
        />
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Mash Magic Faculty Matching System
        </h1>
        <p className="text-gray-700 text-lg md:text-xl">
         
        </p>
      </div>

      {/* Right Section - Login Card */}
      <div className="md:w-1/2 flex justify-center w-full p-6">
        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-gray-100 transform transition duration-300 hover:scale-[1.02]">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
            {role === "admin" ? "Admin Login" : "Faculty Login"}
          </h2>

          {/* Role Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setRole("admin")}
              className={`px-6 py-2 rounded-l-full font-medium transition-all duration-200 ${
                role === "admin"
                  ? "bg-gray-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setRole("faculty")}
              className={`px-6 py-2 rounded-r-full font-medium transition-all duration-200 ${
                role === "faculty"
                  ? "bg-gray-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Faculty
            </button>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-600 text-center mb-4 font-medium animate-pulse">
              {error}
            </p>
          )}

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="text"
              placeholder={
                role === "admin" ? "Admin Username" : "Faculty Name"
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500 text-sm">
            © 2025 Mash Magic | Empowering Faculty Excellence
          </p>
        </div>
      </div>
    </div>
  );
}

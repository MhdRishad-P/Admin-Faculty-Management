import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FacultyLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("➡️ Sending login request", { name, password });


    try {
      const res = await axios.post("http://localhost:8080/api/faculty/login", {
        name,
        password,
      });

      console.log("✅ Faculty login response:", res.data);

      // Save login info in localStorage
      localStorage.setItem("isFacultyLoggedIn", "true");
      localStorage.setItem("facultyId", res.data.id);
      localStorage.setItem("facultyName", res.data.name);
      localStorage.setItem("facultyRank", res.data.facultyRank);

      // Redirect to dashboard
      navigate("/faculty/dashboard");
    } catch (err) {
      console.error("❌ Faculty login failed:", err);
      setError("Invalid name or password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 to-indigo-300">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Faculty Login
        </h2>
        {error && (
          <p className="text-red-600 text-center mb-3 font-medium">{error}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="text"
            placeholder="Faculty Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

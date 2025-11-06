import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { LogOut } from "lucide-react"; // ✅ lucide-react icon

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const facultyId = localStorage.getItem("facultyId");
  const facultyName = localStorage.getItem("facultyName");

  useEffect(() => {
    API.get("/faculty/proposals")
      .then((res) => setProposals(res.data))
      .catch((err) => console.error("Error fetching proposals", err));
  }, []);

  const handleInterested = async (proposalId) => {
    try {
      await API.post(`/faculty/interest/${facultyId}/${proposalId}`);
      alert("✅ Marked as interested!");
    } catch (err) {
      console.error("Error expressing interest", err);
      alert("❌ Failed to mark interest.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isFacultyLoggedIn");
    localStorage.removeItem("facultyId");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-200 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-700">
            Faculty Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome, <span className="font-semibold">{facultyName}</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 md:mt-5 rounded-lg font-medium shadow-md hover:bg-red-600 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Proposals Section */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            {proposals.length > 0
              ? `${proposals.length} proposals available`
              : "No proposals currently available"}
          </p>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm md:text-base">
            <thead className="bg-gray-600 text-white text-left">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Student</th>
                <th className="p-3 border">Class</th>
                <th className="p-3 border">Subject</th>
                <th className="p-3 border">Time</th>
                <th className="p-3 border">Language</th>
                <th className="p-3 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {proposals.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 font-medium"
                  >
                    No proposals available right now.
                  </td>
                </tr>
              ) : (
                proposals.map((p, index) => (
                  <tr
                    key={p.id}
                    className="hover:bg-green-50 transition-colors text-center border-b"
                  >
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{p.studentName}</td>
                    <td className="p-3 border">{p.className}</td>
                    <td className="p-3 border">{p.subject}</td>
                    <td className="p-3 border">{p.time}</td>
                    <td className="p-3 border">{p.language}</td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => handleInterested(p.id)}
                        className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 transition-all shadow-sm"
                      >
                        Interested
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

  
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, ClipboardList, Shield } from "lucide-react"; // ✅ lucide-react icons

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-green-100 p-6 md:p-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, Admin 👋</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-red-600 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {/* Faculty Management */}
        <div className="p-6 md:p-8 bg-white border border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center mb-5 space-x-4">
            <div className="bg-blue-500 text-white p-3 rounded-full shadow-md">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-blue-700">
              Manage Faculties
            </h2>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Add, view, and manage all registered faculty members. Assign ranks and teaching responsibilities.
          </p>

          <button
            onClick={() => navigate("/admin/faculties")}
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
          >
            Go to Faculty Management
          </button>
        </div>

        {/* Class Proposals */}
        <div className="p-6 md:p-8 bg-white border border-blue-100 shadow-xl rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center mb-5 space-x-4">
            <div className="bg-blue-500 text-white p-3 rounded-full shadow-md">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-semibold text-blue-700">
              Class Proposals
            </h2>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Create and manage class proposals shared with faculties. Review interested faculties ranked by category.
          </p>

          <button
            onClick={() => navigate("/admin/proposals")}
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
          >
            Go to Proposals
          </button>
        </div>
      </div>

    </div>
  );
}

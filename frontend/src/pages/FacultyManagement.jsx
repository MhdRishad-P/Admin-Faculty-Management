import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // ✅ lucide-react icon

export default function ManageFaculty() {
  const [faculties, setFaculties] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    teachingSubjects: "",
    teachingClasses: "",
    whatsappNumber: "",
    syllabus: "",
    facultyRank: "CLASSIC",
    password: "",
  });
  const navigate = useNavigate();

  // ✅ Fetch all faculties
  const fetchFaculties = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/faculties");
      setFaculties(res.data);
    } catch (err) {
      console.error("❌ Error fetching faculties:", err);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add new faculty
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/admin/add-faculty", formData);
      setFormData({
        name: "",
        teachingSubjects: "",
        teachingClasses: "",
        facultyRank: "CLASSIC",
        password: "",
        whatsappNumber: "",
        syllabus: "",
      });
      fetchFaculties();
      alert("✅ Faculty added successfully!");
    } catch (err) {
      console.error("❌ Error adding faculty:", err);
      alert("Error adding faculty.");
    }
  };

  // ✅ Delete faculty
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this faculty?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/admin/faculty/${id}`);
      fetchFaculties();
    } catch (err) {
      console.error("❌ Error deleting faculty:", err);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700">Manage Faculties</h1>
        <button
      onClick={() => navigate("/admin/dashboard")}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Add Faculty Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-green-600">
          Add New Faculty
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Faculty Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 border rounded-md focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Faculty Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-2 border rounded-md focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="teachingSubjects"
            placeholder="Subjects (comma separated)"
            value={formData.teachingSubjects}
            onChange={handleChange}
            className="p-2 border rounded-md focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="teachingClasses"
            placeholder="Classes (comma separated)"
            value={formData.teachingClasses}
            onChange={handleChange}
            className="p-2 border rounded-md focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="syllabus"
            placeholder="Enter Syllabus"
            value={formData.syllabus}
            onChange={handleChange}
            className="p-2 border rounded-md focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="whatsappNumber"
            placeholder="Enter WhatsApp Number"
            value={formData.whatsappNumber}
            onChange={handleChange}
            className="p-2 border rounded-md focus:ring-2 focus:ring-green-400"
            />
          <select
            name="facultyRank"
            value={formData.facultyRank}
            onChange={handleChange}
            className="p-2 border rounded-md focus:ring-2 focus:ring-green-400"
          >
            <option value="ELITE">Elite</option>
            <option value="PRO">Pro</option>
            <option value="CLASSIC">Classic</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all md:col-span-2"
          >
            Add Faculty
          </button>
        </form>
      </div>

      {/* Faculties Table */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-600">
          All Faculties
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Classes</th>
                <th className="py-2 px-4 border-b">Subjects</th>
                <th className="py-2 px-4 border-b">Syllabus</th>
                <th className="py-2 px-4 border-b">WhatsApp Number</th>
                <th className="py-2 px-4 border-b">Rank</th>
                <th className="py-2 px-4 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {faculties.map((f, index) => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{f.name}</td>
                  <td className="py-2 px-4 border-b">{f.teachingClasses}</td>
                  <td className="py-2 px-4 border-b">{f.teachingSubjects}</td>
                  <td className="py-2 px-4 border-b">{f.syllabus}</td>
                  <td className="py-2 px-4 border-b">{f.whatsappNumber}</td>
                  <td className="py-2 px-4 border-b">{f.facultyRank}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {faculties.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No faculties added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

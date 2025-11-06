import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ClassProposal() {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState({
    studentName: "",
    className: "",
    subject: "",
    time: "",
    language: "",
  });

  // Fetch proposals
  const fetchProposals = async () => {
    try {
      const res = await API.get("/admin/proposals");
      setProposals(res.data);
    } catch (err) {
      console.error("Error fetching proposals", err);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/proposal", newProposal);
      setNewProposal({ studentName: "", className: "", subject: "", time: "", language: "" });
      fetchProposals();
    } catch (err) {
      console.error("Error adding proposal", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Class Proposals</h1>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Create New Proposal</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Student Name"
            value={newProposal.studentName}
            onChange={(e) => setNewProposal({ ...newProposal, studentName: e.target.value })}
            className="border border-gray-300 rounded-lg p-2"
            required
          />

          <input
            type="text"
            placeholder="Class"
            value={newProposal.className}
            onChange={(e) => setNewProposal({ ...newProposal, className: e.target.value })}
            className="border border-gray-300 rounded-lg p-2"
            required
          />

          <input
            type="text"
            placeholder="Subject"
            value={newProposal.subject}
            onChange={(e) => setNewProposal({ ...newProposal, subject: e.target.value })}
            className="border border-gray-300 rounded-lg p-2"
            required
          />

          <input
            type="text"
            placeholder="Time (e.g., 10:00 AM - 11:00 AM)"
            value={newProposal.time}
            onChange={(e) => setNewProposal({ ...newProposal, time: e.target.value })}
            className="border border-gray-300 rounded-lg p-2"
            required
          />

          <input
            type="text"
            placeholder="Language"
            value={newProposal.language}
            onChange={(e) => setNewProposal({ ...newProposal, language: e.target.value })}
            className="border border-gray-300 rounded-lg p-2"
            required
          />

          <button
            type="submit"
            className="sm:col-span-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Add Proposal
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Existing Proposals</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Student Name</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Language</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((p, index) => (
              <tr key={p.id} className="text-center hover:bg-gray-50">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{p.studentName}</td>
                <td className="p-2 border">{p.className}</td>
                <td className="p-2 border">{p.subject}</td>
                <td className="p-2 border">{p.time}</td>
                <td className="p-2 border">{p.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

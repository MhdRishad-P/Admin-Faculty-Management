import React, { useState } from 'react';
import API from '../services/api';

export default function ViewInterests(){
  const [proposalId, setProposalId] = useState('');
  const [interests, setInterests] = useState([]);

  async function fetchInterests(e){
    e.preventDefault();
    const token = localStorage.getItem('admin-token');
    if(!token) { alert('Not authenticated'); return; }
    try {
      const res = await API.get(`/admin/proposals/${proposalId}/interests`, { headers: { 'X-ADMIN-TOKEN': token }});
      setInterests(res.data);
    } catch (err) {
      alert('Error fetching interests: ' + (err?.response?.data?.error || err.message));
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-4">View Interested Faculties</h3>
      <form onSubmit={fetchInterests} className="flex gap-3 mb-4">
        <input className="input" placeholder="Proposal ID" value={proposalId} onChange={e=>setProposalId(e.target.value)} />
        <button className="btn" type="submit">Fetch</button>
      </form>

      <div className="space-y-3">
        {interests.map(i => (
          <div key={i.id} className="border p-3 rounded">
            <div className="font-semibold">{i.faculty.name} <span className="text-sm text-gray-500">({i.faculty.rank})</span></div>
            <div className="text-sm text-gray-600">Classes: {i.faculty.teachingClasses}</div>
            <div className="text-sm text-gray-600">Subjects: {i.faculty.teachingSubjects}</div>
            <div className="text-sm text-gray-400">Expressed at: {i.expressedAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import API from '../services/api';

export default function AddFaculty(){
  const [name, setName] = useState('');
  const [classes, setClasses] = useState('');
  const [subjects, setSubjects] = useState('');
  const [rank, setRank] = useState('CLASSIC');
  const [password, setPassword] = useState('');

  async function submit(e){
    e.preventDefault();
    const token = localStorage.getItem('admin-token');
    if(!token){ alert('Not authenticated'); return; }
    try {
      const payload = { name, teachingClasses: classes, teachingSubjects: subjects, rank, password };
      const res = await API.post('/admin/faculties', payload, { headers: { 'X-ADMIN-TOKEN': token }});
      alert(`Faculty created. Share this token with the faculty for login:\n\n${res.data.authToken}`);
      setName(''); setClasses(''); setSubjects(''); setPassword('');
    } catch (err) {
      alert('Error creating faculty: ' + (err?.response?.data?.error || err.message));
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-4">Add Faculty</h3>
      <form onSubmit={submit} className="grid gap-3">
        <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Teaching Classes (comma separated)" value={classes} onChange={e=>setClasses(e.target.value)} />
        <input className="input" placeholder="Teaching Subjects (comma separated)" value={subjects} onChange={e=>setSubjects(e.target.value)} />
        <select className="input" value={rank} onChange={e=>setRank(e.target.value)}>
          <option value="ELITE">ELITE</option>
          <option value="PRO">PRO</option>
          <option value="CLASSIC">CLASSIC</option>
        </select>
        <input className="input" placeholder="Password (for faculty login)" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn">Create Faculty</button>
      </form>
    </div>
  );
}

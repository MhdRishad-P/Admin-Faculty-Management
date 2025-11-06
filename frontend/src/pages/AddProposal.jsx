import React, { useState } from 'react';
import API from '../services/api';

export default function AddProposal() {
  const [student, setStudent] = useState('');
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [language, setLanguage] = useState('English');

  async function submit(e){
    e.preventDefault();
    const token = localStorage.getItem('admin-token');
    if(!token){ alert('Not authenticated'); return; }
    try {
      const payload = { studentName: student, className, subject, time, language };
      await API.post('/admin/proposals', payload, { headers: { 'X-ADMIN-TOKEN': token }});
      alert('Proposal created');
      setStudent(''); setClassName(''); setSubject(''); setTime(''); setLanguage('English');
    } catch (err) {
      alert('Error creating proposal');
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-4">Create Class Proposal</h3>
      <form onSubmit={submit} className="grid gap-3">
        <input className="input" placeholder="Student name" value={student} onChange={e=>setStudent(e.target.value)} />
        <input className="input" placeholder="Class" value={className} onChange={e=>setClassName(e.target.value)} />
        <input className="input" placeholder="Subject" value={subject} onChange={e=>setSubject(e.target.value)} />
        <input className="input" placeholder="Time (e.g. 2025-11-05 10:00)" value={time} onChange={e=>setTime(e.target.value)} />
        <input className="input" placeholder="Language" value={language} onChange={e=>setLanguage(e.target.value)} />
        <button className="btn">Create Proposal</button>
      </form>
    </div>
  );
}

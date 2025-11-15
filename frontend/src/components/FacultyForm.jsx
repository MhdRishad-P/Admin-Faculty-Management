// frontend/src/components/FacultyForm.jsx
import React, {useState, useEffect} from 'react';

export default function FacultyForm({initial, onSave, onCancel}){
  const [state, setState] = useState({
    id: null, fullName: '', whatsappNumber: '',
    subjects: [], languageSkills: [], teachingGrades: [],
    availableHours: []
  });

  useEffect(()=> {
    if (initial) setState({
      ...initial,
      subjects: initial.subjects || [],
      languageSkills: initial.languageSkills || [],
      teachingGrades: initial.teachingGrades || [],
      availableHours: initial.availableHours || []
    });
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(state);
  };

  const addSlot = () => {
    setState(s => ({...s, availableHours: [...s.availableHours, {from:'09:00', to:'11:00'}]}));
  };

  const updateSlot = (i, k, v) => {
    const slots = [...state.availableHours]; slots[i][k]=v; setState({...state, availableHours: slots});
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <input value={state.fullName} onChange={e=>setState({...state, fullName:e.target.value})}
             className="border p-2 w-full mb-2" placeholder="Full name" required />
      <input value={state.whatsappNumber} onChange={e=>setState({...state, whatsappNumber:e.target.value})}
             className="border p-2 w-full mb-2" placeholder="+919876543210" required />
      <input value={(state.subjects||[]).join(',')} onChange={e=>setState({...state, subjects: e.target.value.split(',').map(s=>s.trim())})}
             className="border p-2 w-full mb-2" placeholder="Subjects (comma separated)" />
      <input value={(state.languageSkills||[]).join(',')} onChange={e=>setState({...state, languageSkills: e.target.value.split(',').map(s=>s.trim())})}
             className="border p-2 w-full mb-2" placeholder="Languages (comma separated)" />
      <input value={(state.teachingGrades||[]).join(',')} onChange={e=>setState({...state, teachingGrades: e.target.value.split(',').map(s=>s.trim())})}
             className="border p-2 w-full mb-2" placeholder="Grades (comma separated)" />

      <div className="mb-2">
        <label className="font-semibold">Available Time Slots</label>
        {(state.availableHours||[]).map((slot,i)=>(
          <div key={i} className="flex space-x-2 items-center mt-1">
            <input type="time" value={slot.from} onChange={e=>updateSlot(i,'from',e.target.value)} className="border p-1"/>
            <span>—</span>
            <input type="time" value={slot.to} onChange={e=>updateSlot(i,'to',e.target.value)} className="border p-1"/>
          </div>
        ))}
        <button type="button" onClick={addSlot} className="mt-2 text-sm text-blue-600">+ Add slot</button>
      </div>

      <div className="flex space-x-2">
        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
        <button type="button" onClick={onCancel} className="px-3 py-1 border rounded">Cancel</button>
      </div>
    </form>
  );
}

// frontend/src/components/FacultyManagement.jsx
import React, {useEffect, useState} from 'react';
import api from '../api';
import FacultyForm from './FacultyForm';

export default function FacultyManagement(){
  const [faculties, setFaculties] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    try {
      const res = await api.getFaculties();
      setFaculties(res.data);
    } catch(e){ console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const onSave = async (dto) => {
    try {
      if (dto.id) await api.updateFaculty(dto.id, dto);
      else await api.addFaculty(dto);
      setShowForm(false); setEditing(null); load();
    } catch(e){ console.error(e); }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete faculty?')) return;
    await api.deleteFaculty(id);
    load();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Faculty Management</h2>
        <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={()=>{setShowForm(true); setEditing(null);}}>Add Faculty</button>
      </div>

      {showForm && <FacultyForm onCancel={()=>{setShowForm(false); setEditing(null);}} onSave={onSave} initial={editing} />}

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th>Name</th><th>Subjects</th><th>WhatsApp</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculties.map(f => (
            <tr key={f.id}>
              <td>{f.fullName}</td>
              <td>{(f.subjects || []).join(', ')}</td>
              <td>{f.whatsappNumber}</td>
              <td className="space-x-2">
                <button onClick={()=>{ setEditing(f); setShowForm(true); }} className="text-blue-600">Edit</button>
                <button onClick={()=>onDelete(f.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

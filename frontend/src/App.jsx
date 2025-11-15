// frontend/src/App.jsx
import React from 'react';
import FacultyManagement from './components/FacultyManagement';
import Matching from './components/Matching';

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Faculty Admin Dashboard</h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <FacultyManagement />
        </div>
        <div className="col-span-1">
          <Matching />
        </div>
      </main>
    </div>
  )
}

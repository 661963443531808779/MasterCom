import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function TestHome() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Test MasterCom
        </h1>
        <p className="text-gray-600 mb-8">
          Si tu vois cette page, l'application fonctionne !
        </p>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          ✅ Application fonctionnelle
        </div>
      </div>
    </div>
  );
}

function App() {
  console.log('🚀 App Test - Version ultra-simple');
  
  return (
    <Router>
      <Routes>
        <Route path="*" element={<TestHome />} />
      </Routes>
    </Router>
  );
}

export default App;

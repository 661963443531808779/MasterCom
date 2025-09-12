import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import CRM from './pages/CRM';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  console.log('🚀 App rendu - version simple');

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar 
          isLoggedIn={false} 
          userRole="client" 
          onLogout={() => {}} 
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login onLogin={() => {}} />} />
            <Route path="/crm" element={<CRM userRole="client" />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
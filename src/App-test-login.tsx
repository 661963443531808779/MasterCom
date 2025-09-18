import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

// Login ultra-simple pour test
function TestLogin({ onLogin }: { onLogin: (role: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔐 Test login avec:', email);
    onLogin('master');
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Test Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="test@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Se connecter (Test)
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Version de test - cliquez sur "Se connecter" pour continuer
        </p>
      </div>
    </div>
  );
}

// CRM de test
function TestCRM() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">CRM Test</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>✅ Page CRM fonctionne !</p>
      </div>
    </div>
  );
}

// Dashboard de test
function TestDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Test</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>✅ Page Dashboard fonctionne !</p>
      </div>
    </div>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('client');
  const navigate = useNavigate();

  const handleLogin = (role: string) => {
    console.log('🔐 Connexion test réussie avec le rôle:', role);
    setIsLoggedIn(true);
    setUserRole(role);

    if (role === 'master' || role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/crm');
    }
  };

  const handleLogout = () => {
    console.log('🚪 Déconnexion test');
    setIsLoggedIn(false);
    setUserRole('client');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLogout={handleLogout}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<TestLogin onLogin={handleLogin} />} />
          <Route path="/crm" element={<TestCRM />} />
          <Route path="/dashboard" element={<TestDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  console.log('🚀 App Test Login - Version de test');
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('client');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔍 AppContent useEffect - Début');
    // Simulation simple sans Supabase
    setTimeout(() => {
      console.log('🔍 AppContent useEffect - Fin');
      setIsLoading(false);
    }, 100);
  }, []);

  const handleLogin = (role: string) => {
    console.log('🔐 Connexion réussie avec le rôle:', role);
    setIsLoggedIn(true);
    setUserRole(role);

    if (role === 'master' || role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/crm');
    }
  };

  const handleLogout = () => {
    console.log('🚪 Déconnexion');
    setIsLoggedIn(false);
    setUserRole('client');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Chargement...</p>
        </div>
      </div>
    );
  }

  console.log('🔍 Rendu AppContent - isLoggedIn:', isLoggedIn, 'userRole:', userRole);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MasterCom - Sans Supabase</h1>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span>Rôle: {userRole}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Connexion
            </button>
          )}
        </div>
      </nav>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/crm" element={isLoggedIn ? <div className="p-8 text-center">CRM - En construction</div> : <Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isLoggedIn ? <div className="p-8 text-center">Dashboard - En construction</div> : <Login onLogin={handleLogin} />} />
        </Routes>
      </main>
      
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 MasterCom. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

function App() {
  console.log('🚀 App MasterCom - Version sans Supabase');
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

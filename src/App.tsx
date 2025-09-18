import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { supabase } from './services/supabase';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('client');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔍 AppContent useEffect - Début');
    const checkAuth = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setIsLoggedIn(true);
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*, roles(*)')
            .eq('id', user.id)
            .single();
          
          setUserRole(profile?.roles?.name || 'client');
        }
      } catch (error) {
        console.warn('Erreur vérification auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      console.log('🚪 Déconnexion');
      setIsLoggedIn(false);
      setUserRole('client');
      navigate('/');
    } catch (error) {
      console.error('Erreur déconnexion:', error);
    }
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
          <h1 className="text-xl font-bold">MasterCom</h1>
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
  console.log('🚀 App MasterCom - Version ultra-simple');
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
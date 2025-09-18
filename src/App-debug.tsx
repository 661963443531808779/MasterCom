import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('client');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔍 AppContent useEffect - Début');
    try {
      // Simulation simple sans Supabase
      setTimeout(() => {
        console.log('🔍 AppContent useEffect - Fin');
        setIsLoading(false);
      }, 100);
    } catch (error) {
      console.error('❌ Erreur dans useEffect:', error);
      setIsLoading(false);
    }
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
          <h1 className="text-xl font-bold">MasterCom Debug</h1>
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
              onClick={() => handleLogin('client')}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Connexion Test
            </button>
          )}
        </div>
      </nav>
      
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Page de Test MasterCom
          </h2>
          
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">État de l'application :</h3>
            <ul className="space-y-2">
              <li>✅ React fonctionne</li>
              <li>✅ Router fonctionne</li>
              <li>✅ État de connexion: {isLoggedIn ? 'Connecté' : 'Non connecté'}</li>
              <li>✅ Rôle utilisateur: {userRole}</li>
              <li>✅ Chargement terminé</li>
            </ul>
          </div>

          {isLoggedIn && (
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Interface connectée :</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/crm')}
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                  Accéder au CRM
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
                >
                  Accéder au Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function App() {
  console.log('🚀 App Debug - Version de test');
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import des composants
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Login from './pages/Login';
import CRM from './pages/CRM';
import Dashboard from './pages/Dashboard';

// Types d'authentification
interface User {
  id: string;
  email: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
  };
}

// Composant de chargement
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="text-gray-600 mt-4">Chargement...</p>
    </div>
  </div>
);

// Composant de protection des routes
const ProtectedRoute = ({ children, user }: { children: React.ReactNode; user: User | null }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('🚀 App MasterCom - Version ultra-simple');

  // Initialiser l'authentification
  useEffect(() => {
    console.log('🔍 Initialisation de l\'authentification...');
    
    // Simuler un chargement
    const timer = setTimeout(() => {
      console.log('✅ Initialisation terminée');
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Gestion de la connexion (simulée)
  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('🔐 Tentative de connexion avec:', email);
      
      // Simuler une connexion réussie
      const mockUser: User = {
        id: '1',
        email: email,
        user_metadata: {
          first_name: 'Utilisateur',
          last_name: 'Test'
        }
      };
      
      setUser(mockUser);
      console.log('✅ Connexion simulée réussie');
      return mockUser;
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:', error);
      throw error;
    }
  };

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      console.log('🚪 Déconnexion en cours...');
      setUser(null);
      console.log('✅ Déconnexion réussie');
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
    }
  };

  // Affichage du chargement initial
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar
          isLoggedIn={!!user}
          userRole="client"
          onLogout={handleLogout}
        />

        <main className="min-h-screen">
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Route de connexion */}
            <Route 
              path="/login" 
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              } 
            />
            
            {/* Routes protégées */}
            <Route 
              path="/crm" 
              element={
                <ProtectedRoute user={user}>
                  <CRM userRole="client" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Route par défaut */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
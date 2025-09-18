import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('client');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier l'état de connexion au chargement
    const checkAuth = async () => {
      try {
        // Délai pour éviter les problèmes de chargement
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Import statique pour éviter les conflits
        const { authService } = require('./services/supabase');
        const user = await authService.getCurrentUser();
        
        if (user) {
          setIsLoggedIn(true);
          // Récupérer le profil utilisateur pour déterminer le rôle
          try {
            const profile = await authService.getUserProfile(user.id);
            setUserRole(profile.roles?.name || 'client');
          } catch (profileError) {
            console.warn('Erreur profil, utilisation du rôle par défaut:', profileError);
            setUserRole('client');
          }
        }
      } catch (error) {
        console.warn('Erreur lors de la vérification de l\'authentification:', error);
        // En cas d'erreur, on continue sans authentification
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
      const { authService } = require('./services/supabase');
      await authService.signOut();
      console.log('🚪 Déconnexion');
      setIsLoggedIn(false);
      setUserRole('client');
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="text-gray-600 mt-4">Chargement...</p>
        </div>
      </div>
    );
  }

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
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/crm" element={<CRM userRole={userRole} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  console.log('🚀 App MasterCom - Version avec AuthProvider');

  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
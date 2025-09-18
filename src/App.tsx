import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import Dashboard from './pages/Dashboard-simple';
import { supabase } from './services/supabase';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('client');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier l'état de connexion au chargement
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
    console.log('🔍 État avant connexion - isLoggedIn:', isLoggedIn, 'userRole:', userRole);
    setIsLoggedIn(true);
    setUserRole(role);
    console.log('🔍 État après connexion - isLoggedIn:', true, 'userRole:', role);

    if (role === 'master' || role === 'admin') {
      console.log('🔍 Redirection vers dashboard');
      navigate('/dashboard');
    } else {
      console.log('🔍 Redirection vers CRM');
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

  console.log('🔍 Rendu AppContent - isLoggedIn:', isLoggedIn, 'userRole:', userRole, 'pathname:', window.location.pathname);

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
          <Route path="/crm" element={isLoggedIn ? <CRM userRole={userRole} /> : <Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  console.log('🚀 App MasterCom - Version finale corrigée');
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
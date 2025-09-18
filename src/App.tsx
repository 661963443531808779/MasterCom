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
import Dashboard from './pages/Dashboard';
import { supabase } from './services/supabase';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('client');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🚀 App MasterCom - Initialisation complète');
    
    const checkAuth = async () => {
      try {
        console.log('🔍 Vérification de l\'authentification...');
        
        // Attendre un peu pour éviter les problèmes de timing
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.warn('Erreur auth:', error);
          return;
        }
        
        if (user) {
          console.log('✅ Utilisateur connecté:', user.email);
          setIsLoggedIn(true);
          
          try {
            const { data: profile, error: profileError } = await supabase
              .from('user_profiles')
              .select('*, roles(*)')
              .eq('id', user.id)
              .single();
            
            if (profileError) {
              console.warn('Erreur profil:', profileError);
              setUserRole('client');
            } else {
              setUserRole(profile?.roles?.name || 'client');
              console.log('✅ Rôle utilisateur:', profile?.roles?.name || 'client');
            }
          } catch (profileError) {
            console.warn('Erreur récupération profil:', profileError);
            setUserRole('client');
          }
        } else {
          console.log('❌ Aucun utilisateur connecté');
        }
      } catch (error) {
        console.error('Erreur vérification auth:', error);
      } finally {
        setIsLoading(false);
        console.log('✅ Chargement terminé');
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
      console.log('🚪 Déconnexion...');
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setUserRole('client');
      navigate('/');
      console.log('✅ Déconnexion réussie');
    } catch (error) {
      console.error('Erreur déconnexion:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Chargement de MasterCom...</p>
        </div>
      </div>
    );
  }

  console.log('🔍 Rendu AppContent - isLoggedIn:', isLoggedIn, 'userRole:', userRole);

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        userRole={userRole} 
        onLogout={handleLogout}
      />
      
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route 
            path="/crm" 
            element={isLoggedIn ? <CRM userRole={userRole} /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />} 
          />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  console.log('🚀 App MasterCom - Version complète');
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
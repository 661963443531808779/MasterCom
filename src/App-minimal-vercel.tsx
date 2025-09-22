import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Composants de base uniquement
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages de base
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CRM from './pages/CRM';
import Blog from './pages/Blog';

// Import statique de Supabase
import { supabase } from './services/supabase';

// Types simples
interface User {
  id: string;
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('🚀 App MasterCom - Version Minimal Vercel');

  // Vérifier la session utilisateur
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('🔍 Vérification de la session...');
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Erreur session:', error.message);
          return;
        }

        if (session?.user) {
          console.log('✅ Session trouvée:', session.user.email);
          setUser(session.user);
        } else {
          console.log('ℹ️ Aucune session');
        }
      } catch (error) {
        console.error('❌ Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth change:', event);
        
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Gestion de la connexion
  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('🔐 Connexion:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Erreur:', error.message);
        throw error;
      }

      if (data.user) {
        console.log('✅ Connecté:', data.user.email);
        setUser(data.user);
        return data.user;
      }
    } catch (error: any) {
      console.error('❌ Erreur connexion:', error);
      throw error;
    }
  };

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      console.log('🚪 Déconnexion...');
      await supabase.auth.signOut();
      setUser(null);
      console.log('✅ Déconnecté');
    } catch (error) {
      console.error('❌ Erreur déconnexion:', error);
      setUser(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <Navbar 
          user={user} 
          userProfile={null} 
          onLogout={handleLogout}
        />

        {/* Contenu principal */}
        <main className="flex-1">
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            
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
              path="/dashboard" 
              element={
                user ? (
                  <Dashboard user={user} userProfile={null} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/crm" 
              element={
                user ? (
                  <CRM user={user} userProfile={null} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            {/* Route par défaut */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Pied de page */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

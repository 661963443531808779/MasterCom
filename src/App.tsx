import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Login from './pages/Login';
import CRM from './pages/CRM';
import Dashboard from './pages/Dashboard';

// Import Supabase avec gestion d'erreur robuste
import { supabase as supabaseClient } from './services/supabase';

let supabase: any = null;

try {
  supabase = supabaseClient;
  console.log('✅ Supabase initialisé dans App.tsx');
} catch (error) {
  console.warn('⚠️ Erreur initialisation Supabase dans App.tsx:', error);
  // Mock Supabase pour éviter les crashes
  supabase = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase non disponible' } }),
      signOut: async () => ({ error: null })
    }
  };
}

// Gestion d'erreur globale
window.addEventListener('error', (event) => {
  console.error('❌ Erreur globale:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Promesse rejetée:', event.reason);
  event.preventDefault(); // Empêche l'erreur de remonter
});

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('client');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🚀 App MasterCom - Initialisation');
    
    const checkAuth = async () => {
      try {
        console.log('🔍 Vérification de l\'authentification...');
        
        // Vérification avec timeout pour éviter les blocages
        const authPromise = supabase?.auth?.getUser ? supabase.auth.getUser() : Promise.resolve({ data: { user: null }, error: null });
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        );
        
        const result = await Promise.race([authPromise, timeoutPromise]) as any;
        const { data: { user }, error } = result || { data: { user: null }, error: null };
        
        if (error) {
          console.warn('⚠️ Erreur auth (non bloquante):', error.message);
        } else if (user) {
          console.log('✅ Utilisateur connecté:', user.email);
          setIsLoggedIn(true);
          setUserRole('client'); // Rôle par défaut pour éviter les erreurs
        } else {
          console.log('❌ Aucun utilisateur connecté');
        }
      } catch (error) {
        console.warn('⚠️ Erreur vérification auth (non bloquante):', error);
        // Continuer même en cas d'erreur
      } finally {
        setIsLoading(false);
        console.log('✅ Chargement terminé');
      }
    };

    // Délai pour éviter les problèmes de timing
    setTimeout(checkAuth, 100);
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

  // Gestion d'erreur globale
  if (hasError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Erreur de Chargement</h1>
          <p className="text-gray-600 mb-6">
            Une erreur s'est produite lors du chargement de l'application. Veuillez rafraîchir la page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Rafraîchir la Page
          </button>
        </div>
      </div>
    );
  }

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

  try {
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
  } catch (error) {
    console.error('❌ Erreur lors du rendu:', error);
    setHasError(true);
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Erreur de Rendu</h1>
          <p className="text-gray-600 mb-6">
            Une erreur s'est produite lors du rendu de l'application.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Rafraîchir la Page
          </button>
        </div>
      </div>
    );
  }
}

function App() {
  console.log('🚀 App MasterCom - Version complète');
  
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
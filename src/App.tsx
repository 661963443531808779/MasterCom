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
import LoginPage from './pages/LoginPage';
import CRM from './pages/CRM';
import MasterPanel from './components/MasterPanel';

// Composants avancés - réactivation progressive
import NotificationSystem from './components/NotificationSystem';
import GlobalSearch from './components/GlobalSearch';

// Import des services Supabase
import { authService, User as AuthUser } from './services/auth';

// Hooks avancés - version production simplifiée (stub implementations)
const useAnalytics = () => ({
  trackUserAction: () => {},
  trackEvent: () => {},
  trackError: () => {}
});

const useToast = () => ({
  success: () => {},
  error: () => {},
  info: () => {}
});

const trackPageLoad = () => {};
const trackUserEngagement = () => {};
const preloadCriticalResources = () => {};

// Types d'authentification
interface User {
  id: string;
  email: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
  };
}

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  country: string;
  roles: {
    id: string;
    name: string;
    description: string;
    permissions: { all: boolean };
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Hooks avancés avec gestion d'erreur
  useAnalytics();
  const toast = useToast();


  // Initialiser les fonctionnalités avancées
  useEffect(() => {
    try {
      // Initialiser les analytics et le tracking
      trackPageLoad();
      trackUserEngagement();
      
      // Précharger les ressources critiques
      preloadCriticalResources();
      
      // Notifier le démarrage
      toast.success();
    } catch (error) {
    }
  }, [toast]);

  // Initialiser l'authentification
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Vérifier la session actuelle avec authService
        const currentUser = await authService.getCurrentUser();
        
        if (currentUser) {
          if (mounted) {
            const user: User = {
              id: currentUser.id,
              email: currentUser.email,
              user_metadata: {
                first_name: currentUser.name,
                last_name: 'MasterCom'
              }
            };
            setUser(user);
            setIsAuthenticated(true);
            
            // Créer le profil utilisateur
            const userProfile: UserProfile = {
              id: currentUser.id,
              email: currentUser.email,
              first_name: currentUser.name,
              last_name: 'MasterCom',
              role_id: 'master',
              is_active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              country: 'France',
              roles: {
                id: 'master',
                name: 'master',
                description: 'Administrateur Master',
                permissions: { all: true }
              }
            };
            setUserProfile(userProfile);
          }
        }
      } catch (error) {
        // Erreur silencieuse
      } finally {
        if (mounted) {
          setIsLoading(false);
          setIsInitialized(true);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);


  // Gestion de la connexion
  const handleLogin = async (authUser: AuthUser) => {
    try {
      // Convertir AuthUser en User pour compatibilité
      const user: User = {
        id: authUser.id,
        email: authUser.email,
        user_metadata: {
          first_name: authUser.name,
          last_name: 'MasterCom'
        }
      };
      
      setUser(user);
      
      // Créer un profil utilisateur basé sur AuthUser
      const userProfile: UserProfile = {
        id: authUser.id,
        email: authUser.email,
        first_name: authUser.name,
        last_name: 'MasterCom',
        role_id: 'master',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        country: 'France',
        roles: {
          id: 'master',
          name: 'master',
          description: 'Administrateur Master',
          permissions: { all: true }
        }
      };
      
      setUserProfile(userProfile);
      setIsAuthenticated(true);
      
      // Redirection vers le master panel
      setTimeout(() => {
        window.location.href = '/master-panel';
      }, 1000);
      
      return user;
    } catch (error: any) {
      throw error;
    }
  };


  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setUserProfile(null);
      setIsAuthenticated(false);
      localStorage.removeItem('mastercom_user');
    } catch (error) {
      setUser(null);
      setUserProfile(null);
      setIsAuthenticated(false);
      localStorage.removeItem('mastercom_user');
    }
  };

  // Affichage du chargement initial
  if (!isInitialized || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Composants globaux avancés */}
        <NotificationSystem />
        <GlobalSearch />
        
        <Navbar
          isLoggedIn={!!user}
          userRole={userProfile?.roles?.name || 'client'}
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
                  <Navigate to="/master-panel" replace />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              } 
            />
            
            {/* Route de connexion alternative (ancienne méthode) */}
            <Route 
              path="/login-old" 
              element={
                user ? (
                  <Navigate to="/master-panel" replace />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              } 
            />
            
            {/* Routes protégées */}
            <Route 
              path="/crm" 
              element={
                <ProtectedRoute user={user}>
                  <CRM userRole={userProfile?.roles?.name || 'client'} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/master-panel" 
              element={
                <ProtectedRoute user={user}>
                  <MasterPanel userRole={userProfile?.roles?.name || 'client'} onLogout={handleLogout} />
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
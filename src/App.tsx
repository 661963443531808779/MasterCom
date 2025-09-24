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
import { supabase } from './services/supabase';
import { User as AuthUser } from './services/auth';

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
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

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
        // Vérifier la session actuelle
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!error && session?.user) {
          if (mounted) {
            const user: User = {
              id: session.user.id,
              email: session.user.email || '',
              user_metadata: session.user.user_metadata
            };
            setUser(user);
            await loadUserProfile(session.user.id);
          }
        }

        // Écouter les changements d'authentification
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_, session: any) => {
            if (mounted) {
              if (session?.user) {
                const user: User = {
                  id: session.user.id,
                  email: session.user.email || '',
                  user_metadata: session.user.user_metadata
                };
                setUser(user);
                await loadUserProfile(session.user.id);
              } else {
                setUser(null);
                setUserProfile(null);
              }
            }
          }
        );

        // Nettoyer la subscription au démontage
        return () => {
          if (subscription?.unsubscribe) {
            subscription.unsubscribe();
          }
        };
      } catch (error) {
        console.error('Erreur d\'authentification:', error);
        setSupabaseError('Erreur d\'authentification');
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

  // Charger le profil utilisateur
  const loadUserProfile = async (userId: string, userEmail?: string, userMetadata?: any) => {
    try {
      console.log('👤 Chargement du profil pour:', userId, userEmail);
      
      // Vérifier si c'est le compte master (par email ou ID spécifique)
      const isMasterAccount = userEmail === 'master@master.com' || 
                             userEmail === 'master@mastercom.fr' ||
                             userId === 'a3522290-7863-49dc-bce1-f979a5f6bbea';
      
      if (isMasterAccount) {
        console.log('🔑 Compte Master détecté');
        const masterProfile: UserProfile = {
          id: userId,
          email: userEmail || '',
          first_name: 'Master',
          last_name: 'Admin',
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
        setUserProfile(masterProfile);
        return;
      }
      
      // Pour les autres utilisateurs, créer un profil par défaut
      console.log('👤 Création du profil par défaut');
      const defaultProfile: UserProfile = {
        id: userId,
        email: userEmail || '',
        first_name: userMetadata?.first_name || 'Utilisateur',
        last_name: userMetadata?.last_name || '',
        role_id: 'client',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        country: 'France',
        roles: {
          id: 'client',
          name: 'client',
          description: 'Client',
          permissions: { all: false }
        }
      };
      setUserProfile(defaultProfile);
    } catch (error) {
      console.error('❌ Erreur lors du chargement du profil:', error);
    }
  };

  // Gestion de la connexion
  const handleLogin = async (authUser: AuthUser) => {
    try {
      console.log('🔐 Connexion dans App.tsx:', authUser.email);
      
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
        role_id: authUser.isMaster ? 'master' : 'client',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        country: 'France',
        roles: {
          id: authUser.isMaster ? 'master' : 'client',
          name: authUser.isMaster ? 'master' : 'client',
          description: authUser.isMaster ? 'Administrateur Master' : 'Client',
          permissions: { all: authUser.isMaster }
        }
      };
      
      setUserProfile(userProfile);
      console.log('✅ Profil utilisateur chargé');
      return user;
    } catch (error: any) {
      console.error('❌ Erreur dans handleLogin:', error);
      throw error;
    }
  };


  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      setUser(null);
      setUserProfile(null);
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


        {/* Affichage des erreurs Supabase */}
        {supabaseError && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm">
                  <strong>Mode dégradé :</strong> {supabaseError}
                </p>
              </div>
            </div>
          </div>
        )}

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
                  <MasterPanel userRole={userProfile?.roles?.name || 'client'} />
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
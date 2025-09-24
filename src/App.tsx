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
import MasterPanel from './components/MasterPanel';

// Composants avancés - réactivation progressive
import NotificationSystem from './components/NotificationSystem';
import GlobalSearch from './components/GlobalSearch';
import ThemeSelector from './components/ThemeSelector';

// Import des services Supabase
import { authService } from './services/supabase';

// Hooks avancés - version production simplifiée
const useAnalytics = () => ({
  trackUserAction: (action: string, details?: any) => {},
  trackEvent: (category: string, action: string, label?: string) => {},
  trackError: (error: Error, context?: any) => {}
});

const useToast = () => ({
  success: (title: string, message: string) => {},
  error: (title: string, message: string) => {},
  info: (title: string, message: string) => {}
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
  const analytics = useAnalytics();
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
      toast.success('Bienvenue !', 'MasterCom est prêt à vous servir');
    } catch (error) {
    }
  }, [toast]);

  // Initialiser l'authentification
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        
        // Import dynamique de Supabase avec gestion d'erreur robuste
        let supabase: any = null;
        try {
          const supabaseModule = await import('./services/supabase');
          supabase = supabaseModule.supabase;
        } catch (error) {
          setSupabaseError('Supabase non configuré - Mode dégradé');
          supabase = null;
        }
        
        if (supabase) {
          // Vérifier la session actuelle avec gestion d'erreur
          try {
            const { data: { session }, error } = await supabase.auth.getSession();
            
            if (!error && session?.user) {
              if (mounted) {
                setUser(session.user);
                await loadUserProfile(session.user.id);
              }
            }

            // Écouter les changements d'authentification
            const { data: { subscription } } = supabase.auth.onAuthStateChange(
              async (event: any, session: any) => {
                if (mounted) {
                  if (session?.user) {
                    setUser(session.user);
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
          } catch (authError) {
            setSupabaseError('Erreur d\'authentification Supabase');
          }
        }
      } catch (error) {
        setSupabaseError('Erreur d\'initialisation');
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
  const loadUserProfile = async (userId: string) => {
    try {
      // Vérifier si c'est le compte master (par email ou ID spécifique)
      const isMasterAccount = user?.email === 'master@master.com' || 
                             user?.email === 'master@mastercom.fr' ||
                             userId === 'a3522290-7863-49dc-bce1-f979a5f6bbea';
      
      if (isMasterAccount) {
        const masterProfile: UserProfile = {
          id: userId,
          email: user?.email || '',
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
      const defaultProfile: UserProfile = {
        id: userId,
        email: user?.email || '',
        first_name: user?.user_metadata?.first_name || 'Utilisateur',
        last_name: user?.user_metadata?.last_name || '',
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
    }
  };

  // Gestion de la connexion
  const handleLogin = async (email: string, password: string) => {
    try {
      if (!supabase || !supabase.auth) {
        throw new Error('Service d\'authentification non disponible');
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const errorMessage = error?.message || 'Erreur inconnue';
        
        if (errorMessage.includes('Invalid login credentials')) {
          throw new Error('Email ou mot de passe incorrect');
        } else if (errorMessage.includes('Email not confirmed')) {
          throw new Error('Veuillez confirmer votre email avant de vous connecter');
        } else if (errorMessage.includes('Too many requests')) {
          throw new Error('Trop de tentatives de connexion. Veuillez patienter quelques minutes');
        } else if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
          throw new Error('Problème de connexion réseau. Vérifiez votre connexion internet.');
        } else {
          throw new Error(`Erreur de connexion: ${errorMessage}`);
        }
      }

      if (data.user && data.user.email) {
        const user: User = {
          id: data.user.id,
          email: data.user.email,
          user_metadata: data.user.user_metadata
        };
        setUser(user);
        await loadUserProfile(data.user.id);
        return user;
      } else {
        throw new Error('Aucun utilisateur retourné par Supabase');
      }
    } catch (error: any) {
      // Gestion spécifique des erreurs
      if (error.message?.includes('Invalid login credentials')) {
        throw new Error('Email ou mot de passe incorrect');
      } else if (error.message?.includes('Email not confirmed')) {
        throw new Error('Veuillez confirmer votre email avant de vous connecter');
      } else if (error.message?.includes('Too many requests')) {
        throw new Error('Trop de tentatives de connexion. Veuillez patienter quelques minutes');
      } else if (error.message?.includes('fetch') || error.message?.includes('network')) {
        throw new Error('Problème de connexion réseau. Vérifiez votre connexion internet.');
      } else {
        throw new Error(`Erreur de connexion: ${error.message || 'Une erreur inattendue s\'est produite'}`);
      }
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
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Composants globaux avancés */}
        <NotificationSystem />
        <GlobalSearch />
        
        <Navbar
          isLoggedIn={!!user}
          userRole={userProfile?.roles?.name || 'client'}
          onLogout={handleLogout}
        />

        {/* Sélecteur de thème flottant */}
        <div className="fixed bottom-4 left-4 z-40">
          <ThemeSelector />
        </div>

        {/* Affichage des erreurs Supabase */}
        {supabaseError && (
          <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300 p-4">
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
                  <Login onLogin={handleLogin} />
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
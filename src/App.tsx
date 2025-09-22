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

// Composants avancés
import NotificationSystem from './components/NotificationSystem';
import GlobalSearch from './components/GlobalSearch';
import ThemeSelector from './components/ThemeSelector';

// Hooks avancés - avec gestion d'erreur
let useAnalytics: any = () => ({});
let useToast: any = () => ({});
let trackPageLoad: any = () => {};
let trackUserEngagement: any = () => {};
let preloadCriticalResources: any = () => {};

try {
  const analyticsModule = require('./utils/analytics');
  useAnalytics = analyticsModule.useAnalytics || (() => ({}));
  trackPageLoad = analyticsModule.trackPageLoad || (() => {});
  trackUserEngagement = analyticsModule.trackUserEngagement || (() => {});
} catch (error) {
  console.warn('Analytics non disponible:', error);
}

try {
  const notificationsModule = require('./hooks/useNotifications');
  useToast = notificationsModule.useToast || (() => ({}));
} catch (error) {
  console.warn('Notifications non disponibles:', error);
}

try {
  const performanceModule = require('./utils/performance');
  preloadCriticalResources = performanceModule.preloadCriticalResources || (() => {});
} catch (error) {
  console.warn('Performance utils non disponibles:', error);
}

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

  console.log('🚀 App MasterCom - Démarrage avec Supabase et fonctionnalités avancées');

  // Initialiser les fonctionnalités avancées
  useEffect(() => {
    try {
      // Initialiser les analytics et le tracking
      if (trackPageLoad) trackPageLoad();
      if (trackUserEngagement) trackUserEngagement();
      
      // Précharger les ressources critiques
      if (preloadCriticalResources) preloadCriticalResources();
      
      // Notifier le démarrage
      if (toast && toast.success) {
        toast.success('Bienvenue !', 'MasterCom est prêt à vous servir');
      }
    } catch (error) {
      console.warn('Erreur lors de l\'initialisation des fonctionnalités avancées:', error);
    }
  }, [toast]);

  // Initialiser l'authentification
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('🔍 Initialisation de l\'authentification...');
        
        // Import dynamique de Supabase avec gestion d'erreur robuste
        let supabase: any = null;
        try {
          const supabaseModule = await import('./services/supabase');
          supabase = supabaseModule.supabase;
          console.log('✅ Supabase chargé avec succès');
        } catch (error) {
          console.warn('⚠️ Supabase non disponible:', error);
          setSupabaseError('Supabase non configuré - Mode dégradé');
          supabase = null;
        }
        
        if (supabase) {
          // Vérifier la session actuelle avec gestion d'erreur
          try {
            const { data: { session }, error } = await supabase.auth.getSession();
            
            if (!error && session?.user) {
              console.log('✅ Session trouvée:', session.user.email);
              if (mounted) {
                setUser(session.user);
                await loadUserProfile(session.user.id, supabase);
              }
            } else {
              console.log('ℹ️ Aucune session active');
            }

            // Écouter les changements d'authentification
            const { data: { subscription } } = supabase.auth.onAuthStateChange(
              async (event: any, session: any) => {
                console.log('🔄 Changement d\'état auth:', event, session?.user?.email);
                
                if (mounted) {
                  if (session?.user) {
                    setUser(session.user);
                    await loadUserProfile(session.user.id, supabase);
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
            console.warn('⚠️ Erreur auth Supabase:', authError);
            setSupabaseError('Erreur d\'authentification Supabase');
          }
        }
      } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
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
  const loadUserProfile = async (userId: string, supabase: any) => {
    try {
      console.log('👤 Chargement du profil utilisateur:', userId);
      
      let profile = null;
      if (supabase && supabase.from) {
        try {
          const { data: profileData, error } = await supabase
            .from('user_profiles')
            .select(`
              *,
              roles (
                id,
                name,
                description,
                permissions
              )
            `)
            .eq('id', userId)
            .single();

          if (!error && profileData) {
            profile = profileData;
          }
        } catch (profileError) {
          console.warn('⚠️ Erreur profil utilisateur:', profileError);
        }
      }

      if (profile) {
        console.log('✅ Profil utilisateur chargé:', profile);
        setUserProfile(profile);
      } else {
        // Créer un profil par défaut
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
      }
    } catch (error) {
      console.error('❌ Erreur lors du chargement du profil:', error);
    }
  };

  // Gestion de la connexion
  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('🔐 Tentative de connexion avec:', email);
      
      // Tracking analytics
      if (analytics && analytics.trackUserAction) {
        analytics.trackUserAction('login_attempt', { email });
      }
      
      // Import dynamique de Supabase
      const supabaseModule = await import('./services/supabase');
      const supabase = supabaseModule.supabase;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Erreur de connexion:', error.message);
        if (analytics && analytics.trackEvent) {
          analytics.trackEvent('auth', 'login_failed', error.message);
        }
        if (toast && toast.error) {
          toast.error('Erreur de connexion', error.message);
        }
        throw error;
      }

      if (data.user) {
        console.log('✅ Connexion réussie:', data.user.email);
        
        // Tracking analytics
        if (analytics && analytics.trackEvent) {
          analytics.trackEvent('auth', 'login_success', data.user.email);
        }
        if (analytics && analytics.trackUserAction) {
          analytics.trackUserAction('login_success', { email: data.user.email });
        }
        
        // Notification de succès
        if (toast && toast.success) {
          toast.success('Connexion réussie !', `Bienvenue ${data.user.email}`);
        }
        
        setUser(data.user);
        await loadUserProfile(data.user.id, supabase);
        return data.user;
      } else {
        throw new Error('Aucun utilisateur retourné');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:', error);
      if (analytics && analytics.trackError) {
        analytics.trackError(error as Error, { action: 'login', email });
      }
      throw error;
    }
  };

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      console.log('🚪 Déconnexion en cours...');
      
      // Tracking analytics
      if (analytics && analytics.trackUserAction) {
        analytics.trackUserAction('logout_attempt');
      }
      
      // Import dynamique de Supabase
      const supabaseModule = await import('./services/supabase');
      const supabase = supabaseModule.supabase;
      
      await supabase.auth.signOut();
      
      // Tracking analytics
      if (analytics && analytics.trackEvent) {
        analytics.trackEvent('auth', 'logout_success');
      }
      
      // Notification
      if (toast && toast.info) {
        toast.info('Déconnexion', 'Vous avez été déconnecté avec succès');
      }
      
      setUser(null);
      setUserProfile(null);
      console.log('✅ Déconnexion réussie');
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
      if (analytics && analytics.trackError) {
        analytics.trackError(error as Error, { action: 'logout' });
      }
      // Forcer la déconnexion même en cas d'erreur
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
                  <CRM userRole={userProfile?.roles?.name || 'client'} />
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
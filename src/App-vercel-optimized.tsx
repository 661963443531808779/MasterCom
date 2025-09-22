import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Composants principaux
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import LoadingSpinner from './components/LoadingSpinner';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CRM from './pages/CRM';
import Blog from './pages/Blog';

// Composants avancés - réactivation progressive
import NotificationSystem from './components/NotificationSystem';
import GlobalSearch from './components/GlobalSearch';
import ThemeSelector from './components/ThemeSelector';

// Import statique de Supabase pour Vercel
import { supabase } from './services/supabase';

// Hooks avancés - version production simplifiée
const useAnalytics = () => ({
  trackUserAction: (action: string, details?: any) => {
    console.log('📊 Analytics:', action, details);
  },
  trackEvent: (category: string, action: string, label?: string) => {
    console.log('📊 Event:', category, action, label);
  },
  trackError: (error: Error, context?: any) => {
    console.error('📊 Error:', error.message, context);
  }
});

const useToast = () => ({
  success: (title: string, message: string) => {
    console.log('✅ Toast Success:', title, message);
  },
  error: (title: string, message: string) => {
    console.log('❌ Toast Error:', title, message);
  },
  info: (title: string, message: string) => {
    console.log('ℹ️ Toast Info:', title, message);
  }
});

const trackPageLoad = () => {
  console.log('📊 Page loaded');
};

const trackUserEngagement = () => {
  console.log('📊 User engagement tracked');
};

const preloadCriticalResources = () => {
  console.log('📊 Critical resources preloaded');
};

// Types d'authentification
interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface UserProfile {
  id: string;
  full_name: string;
  avatar_url?: string;
  role?: string;
}

const App: React.FC = () => {
  // États de l'application
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialiser les hooks
  const analytics = useAnalytics();
  const toast = useToast();

  console.log('🚀 App MasterCom - Version Vercel Optimisée');

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
      console.warn('Erreur lors de l\'initialisation des fonctionnalités avancées:', error);
    }
  }, [toast]);

  // Vérifier la session utilisateur au démarrage
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('🔍 Vérification de la session utilisateur...');
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Erreur lors de la vérification de session:', error.message);
          setError(error.message);
          return;
        }

        if (session?.user) {
          console.log('✅ Session trouvée:', session.user.email);
          setUser(session.user);
          await loadUserProfile(session.user.id);
        } else {
          console.log('ℹ️ Aucune session active');
        }
      } catch (error) {
        console.error('❌ Erreur lors de la vérification de session:', error);
        setError('Erreur de connexion');
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Changement d\'état auth:', event, session?.user?.email);
        
        if (session?.user) {
          setUser(session.user);
          await loadUserProfile(session.user.id);
        } else {
          setUser(null);
          setUserProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Charger le profil utilisateur
  const loadUserProfile = async (userId: string) => {
    try {
      console.log('👤 Chargement du profil utilisateur:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('❌ Erreur lors du chargement du profil:', error.message);
        return;
      }

      if (data) {
        console.log('✅ Profil chargé:', data);
        setUserProfile(data);
      } else {
        // Créer un profil par défaut
        console.log('📝 Création du profil par défaut');
        const defaultProfile = {
          id: userId,
          full_name: user?.user_metadata?.full_name || 'Utilisateur',
          avatar_url: user?.user_metadata?.avatar_url || null,
          role: 'user'
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
      analytics.trackUserAction('login_attempt', { email });
      
      console.log('🔍 Client Supabase chargé:', !!supabase);
      
      if (!supabase || !supabase.auth) {
        throw new Error('Supabase non configuré correctement');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('📊 Réponse Supabase:', { data: !!data, error: error?.message });

      if (error) {
        console.error('❌ Erreur de connexion Supabase:', error.message);
        analytics.trackEvent('auth', 'login_failed', error.message);
        toast.error('Erreur de connexion', error.message);
        throw error;
      }

      if (data.user) {
        console.log('✅ Connexion réussie:', data.user.email);
        
        // Tracking analytics
        analytics.trackEvent('auth', 'login_success', data.user.email);
        analytics.trackUserAction('login_success', { email: data.user.email });
        
        // Notification de succès
        toast.success('Connexion réussie !', `Bienvenue ${data.user.email}`);
        
        setUser(data.user);
        await loadUserProfile(data.user.id);
        return data.user;
      } else {
        throw new Error('Aucun utilisateur retourné par Supabase');
      }
    } catch (error: any) {
      console.error('❌ Erreur lors de la connexion:', error);
      analytics.trackError(error as Error, { action: 'login', email });
      
      // Gestion spécifique des erreurs Supabase
      console.error('🔍 Détails de l\'erreur:', {
        message: error.message,
        code: error.code,
        status: error.status,
        statusCode: error.statusCode
      });

      let errorMessage = 'Une erreur inattendue s\'est produite. Veuillez réessayer.';

      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Email ou mot de passe incorrect';
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = 'Veuillez confirmer votre email avant de vous connecter';
      } else if (error.message?.includes('Too many requests')) {
        errorMessage = 'Trop de tentatives de connexion. Veuillez réessayer plus tard';
      } else if (error.message?.includes('Supabase non configuré')) {
        errorMessage = 'Service d\'authentification non disponible';
      } else if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
        errorMessage = 'Problème de connexion réseau. Vérifiez votre connexion internet';
      }

      throw new Error(errorMessage);
    }
  };

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      console.log('🚪 Déconnexion en cours...');
      
      // Tracking analytics
      analytics.trackUserAction('logout_attempt');
      
      await supabase.auth.signOut();
      
      // Tracking analytics
      analytics.trackEvent('auth', 'logout_success');
      
      // Notification
      toast.info('Déconnexion', 'Vous avez été déconnecté avec succès');
      
      setUser(null);
      setUserProfile(null);
      console.log('✅ Déconnexion réussie');
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
      analytics.trackError(error as Error, { action: 'logout' });
      // Forcer la déconnexion même en cas d'erreur
      setUser(null);
      setUserProfile(null);
    }
  };

  // Gestion des erreurs
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('❌ Erreur globale capturée:', event.error);
      setError(event.error?.message || 'Une erreur inattendue s\'est produite');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Recharger la page
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* Composants avancés réactivés */}
        <NotificationSystem />
        <GlobalSearch />
        <ThemeSelector />
        
        {/* Navigation */}
        <Navbar 
          user={user} 
          userProfile={userProfile} 
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
                  <Dashboard user={user} userProfile={userProfile} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/crm" 
              element={
                user ? (
                  <CRM user={user} userProfile={userProfile} />
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

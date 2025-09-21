import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import conditionnel de Supabase pour éviter les erreurs
import { supabase } from './services/supabase';

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

  console.log('🚀 App MasterCom - Démarrage avec Supabase');

  // Initialiser l'authentification
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('🔍 Vérification de la session utilisateur...');
        
        // Vérifier la session actuelle avec gestion d'erreur
        let session = null;
        try {
          const { data: { session: sessionData }, error } = await supabase.auth.getSession();
          if (!error && sessionData) {
            session = sessionData;
          }
        } catch (sessionError) {
          console.warn('⚠️ Erreur session Supabase:', sessionError);
        }
        
        if (session?.user) {
          console.log('✅ Session trouvée:', session.user.email);
          if (mounted) {
            setUser(session.user);
            await loadUserProfile(session.user.id);
          }
        } else {
          console.log('ℹ️ Aucune session active');
        }

        // Écouter les changements d'authentification avec gestion d'erreur
        let subscription = null;
        try {
          const { data: { subscription: subData } } = supabase.auth.onAuthStateChange(
            async (event: any, session: any) => {
              console.log('🔄 Changement d\'état auth:', event, session?.user?.email);
              
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
          subscription = subData;
        } catch (authError) {
          console.warn('⚠️ Erreur auth listener:', authError);
        }

        return () => {
          if (subscription?.unsubscribe) {
            subscription.unsubscribe();
          }
        };
      } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation auth:', error);
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
      console.log('👤 Chargement du profil utilisateur:', userId);
      
      let profile = null;
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

      if (profile) {
        console.log('✅ Profil utilisateur chargé:', profile);
        setUserProfile(profile);
      } else {
        // Créer un profil par défaut si nécessaire
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
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Erreur de connexion:', error.message);
        throw error;
      }

      if (data.user) {
        console.log('✅ Connexion réussie:', data.user.email);
        setUser(data.user);
        await loadUserProfile(data.user.id);
        return data.user;
      } else {
        throw new Error('Aucun utilisateur retourné');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:', error);
      throw error;
    }
  };

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      console.log('🚪 Déconnexion en cours...');
      await supabase.auth.signOut();
      setUser(null);
      setUserProfile(null);
      console.log('✅ Déconnexion réussie');
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
    }
  };

  // Affichage du chargement initial
  if (!isInitialized || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
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
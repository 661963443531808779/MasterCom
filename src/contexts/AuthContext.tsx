import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, authService } from '../services/supabase';

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

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<UserProfile>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('🔐 AuthProvider rendu - user:', user?.email || 'Aucun');

  // Initialiser l'authentification
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('🔍 AuthProvider - Vérification de la session...');
        
        // Vérifier la session actuelle
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.warn('⚠️ AuthProvider - Erreur session:', error.message);
        } else if (session?.user) {
          console.log('✅ AuthProvider - Session trouvée:', session.user.email);
          if (mounted) {
            await loadUserProfile(session.user.id);
          }
        } else {
          console.log('ℹ️ AuthProvider - Aucune session active');
        }

        // Écouter les changements d'authentification
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event: any, session: any) => {
            console.log('🔄 AuthProvider - Changement auth:', event, session?.user?.email);
            
            if (mounted) {
              if (session?.user) {
                await loadUserProfile(session.user.id);
              } else {
                setUser(null);
              }
            }
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('❌ AuthProvider - Erreur initialisation:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
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
      console.log('👤 AuthProvider - Chargement profil:', userId);
      
      const profile = await authService.getUserProfile(userId);
      setUser(profile);
      console.log('✅ AuthProvider - Profil chargé:', profile);
    } catch (error) {
      console.warn('⚠️ AuthProvider - Erreur profil, création par défaut:', error);
      // Créer un profil par défaut
      const defaultProfile: UserProfile = {
        id: userId,
        email: 'utilisateur@mastercom.com',
        first_name: 'Utilisateur',
        last_name: '',
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
      setUser(defaultProfile);
    }
  };

  const login = async (email: string, password: string): Promise<UserProfile> => {
    try {
      console.log('🔐 AuthProvider - Tentative connexion:', email);
      
      // Utiliser le service d'authentification Supabase
      const authData = await authService.signIn(email, password);
      
      if (authData?.user) {
        console.log('✅ AuthProvider - Connexion réussie:', authData.user.email);
        await loadUserProfile(authData.user.id);
        
        if (!user) {
          throw new Error('Erreur lors du chargement du profil utilisateur');
        }
        
        return user;
      } else {
        throw new Error('Erreur de connexion');
      }
    } catch (error) {
      console.error('❌ AuthProvider - Erreur connexion:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 AuthProvider - Déconnexion...');
      await authService.signOut();
      setUser(null);
      console.log('✅ AuthProvider - Déconnexion réussie');
    } catch (error) {
      console.error('❌ AuthProvider - Erreur déconnexion:', error);
      // Forcer la déconnexion même en cas d'erreur
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
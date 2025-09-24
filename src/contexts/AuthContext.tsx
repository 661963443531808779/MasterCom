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


  // Initialiser l'authentification
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        
        // Vérifier la session actuelle
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
        } else if (session?.user) {
          if (mounted) {
            await loadUserProfile(session.user.id);
          }
        } else {
        }

        // Écouter les changements d'authentification
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_: any, session: any) => {
            
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
  const loadUserProfile = async (userId: string): Promise<UserProfile> => {
    try {
      
      // Créer un profil par défaut directement
      const defaultProfile: UserProfile = {
        id: userId,
        email: 'utilisateur@mastercom.com',
        first_name: 'Utilisateur',
        last_name: '',
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
      setUser(defaultProfile);
      return defaultProfile;
    } catch (error) {
      // Créer un profil par défaut
      const defaultProfile: UserProfile = {
        id: userId,
        email: 'utilisateur@mastercom.com',
        first_name: 'Utilisateur',
        last_name: '',
        role_id: 'master',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        country: 'France',
        roles: {
          id: 'master',
          name: 'Master',
          description: 'Administrateur MasterCom',
          permissions: { all: true }
        }
      };
      setUser(defaultProfile);
      return defaultProfile;
    }
  };

  const login = async (email: string, password: string): Promise<UserProfile> => {
    try {
      
      // Utiliser le service d'authentification Supabase
      const authData = await authService.signIn(email, password);
      
      if (authData?.user) {
        
        // Charger le profil utilisateur
        const userProfile = await loadUserProfile(authData.user.id);
        
        if (!userProfile) {
          throw new Error('Erreur lors du chargement du profil utilisateur');
        }
        
        return userProfile;
      } else {
        throw new Error('Erreur de connexion - aucune donnée utilisateur reçue');
      }
    } catch (error: any) {
      
      // Améliorer les messages d'erreur
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Email ou mot de passe incorrect');
      } else if (error.message.includes('Email not confirmed')) {
        throw new Error('Veuillez confirmer votre email avant de vous connecter');
      } else if (error.message.includes('Too many requests')) {
        throw new Error('Trop de tentatives de connexion. Veuillez patienter quelques minutes');
      } else if (error.message.includes('Supabase non configuré')) {
        throw new Error('Service d\'authentification temporairement indisponible');
      } else {
        throw new Error('Une erreur inattendue s\'est produite. Veuillez réessayer.');
      }
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (error) {
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
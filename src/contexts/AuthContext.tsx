import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, UserProfile } from '../services/supabase';

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
  const [isLoading] = useState(false); // Toujours false, jamais de chargement

  // Pas de useEffect, pas de blocage, pas de chargement
  console.log('🔐 AuthProvider rendu - user:', user?.email || 'Aucun');

  const login = async (email: string, password: string) => {
    try {
      // Timeout plus long pour la connexion
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout de connexion (12s)')), 12000)
      );
      
      const loginPromise = (async () => {
        const authResult = await authService.signIn(email, password);
        if (authResult && authResult.user) {
          try {
            const userProfile = await authService.getUserProfile(authResult.user.id);
            setUser(userProfile);
            return userProfile;
          } catch (profileError) {
            console.warn('Erreur lors de la récupération du profil après connexion:', profileError);
            // Fallback pour le compte Master
            if (authResult.user.email?.toLowerCase()?.startsWith('master')) {
              const fallbackProfile = {
                id: authResult.user.id,
                email: authResult.user.email,
                first_name: 'Master',
                last_name: 'Administrator',
                role_id: 'master',
                is_active: true,
                created_at: authResult.user.created_at || new Date().toISOString(),
                updated_at: new Date().toISOString(),
                country: 'France',
                roles: {
                  id: 'master',
                  name: 'master',
                  description: 'Administrateur principal',
                  permissions: { all: true }
                }
              };
              setUser(fallbackProfile);
              return fallbackProfile;
            }
            throw new Error('Erreur de récupération du profil');
          }
        }
        throw new Error('Erreur de connexion');
      })();
      
      return await Promise.race([loginPromise, timeoutPromise]);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
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
};

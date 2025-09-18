import { createContext, useContext, useState, ReactNode } from 'react';

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
  const isLoading = false; // Toujours false

  console.log('🔐 AuthProvider rendu - user:', user?.email || 'Aucun');

  const login = async (email: string, password: string): Promise<UserProfile> => {
    // Simulation simple de connexion
    if (email.toLowerCase().startsWith('master')) {
      const masterProfile: UserProfile = {
        id: 'master-123',
        email: email,
        first_name: 'Master',
        last_name: 'Administrator',
        role_id: 'master',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        country: 'France',
        roles: {
          id: 'master',
          name: 'master',
          description: 'Administrateur principal',
          permissions: { all: true }
        }
      };
      setUser(masterProfile);
      return masterProfile;
    }
    throw new Error('Accès non autorisé');
  };

  const logout = async () => {
    setUser(null);
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
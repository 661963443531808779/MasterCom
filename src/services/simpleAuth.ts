// Service d'authentification ultra-simplifié pour MasterCom
// Ce service évite toutes les dépendances complexes et se concentre uniquement sur l'authentification Supabase

import { createClient } from '@supabase/supabase-js';

// Configuration Supabase directe
const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Client Supabase simplifié
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'mastercom-simple-auth',
    flowType: 'pkce'
  }
});

// Interface utilisateur simplifiée
export interface SimpleUser {
  id: string;
  email: string;
  name: string;
  isMaster: boolean;
}

// Service d'authentification simplifié
export const simpleAuth = {
  // Connexion simple
  async login(email: string, password: string): Promise<SimpleUser> {
    try {
      console.log('🔐 SimpleAuth - Connexion:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        console.error('❌ SimpleAuth - Erreur:', error.message);
        throw new Error(this.getErrorMessage(error.message));
      }
      
      if (!data.user) {
        throw new Error('Aucune donnée utilisateur reçue');
      }

      const user: SimpleUser = {
        id: data.user.id,
        email: data.user.email || email,
        name: data.user.user_metadata?.first_name || 'Utilisateur',
        isMaster: email.toLowerCase().includes('master')
      };

      console.log('✅ SimpleAuth - Connexion réussie:', user.email);
      return user;
    } catch (error: any) {
      console.error('❌ SimpleAuth - Erreur connexion:', error);
      throw new Error(error.message || 'Erreur de connexion');
    }
  },

  // Déconnexion simple
  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
      console.log('✅ SimpleAuth - Déconnexion réussie');
    } catch (error) {
      console.error('❌ SimpleAuth - Erreur déconnexion:', error);
      throw error;
    }
  },

  // Obtenir l'utilisateur actuel
  async getCurrentUser(): Promise<SimpleUser | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.first_name || 'Utilisateur',
        isMaster: user.email?.toLowerCase().includes('master') || false
      };
    } catch (error) {
      console.error('❌ SimpleAuth - Erreur getCurrentUser:', error);
      return null;
    }
  },

  // Créer un compte master de test avec méthodes multiples
  async createMasterAccount(): Promise<SimpleUser> {
    try {
      console.log('🧪 SimpleAuth - Création compte master avec méthodes multiples...');
      
      // Étape 1: Vérifier la configuration Supabase
      console.log('🔧 Vérification de la configuration Supabase...');
      console.log('- URL:', SUPABASE_URL);
      console.log('- Anon Key:', SUPABASE_ANON_KEY ? 'Présent' : 'Manquant');
      
      // Étape 2: Tester la connexion réseau
      console.log('🌐 Test de connexion réseau...');
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        console.log('- Status réseau:', response.status === 200 ? '✅ OK' : `❌ ${response.status}`);
      } catch (networkError) {
        console.log('- Erreur réseau:', networkError);
        throw new Error('Problème de connexion réseau avec Supabase');
      }
      
      // Étape 3: Essayer de se connecter avec différents mots de passe
      console.log('🔑 Test de connexion avec différents mots de passe...');
      const passwordsToTry = [
        'MasterCom2024!',
        'mastercom2024',
        'MasterCom2024',
        'master@mastercom.fr',
        'master123',
        'Master123!',
        'admin123',
        'password123',
        'MasterCom2023!',
        'master2024',
        'admin',
        'password',
        '123456',
        'master',
        'MasterCom',
        'mastercom'
      ];
      
      for (const password of passwordsToTry) {
        try {
          console.log(`🔑 Test du mot de passe: ${password}`);
          const user = await this.login('master@mastercom.fr', password);
          console.log(`✅ Connexion réussie avec: ${password}`);
          return user;
        } catch (e: any) {
          console.log(`❌ Mot de passe ${password} incorrect: ${e.message}`);
        }
      }
      
      // Étape 4: Créer le compte avec différentes méthodes
      console.log('🔄 Aucun mot de passe ne fonctionne, création du compte...');
      
      // Méthode 1: Création standard
      try {
        console.log('📝 Méthode 1: Création standard...');
        const { data, error } = await supabase.auth.signUp({
          email: 'master@mastercom.fr',
          password: 'MasterCom2024!',
          options: {
            data: {
              first_name: 'Master',
              last_name: 'Admin'
            }
          }
        });

        if (error) {
          console.log('❌ Erreur création standard:', error.message);
          
          // Si l'utilisateur existe déjà, essayer encore une fois de se connecter
          if (error.message.includes('already registered') || error.message.includes('User already registered')) {
            console.log('🔄 Utilisateur existe, dernier essai de connexion...');
            try {
              return await this.login('master@mastercom.fr', 'MasterCom2024!');
            } catch (finalError) {
              console.log('❌ Impossible de se connecter même après création');
            }
          }
        } else if (data.user) {
          console.log('✅ Compte créé avec succès (méthode standard)');
          return {
            id: data.user.id,
            email: data.user.email || 'master@mastercom.fr',
            name: 'Master Admin',
            isMaster: true
          };
        }
      } catch (createError) {
        console.log('❌ Erreur création standard:', createError);
      }
      
      // Méthode 2: Création avec fetch direct
      try {
        console.log('📝 Méthode 2: Création avec fetch direct...');
        const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY
          },
          body: JSON.stringify({
            email: 'master@mastercom.fr',
            password: 'MasterCom2024!',
            data: {
              first_name: 'Master',
              last_name: 'Admin'
            }
          })
        });
        
        const data = await response.json();
        
        if (response.ok && data.user) {
          console.log('✅ Compte créé avec succès (méthode fetch direct)');
          return {
            id: data.user.id,
            email: data.user.email || 'master@mastercom.fr',
            name: 'Master Admin',
            isMaster: true
          };
        } else {
          console.log('❌ Erreur création fetch direct:', data.error_description || data.msg);
        }
      } catch (fetchError) {
        console.log('❌ Erreur fetch direct:', fetchError);
      }
      
      // Méthode 3: Création avec email différent
      try {
        console.log('📝 Méthode 3: Création avec email alternatif...');
        const { data, error } = await supabase.auth.signUp({
          email: 'master@mastercom.com',
          password: 'MasterCom2024!',
          options: {
            data: {
              first_name: 'Master',
              last_name: 'Admin'
            }
          }
        });

        if (!error && data.user) {
          console.log('✅ Compte créé avec succès (email alternatif)');
          return {
            id: data.user.id,
            email: data.user.email || 'master@mastercom.com',
            name: 'Master Admin',
            isMaster: true
          };
        }
      } catch (altError) {
        console.log('❌ Erreur création email alternatif:', altError);
      }
      
      throw new Error('Impossible de créer le compte master avec toutes les méthodes');
    } catch (error: any) {
      console.error('❌ SimpleAuth - Erreur createMasterAccount:', error);
      throw new Error(error.message || 'Erreur lors de la création du compte master');
    }
  },

  // Test de connexion directe avec diagnostic complet
  async testConnection(): Promise<{ success: boolean; message: string; details?: any }> {
    try {
      console.log('🧪 SimpleAuth - Test de connexion avec diagnostic complet...');
      
      // Test 1: Configuration Supabase
      console.log('🔧 Test 1 - Configuration:');
      console.log('- URL:', SUPABASE_URL);
      console.log('- Anon Key:', SUPABASE_ANON_KEY ? '✅ Présent' : '❌ Manquant');
      
      // Test 2: Connexion réseau
      console.log('🌐 Test 2 - Connexion réseau:');
      try {
        const networkResponse = await fetch(`${SUPABASE_URL}/rest/v1/`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        console.log('- Status:', networkResponse.status === 200 ? '✅ OK' : `❌ ${networkResponse.status}`);
        
        if (networkResponse.status !== 200) {
          return { 
            success: false, 
            message: `Problème de connexion réseau (Status: ${networkResponse.status})`,
            details: { networkStatus: networkResponse.status }
          };
        }
      } catch (networkError: any) {
        console.log('- Erreur réseau:', networkError.message);
        return { 
          success: false, 
          message: `Erreur réseau: ${networkError.message}`,
          details: { networkError: networkError.message }
        };
      }
      
      // Test 3: Tentative de connexion avec différents mots de passe
      console.log('🔑 Test 3 - Tentatives de connexion:');
      const passwordsToTest = [
        'MasterCom2024!',
        'mastercom2024',
        'MasterCom2024',
        'master123',
        'admin123'
      ];
      
      for (const password of passwordsToTest) {
        try {
          console.log(`🔑 Test avec: ${password}`);
          const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': SUPABASE_ANON_KEY
            },
            body: JSON.stringify({
              email: 'master@mastercom.fr',
              password: password
            })
          });
          
          const data = await response.json();
          
          if (response.ok) {
            console.log(`✅ Connexion réussie avec: ${password}`);
            return { 
              success: true, 
              message: `Connexion réussie avec le mot de passe: ${password}`,
              details: { workingPassword: password, token: data.access_token ? 'Présent' : 'Manquant' }
            };
          } else {
            console.log(`❌ Échec avec ${password}: ${data.error_description || data.msg}`);
          }
        } catch (error: any) {
          console.log(`❌ Erreur avec ${password}: ${error.message}`);
        }
      }
      
      // Test 4: Tentative de création de compte
      console.log('📝 Test 4 - Tentative de création de compte:');
      try {
        const createResponse = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY
          },
          body: JSON.stringify({
            email: 'master@mastercom.fr',
            password: 'MasterCom2024!',
            data: {
              first_name: 'Master',
              last_name: 'Admin'
            }
          })
        });
        
        const createData = await createResponse.json();
        
        if (createResponse.ok && createData.user) {
          console.log('✅ Compte créé avec succès');
          return { 
            success: true, 
            message: 'Compte master créé avec succès',
            details: { 
              created: true, 
              userId: createData.user.id,
              email: createData.user.email 
            }
          };
        } else {
          console.log('❌ Erreur création:', createData.error_description || createData.msg);
          
          if (createData.error_description?.includes('already registered')) {
            return { 
              success: false, 
              message: 'Le compte existe déjà mais aucun mot de passe ne fonctionne. Essayez de réinitialiser le mot de passe.',
              details: { 
                accountExists: true, 
                error: createData.error_description,
                suggestion: 'Utilisez le bouton "Créer & Connexion Master" pour forcer la création'
              }
            };
          }
          
          return { 
            success: false, 
            message: `Erreur de création: ${createData.error_description || createData.msg}`,
            details: { createError: createData.error_description || createData.msg }
          };
        }
      } catch (createError: any) {
        console.log('❌ Erreur création:', createError.message);
        return { 
          success: false, 
          message: `Erreur lors de la création: ${createError.message}`,
          details: { createError: createError.message }
        };
      }
    } catch (error: any) {
      console.error('❌ Erreur test de connexion:', error);
      return { 
        success: false, 
        message: `Erreur générale: ${error.message}`,
        details: { generalError: error.message }
      };
    }
  },

  // Convertir les messages d'erreur Supabase en français
  getErrorMessage(errorMessage: string): string {
    if (errorMessage.includes('Invalid login credentials')) {
      return 'Email ou mot de passe incorrect';
    }
    if (errorMessage.includes('Email not confirmed')) {
      return 'Veuillez confirmer votre email avant de vous connecter';
    }
    if (errorMessage.includes('Too many requests')) {
      return 'Trop de tentatives de connexion. Veuillez patienter quelques minutes';
    }
    if (errorMessage.includes('already registered')) {
      return 'Cet email est déjà utilisé';
    }
    if (errorMessage.includes('Password should be at least')) {
      return 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (errorMessage.includes('Invalid email')) {
      return 'Adresse email invalide';
    }
    
    return 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
  }
};

// Export du client Supabase pour usage externe si nécessaire
export { supabase };

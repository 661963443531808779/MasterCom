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

  // Créer un compte master de test
  async createMasterAccount(): Promise<SimpleUser> {
    try {
      console.log('🧪 SimpleAuth - Création compte master...');
      
      // D'abord essayer de se connecter
      try {
        return await this.login('master@mastercom.fr', 'MasterCom2024!');
      } catch (loginError) {
        console.log('🔄 Connexion échouée, création du compte...');
      }
      
      // Créer le compte
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
        console.error('❌ SimpleAuth - Erreur création:', error.message);
        
        // Si l'utilisateur existe déjà, essayer de se connecter avec d'autres mots de passe
        if (error.message.includes('already registered')) {
          const passwords = ['mastercom2024', 'MasterCom2024', 'master123', 'admin123'];
          
          for (const password of passwords) {
            try {
              return await this.login('master@mastercom.fr', password);
            } catch (e) {
              console.log(`❌ Mot de passe ${password} incorrect`);
            }
          }
        }
        
        throw new Error('Impossible de créer ou se connecter au compte master');
      }

      if (!data.user) {
        throw new Error('Compte créé mais aucune donnée utilisateur');
      }

      return {
        id: data.user.id,
        email: data.user.email || 'master@mastercom.fr',
        name: 'Master Admin',
        isMaster: true
      };
    } catch (error: any) {
      console.error('❌ SimpleAuth - Erreur createMasterAccount:', error);
      throw new Error(error.message || 'Erreur lors de la création du compte master');
    }
  },

  // Test de connexion directe
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🧪 SimpleAuth - Test de connexion...');
      
      // Test avec fetch direct
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          email: 'master@mastercom.fr',
          password: 'MasterCom2024!'
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, message: 'Connexion directe réussie' };
      } else {
        return { success: false, message: data.error_description || data.msg || 'Erreur de connexion' };
      }
    } catch (error: any) {
      return { success: false, message: error.message };
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

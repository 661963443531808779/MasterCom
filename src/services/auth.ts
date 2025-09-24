// Service d'authentification MasterCom - Version Simplifiée
import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Client Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'mastercom-auth'
  }
});

// Interface utilisateur
export interface User {
  id: string;
  email: string;
  name: string;
  isMaster: boolean;
}

// Service d'authentification simplifié
export const authService = {
  // Connexion
  async login(email: string, password: string): Promise<User> {
    try {
      console.log('🔐 Connexion:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        console.error('❌ Erreur connexion:', error.message);
        throw new Error(this.getErrorMessage(error.message));
      }
      
      if (!data.user) {
        throw new Error('Aucune donnée utilisateur reçue');
      }

      const user: User = {
        id: data.user.id,
        email: data.user.email || email,
        name: data.user.user_metadata?.first_name || 'Utilisateur',
        isMaster: email.toLowerCase().includes('master')
      };

      console.log('✅ Connexion réussie:', user.email);
      return user;
    } catch (error: any) {
      console.error('❌ Erreur connexion:', error);
      throw new Error(error.message || 'Erreur de connexion');
    }
  },

  // Déconnexion
  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
      console.log('✅ Déconnexion réussie');
    } catch (error) {
      console.error('❌ Erreur déconnexion:', error);
      throw error;
    }
  },

  // Obtenir l'utilisateur actuel
  async getCurrentUser(): Promise<User | null> {
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
      console.error('❌ Erreur getCurrentUser:', error);
      return null;
    }
  },

  // Connexion avec le mot de passe configuré
  async loginWithAdmin123(): Promise<User> {
    const emails = [
      'master@mastercom.fr',
      'master@mastercom.com',
      'admin@mastercom.fr'
    ];
    
    for (const email of emails) {
      try {
        console.log(`🔑 Tentative: ${email} / admin123`);
        return await this.login(email, 'admin123');
      } catch (error) {
        console.log(`❌ Échec avec ${email}`);
      }
    }
    
    throw new Error('Impossible de se connecter avec admin123');
  },

  // Test de connexion
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🧪 Test de connexion...');
      
      // Test réseau
      const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      
      if (response.status !== 200) {
        return { 
          success: false, 
          message: `Problème de connexion réseau (Status: ${response.status})`
        };
      }
      
      // Test connexion
      const loginResponse = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          email: 'master@mastercom.fr',
          password: 'admin123'
        })
      });
      
      const data = await loginResponse.json();
      
      if (loginResponse.ok) {
        return { 
          success: true, 
          message: 'Connexion réussie avec master@mastercom.fr / admin123'
        };
      } else {
        return { 
          success: false, 
          message: `Connexion échouée: ${data.error_description || data.msg}`
        };
      }
    } catch (error: any) {
      return { 
        success: false, 
        message: `Erreur: ${error.message}`
      };
    }
  },

  // Messages d'erreur en français
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
    if (errorMessage.includes('Invalid email')) {
      return 'Adresse email invalide';
    }
    
    return 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
  }
};

// Export du client Supabase
export { supabase };

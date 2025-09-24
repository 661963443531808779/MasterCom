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


  // Test de connexion simple avec Supabase
  async testConnection(): Promise<{ success: boolean; message: string; details?: any }> {
    try {
      console.log('🧪 SimpleAuth - Test de connexion Supabase...');
      
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
      
      // Test 3: Tentative de connexion avec admin123
      console.log('🔑 Test 3 - Connexion avec admin123:');
      try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
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
        
        const data = await response.json();
        
        if (response.ok) {
          console.log('✅ Connexion réussie avec admin123');
          return { 
            success: true, 
            message: 'Connexion réussie avec master@mastercom.fr / admin123',
            details: { 
              workingPassword: 'admin123', 
              token: data.access_token ? 'Présent' : 'Manquant',
              userId: data.user?.id,
              email: data.user?.email
            }
          };
        } else {
          console.log(`❌ Échec avec admin123: ${data.error_description || data.msg}`);
          return { 
            success: false, 
            message: `Connexion échouée: ${data.error_description || data.msg}`,
            details: { 
              error: data.error_description || data.msg,
              suggestion: 'Vérifiez que le compte master@mastercom.fr existe dans Supabase Dashboard'
            }
          };
        }
      } catch (error: any) {
        console.log(`❌ Erreur avec admin123: ${error.message}`);
        return { 
          success: false, 
          message: `Erreur de connexion: ${error.message}`,
          details: { error: error.message }
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

  // Connexion directe avec le mot de passe configuré
  async loginWithConfiguredPassword(): Promise<SimpleUser> {
    try {
      console.log('🔑 SimpleAuth - Connexion avec mot de passe configuré (admin123)...');
      
      const emails = [
        'master@mastercom.fr',
        'master@mastercom.com',
        'admin@mastercom.fr',
        'test@mastercom.fr'
      ];
      
      for (const email of emails) {
        try {
          console.log(`🔑 Tentative de connexion: ${email} / admin123`);
          const user = await this.login(email, 'admin123');
          console.log(`✅ Connexion réussie avec: ${email} / admin123`);
          return user;
        } catch (e: any) {
          console.log(`❌ Connexion échouée avec ${email}: ${e.message}`);
        }
      }
      
      throw new Error('Impossible de se connecter avec le mot de passe configuré admin123');
    } catch (error: any) {
      console.error('❌ SimpleAuth - Erreur loginWithConfiguredPassword:', error);
      throw new Error(error.message || 'Erreur lors de la connexion avec le mot de passe configuré');
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

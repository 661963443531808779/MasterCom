// Service d'authentification MasterCom - Version Unifiée
import { createClient } from '@supabase/supabase-js';

// Configuration Supabase avec variables d'environnement et fallback
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Fonction de test de connectivité
const testSupabaseConnection = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(`${url}/rest/v1/`, {
      method: 'HEAD',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    return response.ok;
  } catch (error) {
    console.error('❌ Test de connectivité Supabase échoué:', error);
    return false;
  }
};

// Debug pour Vercel
if (typeof window !== 'undefined') {
  console.log('🔧 Configuration Supabase:', {
    url: SUPABASE_URL,
    hasKey: !!SUPABASE_ANON_KEY,
    keyLength: SUPABASE_ANON_KEY?.length,
    env: {
      hasUrl: !!import.meta.env.VITE_SUPABASE_URL,
      hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
    }
  });
}

// Client Supabase UNIQUE pour éviter les conflits
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: false, // Désactiver le refresh automatique pour éviter les erreurs
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'mastercom-auth-unique'
  },
  global: {
    headers: {
      'X-Client-Info': 'mastercom-app'
    }
  }
});

// Test de connectivité au démarrage
if (typeof window !== 'undefined') {
  testSupabaseConnection(SUPABASE_URL).then(isConnected => {
    if (isConnected) {
      console.log('✅ Supabase connecté avec succès');
    } else {
      console.error('❌ Impossible de se connecter à Supabase');
      console.log('🔧 Vérifiez votre URL Supabase:', SUPABASE_URL);
    }
  });
}

// Interface utilisateur
export interface User {
  id: string;
  email: string;
  name: string;
  isMaster: boolean;
}

// Service d'authentification unifié
export const authService = {
  // Connexion
  async login(email: string, password: string): Promise<User> {
    try {
      console.log('🔐 Tentative de connexion:', { email: email.trim().toLowerCase() });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      console.log('📡 Réponse Supabase:', { 
        hasData: !!data, 
        hasUser: !!data?.user, 
        hasError: !!error,
        errorMessage: error?.message 
      });

      if (error) {
        console.error('❌ Erreur Supabase:', error);
        throw new Error(this.getErrorMessage(error.message));
      }
      
      if (!data.user) {
        console.error('❌ Aucun utilisateur reçu');
        throw new Error('Aucune donnée utilisateur reçue');
      }

      console.log('✅ Utilisateur connecté:', { 
        id: data.user.id, 
        email: data.user.email 
      });

      // Vérifier si l'utilisateur est vraiment un master
      const isMaster = await this.checkIfUserIsMaster(data.user.id, data.user.email || email);
      
      const user: User = {
        id: data.user.id,
        email: data.user.email || email,
        name: data.user.user_metadata?.first_name || 'Utilisateur',
        isMaster: isMaster
      };
      
      console.log('🎯 Utilisateur final:', user);
      return user;
    } catch (error: any) {
      console.error('💥 Erreur de connexion:', error);
      throw new Error(error.message || 'Erreur de connexion');
    }
  },

  // Déconnexion
  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (error) {
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

      // Vérifier si l'utilisateur est vraiment un master
      const isMaster = await this.checkIfUserIsMaster(user.id, user.email || '');

      return {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.first_name || 'Utilisateur',
        isMaster: isMaster
      };
    } catch (error) {
      return null;
    }
  },

  // Vérifier si un utilisateur est un master
  async checkIfUserIsMaster(userId: string, email: string): Promise<boolean> {
    try {
      // Liste des emails master autorisés
        const masterEmails = [
          'master@master.com',
          'master@mastercom.com',
          'master@commaster.fr',
          'admin@commaster.com',
          'admin@commaster.fr',
          'contact@commaster.fr'
        ];

      // Vérifier par email
      if (masterEmails.includes(email.toLowerCase())) {
        return true;
      }

      // Vérifier dans la table users si elle existe
      try {
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', userId)
          .single();

        if (!error && userData && userData.role === 'master') {
          return true;
        }
      } catch (dbError) {
        // Si la table users n'existe pas encore, continuer avec la vérification par email
        console.log('Table users non disponible, utilisation de la vérification par email');
      }

      return false;
    } catch (error) {
      console.error('Erreur lors de la vérification du statut master:', error);
      return false;
    }
  },

  // Messages d'erreur en français
  getErrorMessage(errorMessage: string): string {
    if (errorMessage.includes('Invalid login credentials')) {
      return 'Email ou mot de passe incorrect. Vérifiez vos identifiants dans Supabase Dashboard.';
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

// Service de données unifié
export const dataService = {
  // Récupérer les données de la table
  async getTableData(tableName: string) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*');

      if (error) {
        throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de la récupération des données');
    }
  },

  // Insérer des données dans la table
  async insertData(tableName: string, data: any) {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(data);

      if (error) {
        throw new Error(`Erreur lors de l'insertion: ${error.message}`);
      }

      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de l\'insertion des données');
    }
  },

  // Mettre à jour des données
  async updateData(tableName: string, id: string, data: any) {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id);

      if (error) {
        throw new Error(`Erreur lors de la mise à jour: ${error.message}`);
      }

      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de la mise à jour des données');
    }
  },

  // Supprimer des données
  async deleteData(tableName: string, id: string) {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Erreur lors de la suppression: ${error.message}`);
      }

      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Erreur lors de la suppression des données');
    }
  }
};

// Export du client Supabase unique
export { supabase };
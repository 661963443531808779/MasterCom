// Service Supabase MasterCom - Version Production
import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Créer le client Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'mastercom-auth-token',
    flowType: 'pkce'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Service d'authentification
export const authService = {
  // Connexion
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        throw new Error(this.getErrorMessage(error.message));
      }
      
      if (!data.user) {
        throw new Error('Aucune donnée utilisateur reçue');
      }

      return {
        user: data.user,
        session: data.session
      };
    } catch (error: any) {
      throw new Error(error.message || 'Erreur de connexion');
    }
  },

  // Déconnexion
  async signOut() {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      throw error;
    }
  },

  // Obtenir la session actuelle
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        return null;
      }

      return data.session;
    } catch (error) {
      return null;
    }
  },

  // Obtenir l'utilisateur actuel
  async getUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return null;
      }

      return user;
    } catch (error) {
      return null;
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

// Service de données
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

// Export du client Supabase
export { supabase };
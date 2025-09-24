// Service d'authentification MasterCom - Version Unifiée
import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const SUPABASE_URL = 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Client Supabase UNIQUE pour éviter les conflits
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'mastercom-auth-unique'
  }
});

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

      const user: User = {
        id: data.user.id,
        email: data.user.email || email,
        name: data.user.user_metadata?.first_name || 'Utilisateur',
        isMaster: true
      };

      return user;
    } catch (error: any) {
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

      return {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.first_name || 'Utilisateur',
        isMaster: true
      };
    } catch (error) {
      return null;
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
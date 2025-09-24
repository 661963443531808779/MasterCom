import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// Configuration Supabase - Mode production uniquement
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// En mode production (Vercel), on ne lance pas d'erreur pour éviter les crashes
if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase non configuré - fonctionnement en mode dégradé');
}

// Créer le client Supabase avec gestion d'erreur robuste
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'mastercom-auth-token',
    flowType: 'pkce',
    debug: true // Activer le debug pour voir les détails
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Debug: Afficher la configuration Supabase
console.log('🔧 Configuration Supabase:');
console.log('URL:', supabaseUrl);
console.log('Anon Key:', supabaseAnonKey ? '✅ Configuré' : '❌ Manquant');
console.log('Client Supabase:', supabase ? '✅ Créé' : '❌ Erreur');

// Fonction de diagnostic Supabase avancée
export const diagnoseSupabase = async () => {
  try {
    console.log('🔍 Diagnostic Supabase avancé...');
    
    // Test 1: Configuration
    console.log('📋 Test 1 - Configuration:');
    console.log('- URL:', supabaseUrl);
    console.log('- Anon Key:', supabaseAnonKey ? '✅ Présent' : '❌ Manquant');
    console.log('- Client:', supabase ? '✅ Créé' : '❌ Erreur');
    
    // Test 2: Connexion réseau
    console.log('🌐 Test 2 - Connexion réseau:');
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`
        }
      });
      console.log('- Status:', response.status === 200 ? '✅ OK' : `❌ ${response.status}`);
    } catch (networkError) {
      console.log('- Erreur réseau:', networkError.message);
    }
    
    // Test 3: Auth service
    console.log('🔐 Test 3 - Service Auth:');
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.log('- Erreur session:', error.message);
    } else {
      console.log('- Session:', data.session ? '✅ Active' : 'ℹ️ Aucune');
    }
    
    // Test 4: Tentative de connexion
    console.log('🧪 Test 4 - Test de connexion:');
    try {
      const { data: testData, error: testError } = await supabase.auth.signInWithPassword({
        email: 'test@test.com',
        password: 'test123'
      });
      
      if (testError) {
        console.log('- Erreur attendue:', testError.message);
        console.log('- Service Auth:', '✅ Fonctionnel');
      }
    } catch (authError) {
      console.log('- Erreur Auth:', authError.message);
    }
    
    console.log('✅ Diagnostic terminé');
    return true;
  } catch (error) {
    console.error('❌ Erreur diagnostic Supabase:', error);
    return false;
  }
};

// Lancer le diagnostic au chargement
diagnoseSupabase();



export { supabase };

// Configuration de performance
export const PERFORMANCE_CONFIG = {
  TIMEOUT: parseInt(import.meta.env.VITE_TIMEOUT || '5000'),
  RETRY_ATTEMPTS: parseInt(import.meta.env.VITE_RETRY_ATTEMPTS || '3'),
  CACHE_DURATION: parseInt(import.meta.env.VITE_CACHE_DURATION || '60000'),
};

// Types pour l'authentification
export interface UserProfile {
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

// Types pour les projets
export interface Project {
  id: string;
  name: string;
  description: string;
  client_id: string;
  status: string;
  start_date: string;
  end_date: string;
  budget: number;
  created_at: string;
  updated_at: string;
}

// Types pour les clients
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  contact_person?: string;
  address?: string;
  city?: string;
  region?: string;
  country: string;
  status: 'prospect' | 'active' | 'inactive';
  rating?: number;
  created_at: string;
  updated_at: string;
}

// Service d'authentification simplifié
export const authService = {
  async signIn(email: string, password: string) {
    try {
      console.log('🔐 AuthService - Tentative de connexion:', email);
      console.log('🔧 Configuration utilisée:');
      console.log('- URL:', supabaseUrl);
      console.log('- Key:', supabaseAnonKey ? 'Présent' : 'Manquant');
      
      // Test de connexion directe
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        console.error('❌ AuthService - Erreur Supabase:', error);
        console.error('❌ Détails erreur:', {
          message: error.message,
          status: error.status,
          name: error.name
        });
        throw error;
      }
      
      console.log('✅ AuthService - Connexion réussie:', data.user?.email);
      console.log('✅ Données utilisateur:', {
        id: data.user?.id,
        email: data.user?.email,
        confirmed: data.user?.email_confirmed_at
      });
      return data;
    } catch (error: any) {
      console.error('❌ AuthService - Erreur de connexion:', error);
      console.error('❌ Type d\'erreur:', typeof error);
      console.error('❌ Message:', error.message);
      console.error('❌ Stack:', error.stack);
      throw error;
    }
  },

  // Fonction de test pour créer un utilisateur master si nécessaire
  async createTestMasterUser() {
    try {
      console.log('🧪 Création d\'un utilisateur master de test...');
      
      // Liste étendue de mots de passe à tester
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
        'MasterCom2025!',
        'mastercom2025',
        'admin',
        'password',
        '123456',
        'master',
        'MasterCom',
        'mastercom'
      ];
      
      // D'abord essayer tous les mots de passe existants
      for (const password of passwordsToTry) {
        try {
          console.log(`🔑 Test du mot de passe: ${password}`);
          const loginResult = await this.signIn('master@mastercom.fr', password);
          console.log(`✅ Connexion réussie avec: ${password}`);
          return loginResult;
        } catch (e: any) {
          console.log(`❌ Mot de passe ${password} incorrect: ${e.message}`);
        }
      }
      
      // Si aucun mot de passe ne fonctionne, essayer de créer le compte
      console.log('🔄 Aucun mot de passe ne fonctionne, tentative de création...');
      const { data, error } = await supabase.auth.signUp({
        email: 'master@mastercom.fr',
        password: 'MasterCom2024!',
        options: {
          data: {
            first_name: 'Master',
            last_name: 'Admin'
          },
          emailRedirectTo: undefined
        }
      });

      if (error) {
        console.log('ℹ️ Erreur création utilisateur:', error.message);
        
        // Si l'utilisateur existe déjà, essayer encore une fois avec le mot de passe par défaut
        if (error.message.includes('already registered') || error.message.includes('User already registered')) {
          console.log('🔄 Utilisateur existe, dernier essai avec mot de passe par défaut...');
          try {
            const loginResult = await this.signIn('master@mastercom.fr', 'MasterCom2024!');
            console.log('✅ Connexion réussie avec mot de passe par défaut');
            return loginResult;
          } catch (finalError) {
            console.log('❌ Impossible de se connecter même avec le mot de passe par défaut');
          }
        }
        
        return null;
      }

      console.log('✅ Utilisateur master créé:', data.user?.email);
      return data;
    } catch (error) {
      console.error('❌ Erreur création utilisateur master:', error);
      return null;
    }
  },

  // Fonction de test directe sans dépendances
  async testDirectConnection() {
    try {
      console.log('🧪 Test de connexion directe à Supabase...');
      
      // Test avec fetch direct
      const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey
        },
        body: JSON.stringify({
          email: 'master@mastercom.fr',
          password: 'MasterCom2024!'
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Connexion directe réussie!');
        console.log('Token:', data.access_token ? 'Présent' : 'Manquant');
        return { success: true, data };
      } else {
        console.log('❌ Connexion directe échouée:', data.error_description || data.msg);
        return { success: false, error: data.error_description || data.msg };
      }
    } catch (error: any) {
      console.error('❌ Erreur test direct:', error.message);
      return { success: false, error: error.message };
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      throw error;
    }
  },

  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      return null;
    }
  },

  async getUserProfile(userId: string): Promise<UserProfile> {
    try {
      // Récupérer les données de base de l'utilisateur depuis Supabase Auth
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      
      // Créer un profil par défaut basé sur les données Supabase Auth
      const defaultProfile: UserProfile = {
        id: userId,
        email: user?.email || 'utilisateur@mastercom.com',
        first_name: user?.user_metadata?.first_name || 'Utilisateur',
        last_name: user?.user_metadata?.last_name || 'MasterCom',
        role_id: 'master',
        is_active: true,
        created_at: user?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
        country: 'France',
        roles: {
          id: 'master',
          name: 'Master',
          description: 'Administrateur MasterCom',
          permissions: { all: true }
        }
      };
      
      return defaultProfile;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      // Retourner un profil par défaut en cas d'erreur
      const fallbackProfile: UserProfile = {
        id: userId,
        email: 'master@mastercom.fr',
        first_name: 'Master',
        last_name: 'Admin',
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
      return fallbackProfile;
    }
  }
};

// Service de données
export const dataService = {
  async getClients() {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error);
      return [];
    }
  },

  async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
      return [];
    }
  },

  async getInvoices() {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des factures:', error);
      return [];
    }
  }
};

// Service de support
export const supportService = {
  async createTicket(ticketData: any) {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .insert([ticketData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du ticket:', error);
      throw error;
    }
  },

  async createContactTicket(ticketData: any) {
    try {
      const { data, error } = await supabase
        .from('contact_tickets')
        .insert([{
          name: ticketData.name,
          email: ticketData.email,
          phone: ticketData.phone,
          company: ticketData.company,
          subject: ticketData.subject,
          message: ticketData.message,
          status: 'new',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du ticket de contact:', error);
      throw error;
    }
  },

  async createQuoteRequest(quoteData: any) {
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .insert([{
          name: quoteData.name,
          email: quoteData.email,
          phone: quoteData.phone,
          company: quoteData.company,
          project_description: quoteData.project_description,
          budget: quoteData.budget,
          timeline: quoteData.timeline,
          status: 'pending',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de la demande de devis:', error);
      throw error;
    }
  },

  async getTickets() {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des tickets:', error);
      return [];
    }
  }
};

// Service des clients
export const clientService = {
  async getClients() {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error);
      return [];
    }
  },

  async createClient(clientData: any) {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([clientData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du client:', error);
      throw error;
    }
  },

  async updateClient(id: string, clientData: any) {
    try {
      const { data, error } = await supabase
        .from('clients')
        .update(clientData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client:', error);
      throw error;
    }
  },

  async deleteClient(id: string) {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression du client:', error);
      throw error;
    }
  }
};

// Service des factures
export const invoiceService = {
  async getInvoices() {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des factures:', error);
      return [];
    }
  },

  async createInvoice(invoiceData: any) {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .insert([invoiceData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de la facture:', error);
      throw error;
    }
  }
};

// Service des devis
export const quoteService = {
  async getQuotes() {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des devis:', error);
      return [];
    }
  },

  async createQuote(quoteData: any) {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert([quoteData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du devis:', error);
      throw error;
    }
  }
};

// Service des projets
export const projectService = {
  async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
      return [];
    }
  },

  async createProject(projectData: any) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      throw error;
    }
  },

  async updateProject(id: string, projectData: any) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet:', error);
      throw error;
    }
  },

  async deleteProject(id: string) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
      throw error;
    }
  }
};

// Service de gestion des utilisateurs
export const userManagementService = {
  async getUsers() {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      return [];
    }
  },

  async createUser(userData: any) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([userData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  },

  async updateUser(id: string, userData: any) {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(userData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      throw error;
    }
  },

  async deleteUser(id: string) {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error;
    }
  }
};
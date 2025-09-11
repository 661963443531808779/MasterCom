import { createClient } from '@supabase/supabase-js';

// Configuration Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Configuration Supabase - Mode production uniquement
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'https://gpnjamtnogyfvykgdiwd.supabase.co' && 
  supabaseAnonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';

// En mode production (Vercel), on ne lance pas d'erreur pour éviter les crashes
if (!isSupabaseConfigured) {
  if (import.meta.env.PROD) {
    console.warn('⚠️ Configuration Supabase manquante en production');
  } else {
    console.error('❌ Configuration Supabase manquante !');
    console.log('📝 Veuillez configurer vos clés Supabase dans le fichier .env :');
    console.log('   VITE_SUPABASE_URL=https://gpnjamtnogyfvykgdiwd.supabase.co');
    console.log('   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A');
    throw new Error('Configuration Supabase requise');
  }
}

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
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

// Cache intelligent multi-niveaux pour optimiser les performances
const userProfileCache = new Map<string, { data: any; timestamp: number }>();
const dataCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes pour les profils utilisateur
const DATA_CACHE_DURATION = 2 * 60 * 1000; // 2 minutes pour les données métier
const MAX_CACHE_SIZE = 200; // Augmenté pour de meilleures performances
const MAX_DATA_CACHE_SIZE = 500; // Cache séparé pour les données

// Configuration de performance optimisée pour Vercel
const PERFORMANCE_CONFIG = {
  batchSize: 50, // Taille des lots pour les requêtes
  timeout: parseInt(import.meta.env.VITE_TIMEOUT || '10000'), // Timeout configurable
  retryAttempts: parseInt(import.meta.env.VITE_RETRY_ATTEMPTS || '3'), // Tentatives configurable
  retryDelay: 1000, // Délai entre les tentatives (ms)
  cacheDuration: parseInt(import.meta.env.VITE_CACHE_DURATION || '300000') // 5 minutes par défaut
};

// Fonctions de cache optimisées
const getCachedUserProfile = (userId: string) => {
  const cached = userProfileCache.get(userId);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedUserProfile = (userId: string, data: any) => {
  // Nettoyer le cache si il devient trop grand
  if (userProfileCache.size >= MAX_CACHE_SIZE) {
    const oldestKey = userProfileCache.keys().next().value;
    if (oldestKey) {
      userProfileCache.delete(oldestKey);
    }
  }
  
  userProfileCache.set(userId, { data, timestamp: Date.now() });
};

const getCachedData = (key: string) => {
  const cached = dataCache.get(key);
  if (cached && Date.now() - cached.timestamp < DATA_CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key: string, data: any) => {
  // Nettoyer le cache si il devient trop grand
  if (dataCache.size >= MAX_DATA_CACHE_SIZE) {
    const oldestKey = dataCache.keys().next().value;
    if (oldestKey) {
      dataCache.delete(oldestKey);
    }
  }
  
  dataCache.set(key, { data, timestamp: Date.now() });
};

const clearUserProfileCache = (userId?: string) => {
  if (userId) {
    userProfileCache.delete(userId);
  } else {
    userProfileCache.clear();
  }
};

const clearDataCache = (pattern?: string) => {
  if (pattern) {
    for (const key of dataCache.keys()) {
      if (key.includes(pattern)) {
        dataCache.delete(key);
      }
    }
  } else {
    dataCache.clear();
  }
};

// Fonctions utilitaires pour les performances
const withRetry = async <T>(
  operation: () => Promise<T>,
  operationName: string,
  retries: number = PERFORMANCE_CONFIG.retryAttempts
): Promise<T> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      console.warn(`Tentative ${attempt}/${retries} échouée pour ${operationName}:`, error.message);
      
      if (attempt === retries) {
        throw error;
      }
      
      // Attendre avant la prochaine tentative
      await new Promise(resolve => setTimeout(resolve, PERFORMANCE_CONFIG.retryDelay * attempt));
    }
  }
  throw new Error(`Opération ${operationName} a échoué après ${retries} tentatives`);
};

const withTimeout = <T>(promise: Promise<T>, timeoutMs: number = PERFORMANCE_CONFIG.timeout): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error(`Timeout après ${timeoutMs}ms`)), timeoutMs)
    )
  ]);
};

// Fonction helper pour exécuter les requêtes Supabase avec retry et timeout
const executeSupabaseQuery = async <T>(
  queryBuilder: () => any,
  operationName: string
): Promise<{ data: T | null; error: any }> => {
  const operation = async () => {
    const result = await queryBuilder();
    return result;
  };

  return withTimeout(
    withRetry(operation, operationName),
    PERFORMANCE_CONFIG.timeout
  );
};

const createCacheKey = (table: string, filters?: Record<string, any>): string => {
  const filterStr = filters ? JSON.stringify(filters) : '';
  return `${table}_${filterStr}`;
};

// Fonction publique pour vider le cache
export const clearUserCache = () => {
  clearUserProfileCache();
};

export const clearDataCachePublic = (pattern?: string) => {
  clearDataCache(pattern);
};

export const clearAllCache = () => {
  clearUserProfileCache();
  clearDataCache();
};

// Types pour les données
export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  company?: string;
  address?: string;
  city?: string;
  region?: string;
  country: string;
  role_id: string;
  created_by?: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
  roles?: {
    id: string;
    name: string;
    description: string;
    permissions: Record<string, any>;
  };
}

export interface Role {
  id: string;
  name: 'master' | 'commercial' | 'client';
  description: string;
  permissions: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  contact_person?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  region?: string;
  country: string;
  status: 'prospect' | 'active' | 'inactive';
  rating: number;
  commercial_id?: string;
  created_by: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  amount: number;
  tax_rate: number;
  total_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issue_date: string;
  due_date: string;
  payment_date?: string;
  notes?: string;
  commercial_id?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id: string;
  quote_number: string;
  client_id: string;
  amount: number;
  tax_rate: number;
  total_amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  valid_until: string;
  accepted_date?: string;
  notes?: string;
  commercial_id?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: 'support' | 'contact' | 'quote_request' | 'complaint';
  client_id?: string;
  assigned_to?: string;
  created_by: string;
  contact_email?: string;
  contact_phone?: string;
  company_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  client_id?: string;
  commercial_id: string;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  start_date?: string;
  end_date?: string;
  estimated_hours: number;
  actual_hours: number;
  budget?: number;
  progress: number;
  tags?: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
  client?: Client;
  commercial?: UserProfile;
  tasks?: ProjectTask[];
  milestones?: ProjectMilestone[];
}

export interface ProjectTask {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to?: string;
  estimated_hours: number;
  actual_hours: number;
  due_date?: string;
  completed_date?: string;
  created_at: string;
  updated_at: string;
  assigned_user?: UserProfile;
}

export interface ProjectMilestone {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  due_date: string;
  completed_date?: string;
  status: 'pending' | 'completed' | 'overdue';
  created_at: string;
  updated_at: string;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  task_id?: string;
  filename: string;
  file_path: string;
  file_size?: number;
  file_type?: string;
  uploaded_by: string;
  created_at: string;
}

export interface Analytics {
  totalUsers?: { count: number };
  totalClients?: { count: number };
  totalRevenue?: { total: number };
  openTickets?: { count: number };
  totalInvoices?: { count: number };
  totalQuotes?: { count: number };
  totalTickets?: { count: number };
  totalProjects?: { count: number };
  activeProjects?: { count: number };
  revenueByMonth?: Array<{ month: string; revenue: number }>;
  usersByRegion?: Array<{ region: string; count: number }>;
  clientsByRegion?: Array<{ region: string; count: number }>;
}

// Service d'authentification Supabase
export const authService = {
  async signUp(email: string, password: string, userData: {
    first_name: string;
    last_name: string;
    phone?: string;
    company?: string;
    address?: string;
    city?: string;
    region?: string;
    country?: string;
    role: 'master' | 'commercial' | 'client';
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });

    if (error) throw error;
    return data;
  },

  async signIn(email: string, password: string) {
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout de connexion Supabase (6s)')), 6000)
      );
      
      // Vérifier si c'est un compte Master (email commence par "master")
      const isMasterAccount = email?.toLowerCase()?.startsWith('master') || false;
      
      if (isMasterAccount) {
        console.log('🔐 Connexion compte Master via AUTH Supabase');
        // Pour les comptes Master, utiliser uniquement l'AUTH Supabase
        const signInPromise = supabase.auth.signInWithPassword({
          email,
          password
        });

        const { data, error } = await Promise.race([signInPromise, timeoutPromise]) as any;

        if (error) {
          throw error;
        }

        return data;
      } else {
        console.log('👤 Connexion compte commercial via AUTH Supabase');
        // Pour les comptes commerciaux, utiliser l'AUTH Supabase
        // Le profil sera récupéré via getUserProfile
        const signInPromise = supabase.auth.signInWithPassword({
          email,
          password
        });

        const { data, error } = await Promise.race([signInPromise, timeoutPromise]) as any;

        if (error) {
          throw error;
        }

        return data;
      }
    } catch (error) {
      throw error;
    }
  },

  async createMasterAccount() {
    try {
      // Essayer de se connecter d'abord
      const { data: existingUser, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'master@mastercom.fr',
        password: 'MasterCom2024!'
      });

      if (existingUser && !signInError) {
        console.log('✅ Compte Master existant trouvé');
        return existingUser;
      }

      // Si le compte n'existe pas, le créer
      console.log('🔨 Création du compte Master...');
      const { data, error } = await supabase.auth.signUp({
        email: 'master@mastercom.fr',
        password: 'MasterCom2024!',
        options: {
          data: {
            first_name: 'Master',
            last_name: 'Administrator',
            role: 'master'
          }
        }
      });

      if (error) {
        console.error('Erreur lors de la création du compte Master:', error);
        throw error;
      }

      console.log('✅ Compte Master créé avec succès');
      return data;
    } catch (error) {
      console.error('Erreur dans createMasterAccount:', error);
      throw error;
    }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Vider le cache utilisateur lors de la déconnexion
    clearUserProfileCache();
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.warn('Erreur lors de la récupération de l\'utilisateur:', error);
        return null;
      }
      return user;
    } catch (error) {
      console.warn('Erreur lors de la récupération de l\'utilisateur:', error);
      return null;
    }
  },

  async getUserProfile(userId: string) {
    try {
      // Vérifier le cache d'abord
      const cachedProfile = getCachedUserProfile(userId);
      if (cachedProfile) {
        console.log('📦 Profil utilisateur récupéré depuis le cache');
        return cachedProfile;
      }

      // Timeout de sécurité pour éviter les blocages
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout de récupération du profil (8s)')), 8000)
      );

      const profilePromise = (async () => {
        // D'abord, récupérer les informations de l'utilisateur depuis auth.users
        const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.warn('Utilisateur non trouvé dans auth.users:', userError?.message);
        throw new Error('Utilisateur non authentifié');
      }

      // Vérifier si c'est un compte Master
      const isMasterAccount = user.email?.toLowerCase()?.startsWith('master') || false;
      
      if (isMasterAccount) {
        console.log('🔐 Récupération profil Master depuis AUTH Supabase uniquement');
        // Pour les comptes Master, créer un profil basé uniquement sur les données auth
        const masterProfile = {
          id: user.id,
          email: user.email || 'master@mastercom.fr',
          first_name: user.user_metadata?.first_name || 'Master',
          last_name: user.user_metadata?.last_name || 'Administrator',
          phone: '+33 1 23 45 67 89',
          company: 'MasterCom',
          address: '123 Rue de la Paix',
          city: 'Paris',
          region: 'Île-de-France',
          country: 'France',
          role_id: 'master',
          is_active: true,
          last_login: new Date().toISOString(),
          created_at: user.created_at,
          updated_at: new Date().toISOString(),
          roles: {
            id: 'master',
            name: 'master',
            description: 'Administrateur principal',
            permissions: { all: true }
          }
        };
        
        // Mettre en cache le profil Master
        setCachedUserProfile(userId, masterProfile);
        return masterProfile;
      }

      // Pour les comptes commerciaux, récupérer depuis user_profiles
      console.log('👤 Récupération profil commercial depuis user_profiles');
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.warn('Profil utilisateur non trouvé dans user_profiles:', profileError.message);
        throw profileError;
      }

      // Récupérer les informations du rôle séparément
      let roleData = null;
      if (profileData.role_id) {
        const { data: role, error: roleError } = await supabase
          .from('roles')
          .select('id, name, description, permissions')
          .eq('id', profileData.role_id)
          .single();
        
        if (!roleError) {
          roleData = role;
        }
      }

        // Combiner les données
        const completeProfile = {
          ...profileData,
          roles: roleData
        };
        
        // Mettre en cache le profil commercial
        setCachedUserProfile(userId, completeProfile);
        return completeProfile;
      })();

      return await Promise.race([profilePromise, timeoutPromise]);
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      throw error;
    }
  },

  async createDefaultMasterProfile(userId: string) {
    console.log('🔨 Création du profil Master par défaut...');
    
    // Récupérer le rôle Master
    const { data: masterRole, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', 'master')
      .single();

    if (roleError) {
      console.warn('Rôle Master non trouvé, utilisation d\'un profil par défaut');
      // Retourner un profil par défaut sans base de données
      return {
        id: userId,
        email: 'master@mastercom.fr',
        first_name: 'Master',
        last_name: 'Administrator',
        phone: '+33 1 23 45 67 89',
        company: 'MasterCom',
        address: '123 Rue de la Paix',
        city: 'Paris',
        region: 'Île-de-France',
        country: 'France',
        role_id: 'master-role',
        is_active: true,
        last_login: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        roles: {
          id: 'master-role',
          name: 'master',
          description: 'Administrateur principal',
          permissions: { all: true }
        }
      };
    }

    // Créer le profil utilisateur
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .insert([{
        id: userId,
        email: 'master@mastercom.fr',
        first_name: 'Master',
        last_name: 'Administrator',
        phone: '+33 1 23 45 67 89',
        company: 'MasterCom',
        address: '123 Rue de la Paix',
        city: 'Paris',
        region: 'Île-de-France',
        country: 'France',
        role_id: masterRole.id,
        is_active: true,
        last_login: new Date().toISOString()
      }])
      .select(`
        *,
        roles:role_id (
          id,
          name,
          description,
          permissions
        )
      `)
      .single();

    if (profileError) {
      console.error('Erreur lors de la création du profil:', profileError);
      // Retourner un profil par défaut
      return {
        id: userId,
        email: 'master@mastercom.fr',
        first_name: 'Master',
        last_name: 'Administrator',
        phone: '+33 1 23 45 67 89',
        company: 'MasterCom',
        address: '123 Rue de la Paix',
        city: 'Paris',
        region: 'Île-de-France',
        country: 'France',
        role_id: masterRole.id,
        is_active: true,
        last_login: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        roles: {
          id: masterRole.id,
          name: 'master',
          description: 'Administrateur principal',
          permissions: { all: true }
        }
      };
    }

    console.log('✅ Profil Master créé avec succès');
    return profileData;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },

  clearUserCache() {
    clearUserProfileCache();
  }
};

// Service pour les clients
export const clientService = {
  async getClients() {
    const cacheKey = createCacheKey('clients');
    const cached = getCachedData(cacheKey);
    if (cached) {
      console.log('📦 Données clients récupérées depuis le cache');
      return cached;
    }

    try {
      const { data, error } = await executeSupabaseQuery(
        () => supabase
          .from('clients')
          .select('*')
          .order('created_at', { ascending: false }),
        'getClients'
      );

      if (error) {
        console.warn('Erreur lors de la récupération des clients:', error);
        return [];
      }
      
      const result = data || [];
      setCachedData(cacheKey, result);
      console.log('📊 Données clients mises en cache');
      return result;
    } catch (error) {
      console.error('Erreur dans getClients:', error);
      return [];
    }
  },

  async createClient(clientData: Partial<Client>, createdBy?: string) {
    try {
      // Récupérer l'utilisateur actuel si createdBy n'est pas fourni
      let userId = createdBy;
      if (!userId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('Utilisateur non authentifié');
        }
        userId = user.id;
      }

      // Ajouter le created_by au clientData
      const clientDataWithCreatedBy = {
        ...clientData,
        created_by: userId
      };

      const { data, error } = await executeSupabaseQuery(
        () => supabase
          .from('clients')
          .insert([clientDataWithCreatedBy])
          .select()
          .single(),
        'createClient'
      );

      if (error) {
        console.error('Erreur lors de la création du client:', error);
        throw error;
      }

      // Invalider le cache des clients
      clearDataCache('clients');
      console.log('🗑️ Cache clients invalidé après création');
      
      return data;
    } catch (error) {
      console.error('Erreur dans createClient:', error);
      throw error;
    }
  },

  async updateClient(id: string, clientData: Partial<Client>) {
    try {
      const { data, error } = await executeSupabaseQuery(
        () => supabase
          .from('clients')
          .update(clientData)
          .eq('id', id)
          .select()
          .single(),
        'updateClient'
      );

      if (error) throw error;

      // Invalider le cache des clients
      clearDataCache('clients');
      console.log('🗑️ Cache clients invalidé après mise à jour');
      
      return data;
    } catch (error) {
      console.error('Erreur dans updateClient:', error);
      throw error;
    }
  },

  async deleteClient(id: string) {
    try {
      const { error } = await executeSupabaseQuery(
        () => supabase
          .from('clients')
          .delete()
          .eq('id', id),
        'deleteClient'
      );

      if (error) throw error;

      // Invalider le cache des clients
      clearDataCache('clients');
      console.log('🗑️ Cache clients invalidé après suppression');
    } catch (error) {
      console.error('Erreur dans deleteClient:', error);
      throw error;
    }
  }
};

// Service pour les factures
export const invoiceService = {
  async getInvoices() {
    const cacheKey = createCacheKey('invoices');
    const cached = getCachedData(cacheKey);
    if (cached) {
      console.log('📦 Données factures récupérées depuis le cache');
      return cached;
    }

    try {
      const { data, error } = await executeSupabaseQuery(
        () => supabase
          .from('invoices')
          .select(`
            *,
            clients:client_id (
              id,
              name,
              email
            )
          `)
          .order('created_at', { ascending: false }),
        'getInvoices'
      );

      if (error) {
        console.warn('Erreur lors de la récupération des factures:', error);
        return [];
      }
      
      const result = data || [];
      setCachedData(cacheKey, result);
      console.log('📊 Données factures mises en cache');
      return result;
    } catch (error) {
      console.error('Erreur dans getInvoices:', error);
      return [];
    }
  },

  async createInvoice(invoiceData: Partial<Invoice>, createdBy?: string) {
    try {
      // Récupérer l'utilisateur actuel si createdBy n'est pas fourni
      let userId = createdBy;
      if (!userId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('Utilisateur non authentifié');
        }
        userId = user.id;
      }

      // Générer un numéro de facture automatique si non fourni
      if (!invoiceData.invoice_number) {
        const { data: invoiceNumber } = await supabase
          .rpc('generate_invoice_number');
        invoiceData.invoice_number = invoiceNumber;
      }

      // Ajouter le created_by au invoiceData
      const invoiceDataWithCreatedBy = {
        ...invoiceData,
        created_by: userId
      };

      const { data, error } = await supabase
        .from('invoices')
        .insert([invoiceDataWithCreatedBy])
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la création de la facture:', error);
        throw error;
      }

      // Invalider le cache des factures
      clearDataCache('invoices');
      console.log('🗑️ Cache factures invalidé après création');
      
      return data;
    } catch (error) {
      console.error('Erreur dans createInvoice:', error);
      throw error;
    }
  },

  async updateInvoice(id: string, invoiceData: Partial<Invoice>) {
    try {
      const { data, error } = await executeSupabaseQuery(
        () => supabase
          .from('invoices')
          .update(invoiceData)
          .eq('id', id)
          .select()
          .single(),
        'updateInvoice'
      );

      if (error) throw error;

      // Invalider le cache des factures
      clearDataCache('invoices');
      console.log('🗑️ Cache factures invalidé après mise à jour');
      
      return data;
    } catch (error) {
      console.error('Erreur dans updateInvoice:', error);
      throw error;
    }
  },

  async deleteInvoice(id: string) {
    try {
      const { error } = await executeSupabaseQuery(
        () => supabase
          .from('invoices')
          .delete()
          .eq('id', id),
        'deleteInvoice'
      );

      if (error) throw error;

      // Invalider le cache des factures
      clearDataCache('invoices');
      console.log('🗑️ Cache factures invalidé après suppression');
    } catch (error) {
      console.error('Erreur dans deleteInvoice:', error);
      throw error;
    }
  }
};

// Service pour les devis
export const quoteService = {
  async getQuotes() {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select(`
          *,
          clients:client_id (
            id,
            name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Erreur lors de la récupération des devis:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Erreur dans getQuotes:', error);
      return [];
    }
  },

  async createQuote(quoteData: Partial<Quote>, createdBy?: string) {
    try {
      // Récupérer l'utilisateur actuel si createdBy n'est pas fourni
      let userId = createdBy;
      if (!userId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('Utilisateur non authentifié');
        }
        userId = user.id;
      }

      // Générer un numéro de devis automatique si non fourni
      if (!quoteData.quote_number) {
        const { data: quoteNumber } = await supabase
          .rpc('generate_quote_number');
        quoteData.quote_number = quoteNumber;
      }

      // Ajouter le created_by au quoteData
      const quoteDataWithCreatedBy = {
        ...quoteData,
        created_by: userId
      };

      const { data, error } = await supabase
        .from('quotes')
        .insert([quoteDataWithCreatedBy])
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la création du devis:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Erreur dans createQuote:', error);
      throw error;
    }
  },

  async updateQuote(id: string, quoteData: Partial<Quote>) {
    const { data, error } = await supabase
      .from('quotes')
      .update(quoteData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteQuote(id: string) {
    const { error } = await supabase
      .from('quotes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

// Service pour les tickets de support
export const supportService = {
  async getTickets() {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select(`
          *,
          clients:client_id (
            id,
            name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Erreur lors de la récupération des tickets:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Erreur dans getTickets:', error);
      return [];
    }
  },

  async createTicket(ticketData: Partial<SupportTicket>, createdBy?: string) {
    try {
      // Récupérer l'utilisateur actuel si createdBy n'est pas fourni
      let userId = createdBy;
      if (!userId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('Utilisateur non authentifié');
        }
        userId = user.id;
      }

      // Ajouter le created_by au ticketData
      const ticketDataWithCreatedBy = {
        ...ticketData,
        created_by: userId
      };

      const { data, error } = await supabase
        .from('support_tickets')
        .insert([ticketDataWithCreatedBy])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur dans createTicket:', error);
      throw error;
    }
  },

  async updateTicket(id: string, ticketData: Partial<SupportTicket>) {
    const { data, error } = await supabase
      .from('support_tickets')
      .update(ticketData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTicket(id: string) {
    try {
      const { error } = await supabase
        .from('support_tickets')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erreur lors de la suppression du ticket:', error);
        throw error;
      }
    } catch (error) {
      console.error('Erreur dans deleteTicket:', error);
      throw error;
    }
  },

  // Service pour créer des tickets de contact
  async createContactTicket(contactData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
  }) {
    try {
      // Essayer d'abord avec la structure complète
      const ticketData = {
        title: `Demande de contact: ${contactData.subject}`,
        description: contactData.message,
        type: 'contact' as const,
        priority: 'medium' as const,
        status: 'open' as const,
        contact_email: contactData.email,
        contact_phone: contactData.phone,
        company_name: contactData.company,
        created_by: '00000000-0000-0000-0000-000000000000' // UUID par défaut pour les contacts externes
      };

      const { data, error } = await supabase
        .from('support_tickets')
        .insert([ticketData])
        .select()
        .single();

      if (error) {
        console.warn('Erreur avec structure complète, essai avec structure basique:', error);
        
        // Fallback avec structure basique si les nouvelles colonnes n'existent pas
        const basicTicketData = {
          title: `Demande de contact: ${contactData.subject}`,
          description: `${contactData.message}\n\nContact: ${contactData.email}${contactData.phone ? ` - ${contactData.phone}` : ''}${contactData.company ? ` - ${contactData.company}` : ''}`,
          priority: 'medium' as const,
          status: 'open' as const,
          created_by: '00000000-0000-0000-0000-000000000000'
        };

        const { data: fallbackData, error: fallbackError } = await supabase
          .from('support_tickets')
          .insert([basicTicketData])
          .select()
          .single();

        if (fallbackError) {
          console.error('Erreur même avec structure basique:', fallbackError);
          throw fallbackError;
        }
        
        return fallbackData;
      }
      
      return data;
    } catch (error) {
      console.error('Erreur dans createContactTicket:', error);
      throw error;
    }
  },

  // Service pour créer des demandes de devis
  async createQuoteRequest(quoteData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    project_description: string;
    budget?: string;
    timeline?: string;
  }) {
    try {
      // Essayer d'abord avec la structure complète
      const ticketData = {
        title: `Demande de devis: ${quoteData.company || quoteData.name}`,
        description: `Description du projet: ${quoteData.project_description}\n\nBudget: ${quoteData.budget || 'Non spécifié'}\nDélai: ${quoteData.timeline || 'Non spécifié'}`,
        type: 'quote_request' as const,
        priority: 'high' as const,
        status: 'open' as const,
        contact_email: quoteData.email,
        contact_phone: quoteData.phone,
        company_name: quoteData.company,
        created_by: '00000000-0000-0000-0000-000000000000' // UUID par défaut pour les demandes externes
      };

      const { data, error } = await supabase
        .from('support_tickets')
        .insert([ticketData])
        .select()
        .single();

      if (error) {
        console.warn('Erreur avec structure complète, essai avec structure basique:', error);
        
        // Fallback avec structure basique si les nouvelles colonnes n'existent pas
        const basicTicketData = {
          title: `Demande de devis: ${quoteData.company || quoteData.name}`,
          description: `Description du projet: ${quoteData.project_description}\n\nBudget: ${quoteData.budget || 'Non spécifié'}\nDélai: ${quoteData.timeline || 'Non spécifié'}\n\nContact: ${quoteData.email}${quoteData.phone ? ` - ${quoteData.phone}` : ''}`,
          priority: 'high' as const,
          status: 'open' as const,
          created_by: '00000000-0000-0000-0000-000000000000'
        };

        const { data: fallbackData, error: fallbackError } = await supabase
          .from('support_tickets')
          .insert([basicTicketData])
          .select()
          .single();

        if (fallbackError) {
          console.error('Erreur même avec structure basique:', fallbackError);
          throw fallbackError;
        }
        
        return fallbackData;
      }
      
      return data;
    } catch (error) {
      console.error('Erreur dans createQuoteRequest:', error);
      throw error;
    }
  }
};

// Service pour les analytics
export const analyticsService = {
  async getAnalytics(): Promise<Analytics> {
    try {
      // Récupérer les données depuis la vue analytics_dashboard
      const { data: dashboardData, error: dashboardError } = await supabase
        .from('analytics_dashboard')
        .select('*')
        .single();

      if (dashboardError) {
        console.warn('Erreur lors de la récupération des données dashboard:', dashboardError);
        // Retourner des données par défaut si la vue n'existe pas encore
        return {
          totalUsers: { count: 0 },
          totalClients: { count: 0 },
          totalRevenue: { total: 0 },
          openTickets: { count: 0 },
          totalInvoices: { count: 0 },
          totalQuotes: { count: 0 },
          totalTickets: { count: 0 },
          revenueByMonth: [],
          usersByRegion: [],
          clientsByRegion: []
        };
      }

      return dashboardData;
    } catch (error) {
      console.error('Erreur lors de la récupération des analytics:', error);
      throw error;
    }
  },

  async getPowerBIData() {
    try {
      const { data, error } = await supabase
        .from('powerbi_data')
        .select('*');

      if (error) {
        console.warn('Erreur lors de la récupération des données Power BI:', error);
        // Retourner des données par défaut
        return {
          users: [],
          clients: [],
          invoices: [],
          quotes: [],
          tickets: [],
          analytics: {}
        };
      }

      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données Power BI:', error);
      throw error;
    }
  }
};

// Service pour la gestion des utilisateurs (Master uniquement)
export const userManagementService = {
  async getUsers() {
    try {
      // Essayer de récupérer tous les utilisateurs depuis user_profiles
      const { data: allUsers, error: usersError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) {
        console.warn('Erreur lors de la récupération des utilisateurs:', usersError);
        
        // Si la table n'existe pas, créer juste le master par défaut
        const defaultMasterProfile = {
          id: 'master-default',
          email: 'master@mastercom.fr',
          first_name: 'Master',
          last_name: 'Administrator',
          phone: '+33 1 23 45 67 89',
          company: 'MasterCom',
          address: '123 Rue de la Paix',
          city: 'Paris',
          region: 'Île-de-France',
          country: 'France',
          role_id: 'master',
          is_active: true,
          last_login: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          roles: {
            id: 'master',
            name: 'master',
            description: 'Administrateur principal'
          }
        };
        
        return [defaultMasterProfile];
      }

      let users = allUsers || [];
      
      // Récupérer les rôles séparément
      const { data: roles, error: rolesError } = await supabase
        .from('roles')
        .select('*');
      
      if (rolesError) {
        console.warn('Erreur lors de la récupération des rôles:', rolesError);
      }
      
      // Associer les rôles aux utilisateurs
      users = users.map(user => ({
        ...user,
        roles: roles?.find(role => role.id === user.role_id) || {
          id: user.role_id,
          name: user.role_id,
          description: 'Rôle non défini'
        }
      }));
      
      // Vérifier si le compte master est déjà dans user_profiles
      const hasMasterInProfiles = users.some(u => u.email === 'master@mastercom.fr');
      
      // Si le master n'est pas dans user_profiles, l'ajouter depuis l'auth
      if (!hasMasterInProfiles) {
        try {
          const { data: { user: masterUser } } = await supabase.auth.getUser();
          
          if (masterUser && masterUser.email === 'master@mastercom.fr') {
            const masterProfile = {
              id: masterUser.id,
              email: masterUser.email,
              first_name: 'Master',
              last_name: 'Administrator',
              phone: '+33 1 23 45 67 89',
              company: 'MasterCom',
              address: '123 Rue de la Paix',
              city: 'Paris',
              region: 'Île-de-France',
              country: 'France',
              role_id: 'master',
              is_active: true,
              last_login: new Date().toISOString(),
              created_at: masterUser.created_at,
              updated_at: new Date().toISOString(),
              roles: {
                id: 'master',
                name: 'master',
                description: 'Administrateur principal'
              }
            };
            
            // Ajouter le Master en premier
            users = [masterProfile, ...users];
          } else {
            // Si on ne trouve pas l'utilisateur master dans l'auth, créer un profil par défaut
            const defaultMasterProfile = {
              id: 'master-default',
              email: 'master@mastercom.fr',
              first_name: 'Master',
              last_name: 'Administrator',
              phone: '+33 1 23 45 67 89',
              company: 'MasterCom',
              address: '123 Rue de la Paix',
              city: 'Paris',
              region: 'Île-de-France',
              country: 'France',
              role_id: 'master',
              is_active: true,
              last_login: new Date().toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              roles: {
                id: 'master',
                name: 'master',
                description: 'Administrateur principal'
              }
            };
            
            // Ajouter le Master par défaut en premier
            users = [defaultMasterProfile, ...users];
          }
        } catch (masterError) {
          console.warn('Erreur lors de la récupération du compte Master:', masterError);
          // Créer un profil master par défaut en cas d'erreur
          const defaultMasterProfile = {
            id: 'master-default',
            email: 'master@mastercom.fr',
            first_name: 'Master',
            last_name: 'Administrator',
            phone: '+33 1 23 45 67 89',
            company: 'MasterCom',
            address: '123 Rue de la Paix',
            city: 'Paris',
            region: 'Île-de-France',
            country: 'France',
            role_id: 'master',
            is_active: true,
            last_login: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            roles: {
              id: 'master',
              name: 'master',
              description: 'Administrateur principal'
            }
          };
          
          // Ajouter le Master par défaut en premier
          users = [defaultMasterProfile, ...users];
        }
      }

      return users;
    } catch (error) {
      console.error('Erreur dans getUsers:', error);
      return [];
    }
  },

  async createCommercialUser(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone?: string;
    company?: string;
    address?: string;
    city?: string;
    region?: string;
    country?: string;
  }) {
    try {
      // Validation de l'email côté client
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Format d\'email invalide');
      }

      // Nettoyer l'email (supprimer les espaces, convertir en minuscules)
      const cleanEmail = userData.email?.trim()?.toLowerCase() || '';
      
      // Validation de la force du mot de passe
      if (userData.password.length < 8) {
        throw new Error('Le mot de passe doit contenir au moins 8 caractères');
      }
      
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(userData.password)) {
        throw new Error('Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre');
      }
      
      console.log('🔨 Création du compte commercial:', cleanEmail);
      
      // Créer l'utilisateur dans auth.users avec l'API publique
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password: userData.password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone: userData.phone,
            company: userData.company
          }
        }
      });

      if (authError) {
        console.error('Erreur lors de la création de l\'utilisateur auth:', authError);
        
        // Messages d'erreur plus clairs
        if (authError.message.includes('Invalid email')) {
          throw new Error(`L'adresse email "${cleanEmail}" n'est pas valide. Veuillez utiliser un email professionnel ou un domaine reconnu.`);
        } else if (authError.message.includes('User already registered')) {
          throw new Error(`L'adresse email "${cleanEmail}" est déjà utilisée.`);
        } else if (authError.message.includes('Password should be at least')) {
          throw new Error('Le mot de passe doit contenir au moins 6 caractères.');
        } else {
          throw new Error(`Erreur de création: ${authError.message}`);
        }
      }

      if (!authData.user) {
        throw new Error('Aucun utilisateur créé');
      }


      // Obtenir l'ID du rôle commercial
      const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .select('id')
        .eq('name', 'commercial')
        .single();

      if (roleError) {
        console.error('Erreur lors de la récupération du rôle commercial:', roleError);
        throw roleError;
      }

      // Créer le profil utilisateur
      const profileData = {
        id: authData.user.id,
        email: cleanEmail, // Utiliser l'email nettoyé
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone: userData.phone,
        company: userData.company,
        address: userData.address,
        city: userData.city,
        region: userData.region,
        country: userData.country || 'France',
        role_id: roleData.id,
        is_active: true
      };

      const { data: profileResult, error: profileError } = await supabase
        .from('user_profiles')
        .insert([profileData])
        .select(`
          *,
          roles:role_id (
            id,
            name,
            description,
            permissions
          )
        `)
        .single();

      if (profileError) {
        console.error('Erreur lors de la création du profil:', profileError);
        throw profileError;
      }

      // Vider le cache après création d'un nouvel utilisateur
      clearUserProfileCache();
      
      return profileResult;

      /* Code pour l'API Admin Supabase (à décommenter quand vous aurez la clé service_role)
      
      // Créer l'utilisateur dans auth.users
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true
      });

      if (authError) throw authError;

      // Obtenir l'ID du rôle commercial
      const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .select('id')
        .eq('name', 'commercial')
        .single();

      if (roleError) throw roleError;

      // Créer le profil utilisateur
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .insert([{
          id: authData.user.id,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          phone: userData.phone,
          company: userData.company,
          address: userData.address,
          city: userData.city,
          region: userData.region,
          country: userData.country || 'France',
          role_id: roleData.id,
          created_by: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (profileError) throw profileError;
      return profileData;
      */
    } catch (error) {
      console.error('Erreur lors de la création du compte commercial:', error);
      throw error;
    }
  },

  async updateUser(id: string, userData: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(userData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    // Vider le cache après mise à jour
    clearUserProfileCache(id);
    
    return data;
  },

  async deleteUser(id: string) {
    // Supprimer le profil utilisateur
    const { error: profileError } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', id);

    if (profileError) throw profileError;

    // Supprimer l'utilisateur de auth.users
    const { error: authError } = await supabase.auth.admin.deleteUser(id);
    if (authError) throw authError;
  }
};

// Service pour la gestion des projets
export const projectService = {
  async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:client_id (
            id,
            name,
            email
          ),
          commercial:commercial_id (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Erreur lors de la récupération des projets:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Erreur dans getProjects:', error);
      return [];
    }
  },

  async getProject(id: string) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          client:client_id (
            id,
            name,
            email
          ),
          commercial:commercial_id (
            id,
            first_name,
            last_name,
            email
          ),
          tasks:project_tasks (
            *,
            assigned_user:assigned_to (
              id,
              first_name,
              last_name,
              email
            )
          ),
          milestones:project_milestones (*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.warn('Erreur lors de la récupération du projet:', error);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Erreur dans getProject:', error);
      return null;
    }
  },

  async createProject(projectData: Partial<Project>) {
    try {
      // Validation des données requises
      if (!projectData.name) {
        throw new Error('Le nom du projet est requis');
      }

      // Préparation des données avec valeurs par défaut
      const projectToCreate = {
        name: projectData.name,
        description: projectData.description || null,
        client_id: projectData.client_id || null,
        commercial_id: projectData.commercial_id || null,
        status: projectData.status || 'planning',
        priority: projectData.priority || 'medium',
        start_date: projectData.start_date || null,
        end_date: projectData.end_date || null,
        budget: projectData.budget ? parseFloat(projectData.budget.toString()) : null,
        progress: projectData.progress || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('projects')
        .insert([projectToCreate])
        .select(`
          *,
          client:client_id (
            id,
            name,
            email
          ),
          commercial:commercial_id (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .single();

      if (error) {
        console.error('Erreur lors de la création du projet:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Erreur dans createProject:', error);
      throw error;
    }
  },

  async updateProject(id: string, projectData: Partial<Project>) {
    try {
      if (!id) {
        throw new Error('ID du projet requis pour la mise à jour');
      }

      // Préparation des données à mettre à jour
      const updateData: any = {
        updated_at: new Date().toISOString()
      };

      // Ajouter seulement les champs fournis
      if (projectData.name !== undefined) updateData.name = projectData.name;
      if (projectData.description !== undefined) updateData.description = projectData.description;
      if (projectData.client_id !== undefined) updateData.client_id = projectData.client_id;
      if (projectData.commercial_id !== undefined) updateData.commercial_id = projectData.commercial_id;
      if (projectData.status !== undefined) updateData.status = projectData.status;
      if (projectData.priority !== undefined) updateData.priority = projectData.priority;
      if (projectData.start_date !== undefined) updateData.start_date = projectData.start_date;
      if (projectData.end_date !== undefined) updateData.end_date = projectData.end_date;
      if (projectData.budget !== undefined) {
        updateData.budget = projectData.budget ? parseFloat(projectData.budget.toString()) : null;
      }
      if (projectData.progress !== undefined) updateData.progress = projectData.progress;

      const { data, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          client:client_id (
            id,
            name,
            email
          ),
          commercial:commercial_id (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .single();

      if (error) {
        console.error('Erreur lors de la mise à jour du projet:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Erreur dans updateProject:', error);
      throw error;
    }
  },

  async deleteProject(id: string) {
    try {
      if (!id) {
        throw new Error('ID du projet requis pour la suppression');
      }

      // Supprimer d'abord les tâches et jalons associés
      await supabase.from('project_tasks').delete().eq('project_id', id);
      await supabase.from('project_milestones').delete().eq('project_id', id);
      await supabase.from('project_files').delete().eq('project_id', id);

      // Puis supprimer le projet
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erreur lors de la suppression du projet:', error);
        throw error;
      }
      return true;
    } catch (error) {
      console.error('Erreur dans deleteProject:', error);
      throw error;
    }
  },

  // Gestion des tâches
  async getProjectTasks(projectId: string) {
    try {
      const { data, error } = await supabase
        .from('project_tasks')
        .select(`
          *,
          assigned_user:assigned_to (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Erreur lors de la récupération des tâches:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Erreur dans getProjectTasks:', error);
      return [];
    }
  },

  async createTask(taskData: Partial<ProjectTask>) {
    try {
      const { data, error } = await supabase
        .from('project_tasks')
        .insert([taskData])
        .select()
        .single();

      if (error) {
        console.warn('Erreur lors de la création de la tâche:', error);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Erreur dans createTask:', error);
      return null;
    }
  },

  async updateTask(id: string, taskData: Partial<ProjectTask>) {
    try {
      const { data, error } = await supabase
        .from('project_tasks')
        .update(taskData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.warn('Erreur lors de la mise à jour de la tâche:', error);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Erreur dans updateTask:', error);
      return null;
    }
  },

  async deleteTask(id: string) {
    try {
      const { error } = await supabase
        .from('project_tasks')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('Erreur lors de la suppression de la tâche:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Erreur dans deleteTask:', error);
      return false;
    }
  },

  // Gestion des jalons
  async getProjectMilestones(projectId: string) {
    try {
      const { data, error } = await supabase
        .from('project_milestones')
        .select('*')
        .eq('project_id', projectId)
        .order('due_date', { ascending: true });

      if (error) {
        console.warn('Erreur lors de la récupération des jalons:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Erreur dans getProjectMilestones:', error);
      return [];
    }
  },

  async createMilestone(milestoneData: Partial<ProjectMilestone>) {
    try {
      const { data, error } = await supabase
        .from('project_milestones')
        .insert([milestoneData])
        .select()
        .single();

      if (error) {
        console.warn('Erreur lors de la création du jalon:', error);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Erreur dans createMilestone:', error);
      return null;
    }
  },

  async updateMilestone(id: string, milestoneData: Partial<ProjectMilestone>) {
    try {
      const { data, error } = await supabase
        .from('project_milestones')
        .update(milestoneData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.warn('Erreur lors de la mise à jour du jalon:', error);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Erreur dans updateMilestone:', error);
      return null;
    }
  },

  async deleteMilestone(id: string) {
    try {
      const { error } = await supabase
        .from('project_milestones')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('Erreur lors de la suppression du jalon:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Erreur dans deleteMilestone:', error);
      return false;
    }
  }
};

export default supabase;

import { useState, useEffect, useCallback } from 'react';
import { clientService, invoiceService, quoteService, supportService, projectService } from '../services/supabase';

interface UseApiDataOptions {
  endpoint: string;
  autoFetch?: boolean;
}

export const useApiData = <T>({ endpoint, autoFetch = true }: UseApiDataOptions) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // MODE PRODUCTION : Utiliser directement Supabase
      // const isDevMode = import.meta.env.DEV;
      
      // if (isDevMode) {
      //   console.log(`🚀 Mode rapide : données mock pour ${endpoint}`);
      //   let mockData: T[] = [];
      //   switch (endpoint) {
      //     case 'clients':
      //       mockData = mockClients as T[];
      //       break;
      //     case 'invoices':
      //       mockData = mockInvoices as T[];
      //       break;
      //     case 'quotes':
      //       mockData = mockQuotes as T[];
      //       break;
      //     case 'support-tickets':
      //       mockData = mockTickets as T[];
      //       break;
      //     default:
      //       mockData = [];
      //   }
      //   
      //   // Simuler un délai minimal pour l'UX
      //   await mockApiResponse(mockData, 50);
      //   setData(mockData);
      //   setLoading(false);
      //   return;
      // }

      // Mode production : appels Supabase normaux
      let result;
      switch (endpoint) {
        case 'clients':
          result = await clientService.getClients();
          break;
        case 'invoices':
          result = await invoiceService.getInvoices();
          break;
        case 'quotes':
          result = await quoteService.getQuotes();
          break;
        case 'support-tickets':
          result = await supportService.getTickets();
          break;
        case 'projects':
          result = await projectService.getProjects();
          break;
        default:
          result = [];
      }
      setData(Array.isArray(result) ? result : []);
    } catch (err: any) {
      const errorMessage = err?.message || err?.error?.message || 'Erreur lors du chargement des données';
      setError(errorMessage);
      console.error(`Erreur fetch ${endpoint}:`, err);
      // En cas d'erreur, on initialise avec un tableau vide
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const createItem = useCallback(async (itemData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      let newItem;
      switch (endpoint) {
        case 'clients':
          newItem = await clientService.createClient(itemData);
          break;
        case 'invoices':
          newItem = await invoiceService.createInvoice(itemData);
          break;
        case 'quotes':
          newItem = await quoteService.createQuote(itemData);
          break;
        case 'support-tickets':
          newItem = await supportService.createTicket(itemData);
          break;
        case 'projects':
          newItem = await projectService.createProject(itemData);
          break;
        default:
          throw new Error(`Endpoint ${endpoint} non supporté`);
      }
      setData(prev => [...prev, newItem]);
      return newItem;
    } catch (err: any) {
      const errorMessage = err?.message || 'Erreur lors de la création';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const updateItem = useCallback(async (id: string, itemData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      let updatedItem;
      switch (endpoint) {
        case 'clients':
          updatedItem = await clientService.updateClient(id, itemData);
          break;
        case 'invoices':
          // Pour l'instant, simuler la mise à jour des factures
          updatedItem = { ...itemData, id };
          break;
        case 'quotes':
          // Pour l'instant, simuler la mise à jour des devis
          updatedItem = { ...itemData, id };
          break;
        case 'support-tickets':
          // Pour l'instant, simuler la mise à jour des tickets
          updatedItem = { ...itemData, id };
          break;
        case 'projects':
          updatedItem = await projectService.updateProject(id, itemData);
          break;
        default:
          throw new Error(`Endpoint ${endpoint} non supporté pour la mise à jour`);
      }
      
      setData(prev => prev.map(item => 
        (item as any).id === id ? { ...item, ...updatedItem } : item
      ));
      return updatedItem;
    } catch (err: any) {
      const errorMessage = err?.message || 'Erreur lors de la mise à jour';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const deleteItem = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      switch (endpoint) {
        case 'clients':
          await clientService.deleteClient(id);
          break;
        case 'invoices':
          // Pour l'instant, simuler la suppression des factures
          break;
        case 'quotes':
          // Pour l'instant, simuler la suppression des devis
          break;
        case 'support-tickets':
          // Pour l'instant, simuler la suppression des tickets
          break;
        case 'projects':
          await projectService.deleteProject(id);
          break;
        default:
          throw new Error(`Endpoint ${endpoint} non supporté pour la suppression`);
      }
      
      setData(prev => prev.filter(item => (item as any).id !== id));
    } catch (err: any) {
      const errorMessage = err?.message || 'Erreur lors de la suppression';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return {
    data,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
    setData
  };
};

// Hook spécialisé pour les statistiques
export const useDashboardStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Pour l'instant, retourner des stats par défaut
      setStats({
        totalUsers: 0,
        totalClients: 0,
        totalRevenue: 0,
        openTickets: 0
      });
    } catch (err: any) {
      const errorMessage = err?.message || err?.error?.message || 'Erreur lors du chargement des statistiques';
      setError(errorMessage);
      console.error('Erreur fetch stats:', err);
      // En cas d'erreur, on initialise avec des stats par défaut
      setStats({
        totalUsers: 0,
        totalClients: 0,
        totalRevenue: 0,
        openTickets: 0,
        revenueGrowth: 0,
        clientsGrowth: 0,
        projectsGrowth: 0
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};

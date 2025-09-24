// Hook pour récupérer les données via l'API Supabase
import { useState, useEffect, useCallback } from 'react';
import { dataService } from '../services/supabase';

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
      // Utiliser dataService pour récupérer les données
      const result = await dataService.getTableData(endpoint) as T[];
      setData(result);
    } catch (err: any) {
      setError(err.message || `Erreur lors du chargement des ${endpoint}`);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch
  };
};

// Hook pour les statistiques
export const useStats = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalInvoices: 0,
    totalQuotes: 0,
    totalTickets: 0,
    totalProjects: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Récupérer les statistiques de chaque table
      const [clients, invoices, quotes, tickets, projects] = await Promise.all([
        dataService.getTableData('clients'),
        dataService.getTableData('invoices'),
        dataService.getTableData('quotes'),
        dataService.getTableData('support_tickets'),
        dataService.getTableData('projects')
      ]);

      setStats({
        totalClients: clients.length,
        totalInvoices: invoices.length,
        totalQuotes: quotes.length,
        totalTickets: tickets.length,
        totalProjects: projects.length
      });
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des statistiques');
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
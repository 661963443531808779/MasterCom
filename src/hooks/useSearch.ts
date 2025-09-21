import { useState, useCallback, useMemo } from 'react';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'component' | 'client' | 'project' | 'invoice' | 'quote' | 'ticket';
  url?: string;
  metadata?: Record<string, any>;
  score: number;
}

export interface SearchOptions {
  maxResults?: number;
  minScore?: number;
  includeMetadata?: boolean;
  types?: SearchResult['type'][];
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isSearching: boolean;
  totalResults: number;
  searchTime: number;
  suggestions: string[];
}

// Données de recherche simulées (dans un vrai projet, cela viendrait d'une API)
const searchData: SearchResult[] = [
  // Pages
  { id: 'home', title: 'Accueil', description: 'Page d\'accueil de MasterCom', type: 'page', url: '/', score: 1 },
  { id: 'about', title: 'À propos', description: 'Présentation de l\'équipe et des valeurs', type: 'page', url: '/about', score: 1 },
  { id: 'services', title: 'Services', description: 'Nos services de communication', type: 'page', url: '/services', score: 1 },
  { id: 'portfolio', title: 'Portfolio', description: 'Nos réalisations et projets', type: 'page', url: '/portfolio', score: 1 },
  { id: 'blog', title: 'Blog', description: 'Articles et actualités', type: 'page', url: '/blog', score: 1 },
  { id: 'contact', title: 'Contact', description: 'Formulaire de contact', type: 'page', url: '/contact', score: 1 },
  
  // CRM
  { id: 'crm', title: 'CRM', description: 'Gestion de la relation client', type: 'component', url: '/crm', score: 1 },
  { id: 'dashboard', title: 'Dashboard', description: 'Tableau de bord de gestion', type: 'component', url: '/dashboard', score: 1 },
  
  // Clients simulés
  { id: 'client-1', title: 'TechCorp', description: 'Entreprise technologique - Client actif', type: 'client', metadata: { status: 'active', industry: 'technology' }, score: 1 },
  { id: 'client-2', title: 'FashionBrand', description: 'Marque de mode - Projet en cours', type: 'client', metadata: { status: 'active', industry: 'fashion' }, score: 1 },
  { id: 'client-3', title: 'StartupInnovante', description: 'Startup fintech - Nouveau client', type: 'client', metadata: { status: 'prospect', industry: 'fintech' }, score: 1 },
  
  // Projets simulés
  { id: 'project-1', title: 'Rebranding TechCorp', description: 'Refonte complète de l\'identité visuelle', type: 'project', metadata: { status: 'active', client: 'TechCorp' }, score: 1 },
  { id: 'project-2', title: 'Campagne Social Media', description: 'Stratégie réseaux sociaux FashionBrand', type: 'project', metadata: { status: 'completed', client: 'FashionBrand' }, score: 1 },
  
  // Factures simulées
  { id: 'invoice-1', title: 'Facture #INV-001', description: 'Facture TechCorp - Rebranding', type: 'invoice', metadata: { amount: 15000, status: 'paid' }, score: 1 },
  { id: 'invoice-2', title: 'Facture #INV-002', description: 'Facture FashionBrand - Social Media', type: 'invoice', metadata: { amount: 8500, status: 'pending' }, score: 1 },
];

const searchSuggestions = [
  'clients', 'projets', 'factures', 'devis', 'support', 'dashboard', 'crm',
  'branding', 'social media', 'marketing', 'communication', 'créativité',
  'TechCorp', 'FashionBrand', 'StartupInnovante'
];

export const useSearch = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    results: [],
    isSearching: false,
    totalResults: 0,
    searchTime: 0,
    suggestions: [],
  });

  // Fonction de scoring simple
  const calculateScore = useCallback((item: SearchResult, query: string): number => {
    const queryLower = query.toLowerCase();
    const titleLower = item.title.toLowerCase();
    const descriptionLower = item.description.toLowerCase();

    let score = 0;

    // Score basé sur la correspondance exacte dans le titre
    if (titleLower.includes(queryLower)) {
      score += 10;
    }

    // Score basé sur la correspondance dans la description
    if (descriptionLower.includes(queryLower)) {
      score += 5;
    }

    // Score basé sur les mots individuels
    const queryWords = queryLower.split(' ').filter(word => word.length > 2);
    queryWords.forEach(word => {
      if (titleLower.includes(word)) score += 3;
      if (descriptionLower.includes(word)) score += 1;
    });

    // Bonus pour les correspondances au début
    if (titleLower.startsWith(queryLower)) {
      score += 5;
    }

    return score;
  }, []);

  // Fonction de recherche
  const search = useCallback(async (query: string, options: SearchOptions = {}) => {
    if (!query.trim()) {
      setSearchState(prev => ({
        ...prev,
        query: '',
        results: [],
        totalResults: 0,
        searchTime: 0,
        suggestions: searchSuggestions.slice(0, 5),
      }));
      return;
    }

    setSearchState(prev => ({ ...prev, isSearching: true }));

    const startTime = performance.now();

    // Simuler un délai de recherche
    await new Promise(resolve => setTimeout(resolve, 200));

    // Filtrer et scorer les résultats
    let results = searchData
      .map(item => ({
        ...item,
        score: calculateScore(item, query),
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    // Filtrer par types si spécifié
    if (options.types && options.types.length > 0) {
      results = results.filter(item => options.types!.includes(item.type));
    }

    // Appliquer le score minimum
    if (options.minScore) {
      results = results.filter(item => item.score >= options.minScore!);
    }

    // Limiter le nombre de résultats
    if (options.maxResults) {
      results = results.slice(0, options.maxResults);
    }

    // Générer des suggestions basées sur la query
    const suggestions = searchSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase()) &&
        suggestion.toLowerCase() !== query.toLowerCase()
      )
      .slice(0, 5);

    const searchTime = performance.now() - startTime;

    setSearchState(prev => ({
      ...prev,
      query,
      results,
      isSearching: false,
      totalResults: results.length,
      searchTime,
      suggestions,
    }));
  }, [calculateScore]);

  // Recherche en temps réel (debounced)
  const debouncedSearch = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    
    return (query: string, options?: SearchOptions) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        search(query, options);
      }, 300);
    };
  }, [search]);

  // Recherche instantanée
  const searchInstant = useCallback((query: string, options?: SearchOptions) => {
    search(query, options);
  }, [search]);

  // Effacer la recherche
  const clearSearch = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      query: '',
      results: [],
      totalResults: 0,
      searchTime: 0,
      suggestions: searchSuggestions.slice(0, 5),
    }));
  }, []);

  // Obtenir des suggestions
  const getSuggestions = useCallback((query: string): string[] => {
    if (!query.trim()) {
      return searchSuggestions.slice(0, 5);
    }

    return searchSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase()) &&
        suggestion.toLowerCase() !== query.toLowerCase()
      )
      .slice(0, 5);
  }, []);

  // Recherche avancée avec filtres
  const advancedSearch = useCallback((params: {
    query?: string;
    type?: SearchResult['type'];
    status?: string;
    industry?: string;
    dateRange?: { start: Date; end: Date };
    sortBy?: 'relevance' | 'date' | 'title';
  }) => {
    let results = [...searchData];

    // Filtrer par query
    if (params.query) {
      results = results
        .map(item => ({
          ...item,
          score: calculateScore(item, params.query!),
        }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);
    }

    // Filtrer par type
    if (params.type) {
      results = results.filter(item => item.type === params.type);
    }

    // Filtrer par statut (si disponible dans metadata)
    if (params.status) {
      results = results.filter(item => 
        item.metadata?.status === params.status
      );
    }

    // Filtrer par industrie (si disponible dans metadata)
    if (params.industry) {
      results = results.filter(item => 
        item.metadata?.industry === params.industry
      );
    }

    // Trier
    if (params.sortBy === 'title') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (params.sortBy === 'date') {
      // Dans un vrai projet, vous auriez des dates réelles
      results.sort((a, b) => b.id.localeCompare(a.id));
    }

    setSearchState(prev => ({
      ...prev,
      query: params.query || '',
      results,
      totalResults: results.length,
      searchTime: 0,
    }));
  }, [calculateScore]);

  return {
    ...searchState,
    search: debouncedSearch,
    searchInstant,
    clearSearch,
    getSuggestions,
    advancedSearch,
  };
};

// Hook pour la recherche globale
export const useGlobalSearch = () => {
  const search = useSearch();
  const [isOpen, setIsOpen] = useState(false);

  // Raccourci clavier (Ctrl/Cmd + K)
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      setIsOpen(true);
    }
    
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
      search.clearSearch();
    }
  }, [isOpen, search]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    ...search,
    isOpen,
    setIsOpen,
  };
};

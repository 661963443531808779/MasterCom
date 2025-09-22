import React, { useEffect, useRef } from 'react';
import { Search, X, Clock, FileText, Users, Folder, DollarSign, MessageSquare, ExternalLink } from 'lucide-react';

// Hook de recherche - version production
const useGlobalSearch = () => ({
  query: '',
  results: [],
  isSearching: false,
  suggestions: [],
  isOpen: false,
  setIsOpen: () => {},
  searchInstant: () => {},
  clearSearch: () => {}
});

const GlobalSearch: React.FC = () => {
  const { 
    query, 
    results, 
    isSearching, 
    suggestions, 
    isOpen, 
    setIsOpen, 
    searchInstant, 
    clearSearch 
  } = useGlobalSearch();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Focus sur l'input quand le modal s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Fermer le modal en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        clearSearch();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, setIsOpen, clearSearch]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'page':
        return <FileText className="h-4 w-4" />;
      case 'component':
        return <Folder className="h-4 w-4" />;
      case 'client':
        return <Users className="h-4 w-4" />;
      case 'project':
        return <Folder className="h-4 w-4" />;
      case 'invoice':
        return <DollarSign className="h-4 w-4" />;
      case 'quote':
        return <FileText className="h-4 w-4" />;
      case 'ticket':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'page':
        return 'Page';
      case 'component':
        return 'Module';
      case 'client':
        return 'Client';
      case 'project':
        return 'Projet';
      case 'invoice':
        return 'Facture';
      case 'quote':
        return 'Devis';
      case 'ticket':
        return 'Ticket';
      default:
        return 'Résultat';
    }
  };

  const handleResultClick = (result: any) => {
    if (result.url) {
      window.location.href = result.url;
    }
    setIsOpen(false);
    clearSearch();
  };

  const handleSuggestionClick = (suggestion: string) => {
    searchInstant(suggestion);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div 
        ref={searchRef}
        className="w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher dans MasterCom..."
            value={query}
            onChange={(e) => searchInstant(e.target.value)}
            className="flex-1 bg-transparent text-lg placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={() => {
              setIsOpen(false);
              clearSearch();
            }}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenu */}
        <div className="max-h-96 overflow-y-auto">
          {isSearching && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600 dark:text-gray-400">Recherche...</span>
            </div>
          )}

          {!isSearching && query && results.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Aucun résultat trouvé pour "{query}"</p>
            </div>
          )}

          {!isSearching && query && results.length > 0 && (
            <div className="py-2">
              <div className="px-6 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Résultats ({results.length})
              </div>
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-6 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1 text-gray-400">
                      {getIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {result.title}
                        </h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {result.description}
                      </p>
                      {result.metadata && (
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                          {result.metadata.status && (
                            <span className={`px-2 py-0.5 rounded-full ${
                              result.metadata.status === 'active' ? 'bg-green-100 text-green-800' :
                              result.metadata.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              result.metadata.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {result.metadata.status}
                            </span>
                          )}
                          {result.metadata.amount && (
                            <span>{result.metadata.amount.toLocaleString()}€</span>
                          )}
                          {result.metadata.industry && (
                            <span>{result.metadata.industry}</span>
                          )}
                        </div>
                      )}
                    </div>
                    {result.url && (
                      <div className="flex-shrink-0 text-gray-400">
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {!isSearching && !query && suggestions.length > 0 && (
            <div className="py-2">
              <div className="px-6 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-6 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <div className="flex items-center space-x-3">
                    <Search className="h-4 w-4 text-gray-400" />
                    <span>{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-600 rounded text-xs">↵</kbd>
                <span className="ml-1">Sélectionner</span>
              </span>
              <span className="flex items-center">
                <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-600 rounded text-xs">Esc</kbd>
                <span className="ml-1">Fermer</span>
              </span>
            </div>
            <div className="flex items-center">
              <span>Recherche globale</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;

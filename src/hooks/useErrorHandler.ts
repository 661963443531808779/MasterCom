import { useState, useCallback } from 'react';

interface ErrorState {
  hasError: boolean;
  error: string | null;
  errorDetails?: any;
}

interface UseErrorHandlerReturn {
  error: string | null;
  hasError: boolean;
  errorDetails?: any;
  setError: (error: string | null, details?: any) => void;
  clearError: () => void;
  handleError: (error: any) => void;
}

export const useErrorHandler = (): UseErrorHandlerReturn => {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    errorDetails: undefined
  });

  const setError = useCallback((error: string | null, details?: any) => {
    setErrorState({
      hasError: !!error,
      error,
      errorDetails: details
    });
  }, []);

  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
      errorDetails: undefined
    });
  }, []);

  const handleError = useCallback((error: any) => {
    let errorMessage = 'Une erreur inattendue s\'est produite';
    
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (error?.error?.message) {
      errorMessage = error.error.message;
    }
    
    console.error('Erreur gérée:', error);
    setError(errorMessage, error);
  }, [setError]);

  return {
    error: errorState.error,
    hasError: errorState.hasError,
    errorDetails: errorState.errorDetails,
    setError,
    clearError,
    handleError
  };
};

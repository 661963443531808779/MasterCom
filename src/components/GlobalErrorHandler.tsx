import React, { useEffect } from 'react';

interface GlobalErrorHandlerProps {
  children: React.ReactNode;
}

const GlobalErrorHandler: React.FC<GlobalErrorHandlerProps> = ({ children }) => {
  useEffect(() => {
    // Gestionnaire d'erreurs global pour les erreurs non capturées
    const handleError = (event: ErrorEvent) => {
      console.error('Erreur globale capturée:', event.error);
      
      // Optionnel: envoyer l'erreur à un service de monitoring
      // sendErrorToMonitoring(event.error);
    };

    // Gestionnaire pour les promesses rejetées non gérées
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Promesse rejetée non gérée:', event.reason);
      
      // Optionnel: envoyer l'erreur à un service de monitoring
      // sendErrorToMonitoring(event.reason);
    };

    // Ajouter les écouteurs d'événements
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Nettoyage
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return <>{children}</>;
};

export default GlobalErrorHandler;

import { useState, useEffect, FC } from 'react';
import { CheckCircle, XCircle, AlertCircle, Cloud } from 'lucide-react';
import { supabase } from '../services/supabase';

interface HealthStatus {
  frontend: boolean;
  supabase: boolean;
  database: boolean;
}

const HealthCheck: FC = () => {
  const [status, setStatus] = useState<HealthStatus>({
    frontend: false,
    supabase: false,
    database: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        // Test frontend
        setStatus(prev => ({ ...prev, frontend: true }));

        // Test Supabase
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) {
            console.warn('Supabase non accessible:', error);
            setStatus(prev => ({ ...prev, supabase: false }));
          } else {
            setStatus(prev => ({ ...prev, supabase: true }));
          }
        } catch (error) {
          console.warn('Supabase non disponible:', error);
          setStatus(prev => ({ ...prev, supabase: false }));
        }

        // Test base de données Supabase
        try {
          const { data, error } = await supabase
            .from('roles')
            .select('id')
            .limit(1);
          
          if (error) {
            console.warn('Base de données Supabase non accessible:', error);
            setStatus(prev => ({ ...prev, database: false }));
          } else {
            setStatus(prev => ({ ...prev, database: true }));
          }
        } catch (error) {
          console.warn('Base de données non accessible:', error);
          setStatus(prev => ({ ...prev, database: false }));
        }

      } catch (error) {
        console.error('Erreur lors du health check:', error);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  const getStatusIcon = (isHealthy: boolean) => {
    return isHealthy ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  const getStatusText = (isHealthy: boolean) => {
    return isHealthy ? 'Opérationnel' : 'Hors service';
  };

  const getStatusColor = (isHealthy: boolean) => {
    return isHealthy ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold">Vérification du système</h3>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold">État du système</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Frontend</span>
          <div className="flex items-center">
            {getStatusIcon(status.frontend)}
            <span className={`ml-2 text-sm ${getStatusColor(status.frontend)}`}>
              {getStatusText(status.frontend)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Supabase</span>
          <div className="flex items-center">
            {getStatusIcon(status.supabase)}
            <span className={`ml-2 text-sm ${getStatusColor(status.supabase)}`}>
              {getStatusText(status.supabase)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Base de données</span>
          <div className="flex items-center">
            {getStatusIcon(status.database)}
            <span className={`ml-2 text-sm ${getStatusColor(status.database)}`}>
              {getStatusText(status.database)}
            </span>
          </div>
        </div>
      </div>

      {!status.supabase && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Supabase n'est pas accessible. Vérifiez votre configuration dans le fichier .env.
          </p>
        </div>
      )}
      
      {!status.database && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            La base de données n'est pas encore initialisée. Exécutez le script SQL dans Supabase pour créer les tables.
          </p>
        </div>
      )}
    </div>
  );
};

export default HealthCheck;

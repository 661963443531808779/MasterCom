import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

interface DiagnosticResult {
  test: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: string;
}

const ConnectionDiagnostic: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    setDiagnostics([]);

    const results: DiagnosticResult[] = [];

    // Test 1: Vérifier les variables d'environnement
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    results.push({
      test: 'Variables d\'environnement',
      status: supabaseUrl && supabaseKey ? 'success' : 'error',
      message: supabaseUrl && supabaseKey ? 'Variables configurées' : 'Variables manquantes',
      details: `URL: ${supabaseUrl ? '✅' : '❌'}, Key: ${supabaseKey ? '✅' : '❌'}`
    });

    // Test 2: Test de connectivité DNS
    try {
      const testUrl = supabaseUrl || 'https://gpnjamtnogyfvykgdiwd.supabase.co';
      const response = await fetch(`${testUrl}/rest/v1/`, {
        method: 'HEAD',
        mode: 'no-cors'
      });
      results.push({
        test: 'Connectivité DNS',
        status: 'success',
        message: 'DNS résolu avec succès',
        details: `URL testée: ${testUrl}`
      });
    } catch (error: any) {
      results.push({
        test: 'Connectivité DNS',
        status: 'error',
        message: 'Impossible de résoudre le DNS',
        details: error.message
      });
    }

    // Test 3: Test de connectivité réseau
    try {
      const response = await fetch('https://httpbin.org/get', {
        method: 'GET',
        mode: 'cors'
      });
      results.push({
        test: 'Connectivité réseau',
        status: response.ok ? 'success' : 'warning',
        message: response.ok ? 'Réseau fonctionnel' : 'Problème réseau',
        details: `Status: ${response.status}`
      });
    } catch (error: any) {
      results.push({
        test: 'Connectivité réseau',
        status: 'error',
        message: 'Pas de connectivité internet',
        details: error.message
      });
    }

    // Test 4: Test Supabase spécifique
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gpnjamtnogyfvykgdiwd.supabase.co';
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';
      
      const response = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'HEAD',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });

      results.push({
        test: 'API Supabase',
        status: response.ok ? 'success' : 'error',
        message: response.ok ? 'API Supabase accessible' : 'API Supabase inaccessible',
        details: `Status: ${response.status}`
      });
    } catch (error: any) {
      results.push({
        test: 'API Supabase',
        status: 'error',
        message: 'Erreur de connexion à Supabase',
        details: error.message
      });
    }

    setDiagnostics(results);
    setIsRunning(false);
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <WifiOff className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Wifi className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wifi className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Diagnostic de Connexion</h2>
            </div>
            <button
              onClick={runDiagnostics}
              disabled={isRunning}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Test en cours...' : 'Relancer les tests'}</span>
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Diagnostic automatique des problèmes de connexion à Supabase
          </p>
        </div>

        <div className="p-6">
          {diagnostics.length === 0 && !isRunning && (
            <div className="text-center py-8">
              <Wifi className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Cliquez sur "Relancer les tests" pour commencer</p>
            </div>
          )}

          {isRunning && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Exécution des tests de diagnostic...</p>
            </div>
          )}

          {diagnostics.length > 0 && (
            <div className="space-y-4">
              {diagnostics.map((diagnostic, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getStatusColor(diagnostic.status)}`}
                >
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(diagnostic.status)}
                    <div className="flex-1">
                      <h3 className="font-medium">{diagnostic.test}</h3>
                      <p className="text-sm mt-1">{diagnostic.message}</p>
                      {diagnostic.details && (
                        <p className="text-xs mt-2 opacity-75">{diagnostic.details}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Solutions suggérées */}
          {diagnostics.some(d => d.status === 'error') && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Solutions suggérées :</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Vérifiez votre connexion internet</li>
                <li>• Vérifiez que l'URL Supabase est correcte</li>
                <li>• Vérifiez que la clé API est valide</li>
                <li>• Essayez de rafraîchir la page</li>
                <li>• Contactez l'administrateur si le problème persiste</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionDiagnostic;

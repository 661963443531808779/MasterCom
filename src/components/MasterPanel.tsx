import { useState, useEffect, FC } from 'react';
import { 
  Shield, Users, Settings, Database, Activity, 
  TrendingUp, AlertTriangle, CheckCircle, Clock,
  BarChart3, PieChart, Eye, Download, RefreshCw
} from 'lucide-react';
import { supabase } from '../services/supabase';

interface MasterPanelProps {
  userRole: string;
}

interface SystemStats {
  totalUsers: number;
  activeSessions: number;
  databaseSize: string;
  lastBackup: string;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
}

const MasterPanel: FC<MasterPanelProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalUsers: 0,
    activeSessions: 0,
    databaseSize: '0 MB',
    lastBackup: 'Jamais',
    systemHealth: 'excellent'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Vérifier si l'utilisateur est master
  if (userRole !== 'master') {
    return (
      <div className="text-center py-12">
        <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Accès Restreint</h3>
        <p className="text-gray-600">Seuls les comptes Master peuvent accéder à ce panneau.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'users', label: 'Gestion Utilisateurs', icon: <Users className="h-4 w-4" /> },
    { id: 'system', label: 'Système', icon: <Settings className="h-4 w-4" /> },
    { id: 'database', label: 'Base de Données', icon: <Database className="h-4 w-4" /> },
    { id: 'analytics', label: 'Analytiques', icon: <TrendingUp className="h-4 w-4" /> }
  ];

  const loadSystemStats = async () => {
    setIsLoading(true);
    try {
      // Simuler le chargement des statistiques système
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSystemStats({
        totalUsers: 156,
        activeSessions: 23,
        databaseSize: '2.4 GB',
        lastBackup: 'Il y a 2 heures',
        systemHealth: 'excellent'
      });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSystemStats();
  }, []);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Utilisateurs Total</p>
              <p className="text-3xl font-bold">{systemStats.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Sessions Actives</p>
              <p className="text-3xl font-bold">{systemStats.activeSessions}</p>
            </div>
            <Activity className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Taille BDD</p>
              <p className="text-3xl font-bold">{systemStats.databaseSize}</p>
            </div>
            <Database className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Dernière Sauvegarde</p>
              <p className="text-sm font-bold">{systemStats.lastBackup}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Santé du système */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          Santé du Système
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              systemStats.systemHealth === 'excellent' ? 'bg-green-500' :
              systemStats.systemHealth === 'good' ? 'bg-yellow-500' :
              systemStats.systemHealth === 'warning' ? 'bg-orange-500' : 'bg-red-500'
            }`}></div>
            <span className="font-medium capitalize">{systemStats.systemHealth}</span>
          </div>
          <button 
            onClick={loadSystemStats}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Actualiser</span>
          </button>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Users className="h-6 w-6 mx-auto mb-2 text-gray-400" />
            <span className="text-sm font-medium">Nouvel Utilisateur</span>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <Database className="h-6 w-6 mx-auto mb-2 text-gray-400" />
            <span className="text-sm font-medium">Sauvegarde</span>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <Settings className="h-6 w-6 mx-auto mb-2 text-gray-400" />
            <span className="text-sm font-medium">Configuration</span>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
            <Download className="h-6 w-6 mx-auto mb-2 text-gray-400" />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Gestion des Utilisateurs</h3>
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Fonctionnalité en cours de développement</p>
      </div>
    </div>
  );

  const renderSystem = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Configuration Système</h3>
      <div className="text-center py-12">
        <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Fonctionnalité en cours de développement</p>
      </div>
    </div>
  );

  const renderDatabase = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Gestion Base de Données</h3>
      <div className="text-center py-12">
        <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Fonctionnalité en cours de développement</p>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Analytiques Avancées</h3>
      <div className="text-center py-12">
        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Fonctionnalité en cours de développement</p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'users': return renderUsers();
      case 'system': return renderSystem();
      case 'database': return renderDatabase();
      case 'analytics': return renderAnalytics();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panneau Master</h1>
              <p className="text-gray-600">Administration et supervision du système</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MasterPanel;

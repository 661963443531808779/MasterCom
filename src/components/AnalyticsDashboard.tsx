import React, { useState, useEffect } from 'react';
import { 
  Users, FileText, Euro, MessageSquare, TrendingUp, MapPin,
  Calendar, BarChart3, PieChart, Download, RefreshCw
} from 'lucide-react';
import { analyticsService, Analytics } from '../services/supabase';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsDashboardProps {
  userRole: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ userRole }) => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    loadAnalytics();
  }, [selectedPeriod]);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);
      const data = await analyticsService.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Erreur lors du chargement des analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToPowerBI = async () => {
    try {
      const data = await analyticsService.getPowerBIData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mastercom-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune donnée disponible</h3>
        <p className="text-gray-600">Les statistiques seront disponibles une fois que des données seront ajoutées.</p>
      </div>
    );
  }

  // Préparation des données pour les graphiques
  const revenueData = analytics.revenueByMonth?.map(item => ({
    month: item.month,
    revenue: item.revenue || 0
  })) || [];

  const usersByRegionData = analytics.usersByRegion?.map(item => ({
    region: item.region || 'Non spécifié',
    count: item.count || 0
  })) || [];

  const clientsByRegionData = analytics.clientsByRegion?.map(item => ({
    region: item.region || 'Non spécifié',
    count: item.count || 0
  })) || [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tableau de Bord Analytique</h2>
          <p className="text-gray-600">Vue d'ensemble de vos performances et statistiques</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
            <option value="1y">1 an</option>
          </select>
          <button
            onClick={loadAnalytics}
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </button>
          <button
            onClick={exportToPowerBI}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Power BI
          </button>
        </div>
      </div>

      {/* KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers?.count || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clients</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalClients?.count || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Euro className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Chiffre d'affaires</p>
              <p className="text-2xl font-bold text-gray-900">
                {(analytics.totalRevenue?.total || 0).toLocaleString()}€
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tickets ouverts</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.openTickets?.count || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Évolution du CA</h3>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}€`, 'CA']} />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users by Region */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Utilisateurs par région</h3>
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={usersByRegionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ region, count }) => `${region}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {usersByRegionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clients by Region */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Clients par région</h3>
            <MapPin className="h-5 w-5 text-green-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clientsByRegionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Résumé d'activité</h3>
            <BarChart3 className="h-5 w-5 text-purple-600" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Factures</span>
              </div>
              <span className="text-lg font-bold text-gray-900">{analytics.totalInvoices?.count || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Devis</span>
              </div>
              <span className="text-lg font-bold text-gray-900">{analytics.totalQuotes?.count || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Tickets</span>
              </div>
              <span className="text-lg font-bold text-gray-900">{analytics.totalTickets?.count || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Utilisateurs</span>
              </div>
              <span className="text-lg font-bold text-gray-900">{analytics.totalUsers?.count || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Power BI Integration Info */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Intégration Power BI</h3>
            <p className="text-blue-100">
              Exportez vos données pour créer des rapports avancés dans Power BI. 
              Les données sont mises à jour en temps réel et incluent toutes les métriques importantes.
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={exportToPowerBI}
              className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100"
            >
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

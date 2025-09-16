import { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Users, DollarSign, Target, 
  ArrowUpRight, ArrowDownRight, Briefcase, RefreshCw,
  BarChart3, UserPlus, Settings, ArrowLeft
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, BarChart, Bar } from 'recharts';
import { useDashboardStats } from '../hooks/useApiData';
import { useAuth } from '../contexts/AuthContext';
// import HealthCheck from '../components/HealthCheck';
// import UserManagement from '../components/UserManagement';
// import AnalyticsDashboard from '../components/AnalyticsDashboard';

const Dashboard: FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [activeTab, setActiveTab] = useState('overview');
  const { stats, loading, error, refetch } = useDashboardStats();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Données par défaut si les stats ne sont pas encore chargées
  const defaultKpiData = [
    { label: 'Chiffre d\'affaires', value: '0€', change: '0%', trend: 'up' },
    { label: 'Nouveaux clients', value: '0', change: '0%', trend: 'up' },
    { label: 'Projets actifs', value: '0', change: '0%', trend: 'up' },
    { label: 'Taux de satisfaction', value: '0%', change: '0%', trend: 'up' },
  ];

  const kpiData = stats ? [
    { 
      label: 'Chiffre d\'affaires', 
      value: `${stats.totalRevenue?.toLocaleString() || 0}€`, 
      change: `+${stats.revenueGrowth || 0}%`, 
      trend: 'up' 
    },
    { 
      label: 'Nouveaux clients', 
      value: stats.newClients || 0, 
      change: `+${stats.clientsGrowth || 0}%`, 
      trend: 'up' 
    },
    { 
      label: 'Projets actifs', 
      value: stats.activeProjects || 0, 
      change: `${stats.projectsGrowth || 0}%`, 
      trend: stats.projectsGrowth >= 0 ? 'up' : 'down' 
    },
    { 
      label: 'Taux de satisfaction', 
      value: `${stats.satisfactionRate || 0}%`, 
      change: `+${stats.satisfactionGrowth || 0}%`, 
      trend: 'up' 
    },
  ] : defaultKpiData;

  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000, projects: 12 },
    { month: 'Fév', revenue: 52000, projects: 14 },
    { month: 'Mar', revenue: 48000, projects: 13 },
    { month: 'Avr', revenue: 61000, projects: 16 },
    { month: 'Mai', revenue: 58000, projects: 15 },
    { month: 'Juin', revenue: 67000, projects: 18 },
  ];


  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'users', label: 'Gestion Utilisateurs', icon: UserPlus },
    { id: 'settings', label: 'Système', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Health Check */}
            <div className="mb-8">
              <HealthCheck />
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpiData.map((kpi, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {index === 0 && <DollarSign className="h-6 w-6 text-blue-600" />}
                      {index === 1 && <Users className="h-6 w-6 text-green-600" />}
                      {index === 2 && <Briefcase className="h-6 w-6 text-purple-600" />}
                      {index === 3 && <Target className="h-6 w-6 text-orange-600" />}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                      <div className="flex items-center mt-1">
                        {kpi.trend === 'up' ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-sm ml-1 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Chart */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution du CA</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: any) => [`${value}€`, 'CA']} />
                      <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Projects Chart */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Projets par mois</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="projects" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        );
      case 'analytics':
        return <div className="p-6 bg-white rounded-lg shadow"><h3 className="text-lg font-semibold mb-4">Analytics</h3><p className="text-gray-600">Interface d'analytics en cours de développement...</p></div>;
      case 'users':
        return <div className="p-6 bg-white rounded-lg shadow"><h3 className="text-lg font-semibold mb-4">Gestion des Utilisateurs</h3><p className="text-gray-600">Interface de gestion des utilisateurs en cours de développement...</p></div>;
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">État du système</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Health Check en cours de développement...</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Master</h1>
              <p className="text-gray-600">Panneau de contrôle administrateur</p>
              {error && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">
                    Erreur lors du chargement des données: {error}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button 
                onClick={() => navigate('/crm')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour CRM
              </button>
              {activeTab === 'overview' && (
                <>
                  <button
                    onClick={refetch}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Actualiser
                  </button>
                  <select 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="1month">30 derniers jours</option>
                    <option value="3months">3 derniers mois</option>
                    <option value="6months">6 derniers mois</option>
                    <option value="1year">12 derniers mois</option>
                  </select>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
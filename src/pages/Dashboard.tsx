import { useState, useEffect, FC } from 'react';
import { 
  TrendingUp, BarChart3, UserPlus, Settings, Users, Folder, FileText,
  Shield, Crown, Activity, Database, Clock, AlertTriangle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, BarChart, Bar } from 'recharts';
import { clientService, projectService, invoiceService, quoteService, supportService } from '../services/supabase';

interface DashboardProps {
  userRole?: string;
}

const Dashboard: FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState({
    clients: [] as any[],
    projects: [] as any[],
    invoices: [] as any[],
    quotes: [] as any[],
    tickets: [] as any[]
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [clientsData, projectsData, invoicesData, quotesData, ticketsData] = await Promise.all([
        clientService.getClients().catch(() => []),
        projectService.getProjects().catch(() => []),
        invoiceService.getInvoices().catch(() => []),
        quoteService.getQuotes().catch(() => []),
        supportService.getTickets().catch(() => [])
      ]);

      setDashboardData({
        clients: clientsData || [],
        projects: projectsData || [],
        invoices: invoicesData || [],
        quotes: quotesData || [],
        tickets: ticketsData || []
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données du dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculer les KPIs à partir des vraies données
  const calculateKPIs = () => {
    const totalRevenue = dashboardData.invoices
      .filter((invoice: any) => invoice.status === 'paid')
      .reduce((sum: number, invoice: any) => sum + (invoice.amount || 0), 0);

    const pendingInvoices = dashboardData.invoices
      .filter((invoice: any) => invoice.status === 'pending').length;

    const activeProjects = dashboardData.projects
      .filter((project: any) => project.status === 'active').length;

    const newClients = dashboardData.clients
      .filter((client: any) => {
        const createdDate = new Date(client.created_at);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return createdDate > thirtyDaysAgo;
      }).length;

    return {
      totalRevenue,
      pendingInvoices,
      activeProjects,
      newClients,
      totalClients: dashboardData.clients.length,
      totalProjects: dashboardData.projects.length,
      totalTickets: dashboardData.tickets.length
    };
  };

  const kpis = calculateKPIs();

  // Données pour les graphiques
  const chartData = [
    { name: 'Jan', clients: 12, projects: 8, revenue: 45000 },
    { name: 'Fév', clients: 19, projects: 12, revenue: 52000 },
    { name: 'Mar', clients: 15, projects: 10, revenue: 48000 },
    { name: 'Avr', clients: 22, projects: 15, revenue: 61000 },
    { name: 'Mai', clients: 18, projects: 11, revenue: 55000 },
    { name: 'Jun', clients: 25, projects: 18, revenue: 68000 }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-semibold text-gray-900">{kpis.totalClients}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Folder className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Projets Actifs</p>
              <p className="text-2xl font-semibold text-gray-900">{kpis.activeProjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Factures en Attente</p>
              <p className="text-2xl font-semibold text-gray-900">{kpis.pendingInvoices}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Chiffre d'Affaires</p>
              <p className="text-2xl font-semibold text-gray-900">
                {kpis.totalRevenue.toLocaleString()} €
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des Clients</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="clients" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des Projets</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="projects" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activité récente */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Activité Récente</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {dashboardData.clients.slice(0, 5).map((client: any, index: number) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{client.name || 'Client sans nom'}</p>
                    <p className="text-sm text-gray-500">{client.email || 'Email non renseigné'}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(client.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'analytics':
        return (
          <div className="p-8 text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Avancées</h3>
            <p className="text-gray-600">Module analytics en cours de développement...</p>
          </div>
        );
      case 'users':
        return (
          <div className="p-8 text-center">
            <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestion des Utilisateurs</h3>
            <p className="text-gray-600">Module de gestion des utilisateurs en cours de développement...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8 text-center">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Paramètres</h3>
            <p className="text-gray-600">Module de paramètres en cours de développement...</p>
          </div>
        );
      default:
        return renderOverviewTab();
    }
  };

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'users', label: 'Utilisateurs', icon: <UserPlus className="h-4 w-4" /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings className="h-4 w-4" /> }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard MasterCom</h1>
              <p className="text-gray-600 mt-1">Tableau de bord de gestion</p>
            </div>
            
            <button
              onClick={loadDashboardData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Actualiser</span>
            </button>
          </div>

          {/* Navigation des onglets */}
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
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

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
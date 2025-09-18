import { useState, useEffect, FC } from 'react';
import { 
  TrendingUp, BarChart3, UserPlus, Settings, Users, Folder, FileText, MessageSquare
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, BarChart, Bar } from 'recharts';
import { clientService, projectService, invoiceService, quoteService, supportService } from '../services/supabase';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import UserManagement from '../components/UserManagement';
import HealthCheck from '../components/HealthCheck';

const Dashboard: FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState({
    clients: [] as any[],
    projects: [] as any[],
    invoices: [] as any[],
    quotes: [] as any[],
    tickets: [] as any[]
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [clientsData, projectsData, invoicesData, quotesData, ticketsData] = await Promise.all([
        clientService.getClients(),
        projectService.getProjects(),
        invoiceService.getInvoices(),
        quoteService.getQuotes(),
        supportService.getTickets()
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
    }
  };

  // Calculer les KPIs à partir des vraies données
  const calculateKPIs = () => {
    const totalRevenue = dashboardData.invoices
      .filter((invoice: any) => invoice.status === 'paid')
      .reduce((sum: number, invoice: any) => sum + invoice.total_amount, 0);

    const activeProjects = dashboardData.projects
      .filter((project: any) => project.status === 'in_progress' || project.status === 'planning')
      .length;

    const openTickets = dashboardData.tickets
      .filter((ticket: any) => ticket.status === 'open' || ticket.status === 'in_progress')
      .length;

    return {
      totalClients: dashboardData.clients.length,
      totalRevenue: totalRevenue,
      activeProjects: activeProjects,
      openTickets: openTickets,
    };
  };

  const kpis = calculateKPIs();

  const renderOverviewTab = () => {
    // Données simulées pour les graphiques
    const monthlyRevenue = [
      { month: 'Jan', revenue: 4000 },
      { month: 'Fév', revenue: 3000 },
      { month: 'Mar', revenue: 5000 },
      { month: 'Avr', revenue: 4500 },
      { month: 'Mai', revenue: 6000 },
      { month: 'Jun', revenue: 5500 },
    ];

    const projectData = [
      { month: 'Jan', projects: 10 },
      { month: 'Fév', projects: 8 },
      { month: 'Mar', projects: 15 },
      { month: 'Avr', projects: 13 },
      { month: 'Mai', projects: 14 },
      { month: 'Jun', projects: 12 },
    ];

    return (
      <>
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Clients</p>
                <p className="text-2xl font-semibold text-gray-900">{kpis.totalClients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <Folder className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Projets Actifs</p>
                <p className="text-2xl font-semibold text-gray-900">{kpis.activeProjects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                  <FileText className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">CA Total</p>
                <p className="text-2xl font-semibold text-gray-900">{kpis.totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Tickets Ouverts</p>
                <p className="text-2xl font-semibold text-gray-900">{kpis.openTickets}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Graphique CA */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Évolution du CA</h3>
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

          {/* Graphique Projets */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Projets par mois</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData}>
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
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'users':
        return <UserManagement userRole="master" />;
      case 'settings':
        return <HealthCheck />;
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
          <p className="text-gray-600 mt-1">Vue d'overview de votre activité MasterCom.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'users', label: 'Utilisateurs', icon: UserPlus },
              { id: 'settings', label: 'Santé du système', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-50">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
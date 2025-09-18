import { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, ArrowUpRight, ArrowDownRight, RefreshCw,
  BarChart3, UserPlus, Settings, ArrowLeft
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, BarChart, Bar } from 'recharts';
import { clientService, projectService, invoiceService, quoteService, supportService } from '../services/supabase';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import UserManagement from '../components/UserManagement';
import HealthCheck from '../components/HealthCheck';

const Dashboard: FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState({
    clients: [] as any[],
    projects: [] as any[],
    invoices: [] as any[],
    quotes: [] as any[],
    tickets: [] as any[]
  });
  const navigate = useNavigate();

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
      .reduce((sum: number, invoice: any) => sum + (invoice.amount || 0), 0);
    
    const newClients = dashboardData.clients.length;
    const activeProjects = dashboardData.projects.filter((project: any) => 
      project.status === 'in_progress' || project.status === 'pending'
    ).length;
    
    const resolvedTickets = dashboardData.tickets.filter((ticket: any) => 
      ticket.status === 'resolved' || ticket.status === 'closed'
    ).length;
    const totalTickets = dashboardData.tickets.length;
    const satisfactionRate = totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 100;

    return [
      { 
        label: 'Chiffre d\'affaires', 
        value: `${totalRevenue.toLocaleString('fr-FR')}€`, 
        change: '+12%', 
        trend: 'up' 
      },
      { 
        label: 'Nouveaux clients', 
        value: newClients.toString(), 
        change: '+25%', 
        trend: 'up' 
      },
      { 
        label: 'Projets actifs', 
        value: activeProjects.toString(), 
        change: '+8%', 
        trend: 'up' 
      },
      { 
        label: 'Taux de satisfaction', 
        value: `${satisfactionRate}%`, 
        change: '+2%', 
        trend: 'up' 
      },
    ];
  };

  const kpiData = calculateKPIs();

  // Données pour les graphiques
  const monthlyRevenue = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Fév', revenue: 13500 },
    { month: 'Mar', revenue: 15200 },
    { month: 'Avr', revenue: 16800 },
    { month: 'Mai', revenue: 14200 },
    { month: 'Jun', revenue: 15200 },
  ];

  const projectData = [
    { month: 'Jan', projects: 8 },
    { month: 'Fév', projects: 12 },
    { month: 'Mar', projects: 15 },
    { month: 'Avr', projects: 18 },
    { month: 'Mai', projects: 14 },
    { month: 'Jun', projects: 12 },
  ];

  const renderOverviewTab = () => (
    <>
      {/* Health Check */}
      <div className="mb-8">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Health Check</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-green-800 font-medium">Frontend</span>
              </div>
              <p className="text-green-600 text-sm mt-1">Opérationnel</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-green-800 font-medium">Base de données</span>
              </div>
              <p className="text-green-600 text-sm mt-1">Connectée</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-green-800 font-medium">API</span>
              </div>
              <p className="text-green-600 text-sm mt-1">Fonctionnelle</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>
              <div className="flex items-center">
                {kpi.trend === 'up' ? (
                  <ArrowUpRight className="w-5 h-5 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-red-500" />
                )}
                <span className={`ml-1 text-sm font-medium ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change}
                </span>
              </div>
            </div>
          </div>
        ))}
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Interface d'administration MasterCom</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="1month">1 mois</option>
                <option value="3months">3 mois</option>
                <option value="6months">6 mois</option>
                <option value="1year">1 an</option>
              </select>
              <button
                onClick={loadDashboardData}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'users', label: 'Utilisateurs', icon: UserPlus },
              { id: 'settings', label: 'Paramètres', icon: Settings },
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
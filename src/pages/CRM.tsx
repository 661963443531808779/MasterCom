import { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, FileText, Folder,
  Plus, Download, MessageSquare,
  BarChart3, Quote, LayoutDashboard
} from 'lucide-react';
// import AnalyticsDashboard from '../components/AnalyticsDashboard';
// import ClientCRUD from '../components/ClientCRUD';
// import InvoiceCRUD from '../components/InvoiceCRUD';
// import QuoteCRUD from '../components/QuoteCRUD';
// import SupportTicketCRUD from '../components/SupportTicketCRUD';
// import ProjectManager from '../components/ProjectManager';

interface CRMProps {
  userRole: string;
}

const CRM: FC<CRMProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('clients');
  const navigate = useNavigate();

  const tabs = [
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'projects', label: 'Projets', icon: Folder },
    { id: 'invoices', label: 'Factures', icon: FileText },
    { id: 'quotes', label: 'Devis', icon: Quote },
    { id: 'tickets', label: 'Support', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const renderProjectsTab = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Gestion des Projets</h3>
      <p className="text-gray-600">Interface de gestion des projets en cours de développement...</p>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">CRM MasterCom</h1>
                <p className="text-gray-600">Gérez vos clients, projets et factures</p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                {userRole === 'master' && (
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </button>
                )}
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-50">
          {activeTab === 'clients' && <div className="p-6 bg-white rounded-lg shadow"><h3 className="text-lg font-semibold mb-4">Gestion des Clients</h3><p className="text-gray-600">Interface de gestion des clients en cours de développement...</p></div>}
          {activeTab === 'projects' && renderProjectsTab()}
          {activeTab === 'invoices' && <div className="p-6 bg-white rounded-lg shadow"><h3 className="text-lg font-semibold mb-4">Gestion des Factures</h3><p className="text-gray-600">Interface de gestion des factures en cours de développement...</p></div>}
          {activeTab === 'quotes' && <div className="p-6 bg-white rounded-lg shadow"><h3 className="text-lg font-semibold mb-4">Gestion des Devis</h3><p className="text-gray-600">Interface de gestion des devis en cours de développement...</p></div>}
          {activeTab === 'tickets' && <div className="p-6 bg-white rounded-lg shadow"><h3 className="text-lg font-semibold mb-4">Support Client</h3><p className="text-gray-600">Interface de support client en cours de développement...</p></div>}
          {activeTab === 'analytics' && userRole === 'master' && <div className="p-6 bg-white rounded-lg shadow"><h3 className="text-lg font-semibold mb-4">Analytics</h3><p className="text-gray-600">Interface d'analytics en cours de développement...</p></div>}
        </div>
      </div>
    </div>
  );
};

export default CRM;
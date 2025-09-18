import { useState, FC } from 'react';
import { 
  Users, FileText, Folder,
  Plus, Download, MessageSquare,
  BarChart3, Quote
} from 'lucide-react';
import ClientCRUD from '../components/ClientCRUD';
import InvoiceCRUD from '../components/InvoiceCRUD';
import QuoteCRUD from '../components/QuoteCRUD';
import SupportTicketCRUD from '../components/SupportTicketCRUD';
import ProjectManager from '../components/ProjectManager';

interface CRMProps {
  userRole: string;
}

const CRM: FC<CRMProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('clients');

  const renderClientsTab = () => (
    <ClientCRUD />
  );

  const renderInvoicesTab = () => (
    <InvoiceCRUD />
  );

  const renderQuotesTab = () => (
    <QuoteCRUD />
  );

  const renderTicketsTab = () => (
    <SupportTicketCRUD />
  );

  const renderProjectsTab = () => (
    <ProjectManager />
  );

  const tabs = [
    { id: 'clients', label: 'Clients', icon: Users, component: renderClientsTab },
    { id: 'invoices', label: 'Factures', icon: FileText, component: renderInvoicesTab },
    { id: 'quotes', label: 'Devis', icon: Quote, component: renderQuotesTab },
    { id: 'tickets', label: 'Support', icon: MessageSquare, component: renderTicketsTab },
    { id: 'projects', label: 'Projets', icon: Folder, component: renderProjectsTab }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">CRM MasterCom</h1>
          <p className="mt-2 text-gray-600">
            Gestion complète de la relation client et des projets
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
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
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-0">
            {tabs.find(tab => tab.id === activeTab)?.component()}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-500">Vue d'ensemble des performances</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Download className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Exports</h3>
                <p className="text-sm text-gray-500">Exporter les données</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Plus className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Actions rapides</h3>
                <p className="text-sm text-gray-500">Créer rapidement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRM;

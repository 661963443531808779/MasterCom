import { useState, FC } from 'react';
import { 
  Users, FileText, Folder,
  Plus, Download, MessageSquare,
  BarChart3, Quote, Settings,
  Search, Filter, Eye, Edit, Trash2,
  Calendar, Phone, Mail, MapPin,
  TrendingUp, DollarSign, Clock
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const renderClientsTab = () => (
    <div className="p-6">
      <ClientCRUD />
    </div>
  );

  const renderInvoicesTab = () => (
    <div className="p-6">
      <InvoiceCRUD />
    </div>
  );

  const renderQuotesTab = () => (
    <div className="p-6">
      <QuoteCRUD />
    </div>
  );

  const renderTicketsTab = () => (
    <div className="p-6">
      <SupportTicketCRUD />
    </div>
  );

  const renderProjectsTab = () => (
    <div className="p-6">
      <ProjectManager />
    </div>
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
        {/* Header avec statistiques */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CRM MasterCom</h1>
              <p className="mt-2 text-gray-600">
                Gestion complète de la relation client et des projets
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau
              </button>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Clients actifs</p>
                  <p className="text-2xl font-semibold text-gray-900">1,234</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">CA ce mois</p>
                  <p className="text-2xl font-semibold text-gray-900">€45,678</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Factures en attente</p>
                  <p className="text-2xl font-semibold text-gray-900">23</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Croissance</p>
                  <p className="text-2xl font-semibold text-gray-900">+12.5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher clients, factures, projets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="pending">En attente</option>
                <option value="inactive">Inactif</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </button>
            </div>
          </div>
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

        {/* Actions rapides en bas */}
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
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Planning</h3>
                <p className="text-sm text-gray-500">Gestion des rendez-vous</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Settings className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Configuration</h3>
                <p className="text-sm text-gray-500">Paramètres du CRM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRM;
import { useState, FC } from 'react';
import { 
  Users, FileText, Folder,
  Plus, Download,
  Quote,
  Search, Filter,
  AlertCircle
} from 'lucide-react';
import ClientCRUD from '../components/ClientCRUD';
import InvoiceCRUD from '../components/InvoiceCRUD';
import QuoteCRUD from '../components/QuoteCRUD';
import ProjectManager from '../components/ProjectManager';

interface CRMProps {
  userRole?: string;
}

const CRM: FC<CRMProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('clients');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const tabs = [
    { id: 'clients', label: 'Clients', icon: <Users className="h-4 w-4" /> },
    { id: 'invoices', label: 'Factures', icon: <FileText className="h-4 w-4" /> },
    { id: 'quotes', label: 'Devis', icon: <Quote className="h-4 w-4" /> },
    { id: 'projects', label: 'Projets', icon: <Folder className="h-4 w-4" /> }
  ];

  const renderTabContent = () => {
    try {
      switch (activeTab) {
        case 'clients':
          return <ClientCRUD />;
        case 'invoices':
          return <InvoiceCRUD />;
        case 'quotes':
          return <QuoteCRUD />;
        case 'projects':
          return <ProjectManager userRole={userRole || 'commercial'} />;
        default:
          return <ClientCRUD />;
      }
    } catch (error) {
      console.error('Erreur dans renderTabContent:', error);
      return (
        <div className="p-8 text-center">
          <div className="text-red-500 mb-4">
            <AlertCircle className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Erreur de chargement</h2>
          <p className="text-gray-600">Une erreur s'est produite lors du chargement du module {activeTab}.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CRM MasterCom</h1>
              <p className="text-gray-600 mt-1">Gestion de la relation client</p>
            </div>
            
            {/* Actions rapides */}
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Nouveau</span>
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Exporter</span>
              </button>
            </div>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex flex-col sm:flex-row gap-4 pb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="pending">En attente</option>
              </select>
              
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filtres</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation des onglets */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

export default CRM;
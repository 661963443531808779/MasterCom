import { useState, FC } from 'react';
import { 
  Users, FileText, Folder,
  Plus, Download, MessageSquare,
  BarChart3, Quote
} from 'lucide-react';

interface CRMProps {
  userRole: string;
}

const CRM: FC<CRMProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('clients');

  const renderClientsTab = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Gestion des Clients</h3>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Client
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Téléphone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Entreprise Alpha
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                contact@alpha.com
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                01 23 45 67 89
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Actif
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Modifier</button>
                <button className="text-red-600 hover:text-red-900">Supprimer</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Entreprise Beta
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                contact@beta.com
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                01 98 76 54 32
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  En attente
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Modifier</button>
                <button className="text-red-600 hover:text-red-900">Supprimer</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Entreprise Gamma
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                contact@gamma.com
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                01 55 44 33 22
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Actif
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Modifier</button>
                <button className="text-red-600 hover:text-red-900">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProjectsTab = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Gestion des Projets</h3>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Projet
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900">Projet Alpha</h4>
          <p className="text-sm text-gray-600 mt-1">Site web e-commerce</p>
          <div className="mt-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progression</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900">Projet Beta</h4>
          <p className="text-sm text-gray-600 mt-1">Application mobile</p>
          <div className="mt-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progression</span>
              <span>45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900">Projet Gamma</h4>
          <p className="text-sm text-gray-600 mt-1">API REST</p>
          <div className="mt-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progression</span>
              <span>90%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvoicesTab = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Gestion des Factures</h3>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Facture
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900">FAC-2024-001</h4>
          <p className="text-sm text-gray-600 mt-1">Entreprise Alpha</p>
          <p className="text-lg font-semibold text-green-600 mt-2">2,500€</p>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Payée
          </span>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900">FAC-2024-002</h4>
          <p className="text-sm text-gray-600 mt-1">Entreprise Beta</p>
          <p className="text-lg font-semibold text-orange-600 mt-2">1,800€</p>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
            En attente
          </span>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900">FAC-2024-003</h4>
          <p className="text-sm text-gray-600 mt-1">Entreprise Gamma</p>
          <p className="text-lg font-semibold text-red-600 mt-2">3,200€</p>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            En retard
          </span>
        </div>
      </div>
    </div>
  );

  const renderQuotesTab = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Gestion des Devis</h3>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Devis
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900">DEV-2024-001</h4>
          <p className="text-sm text-gray-600 mt-1">Site web vitrine</p>
          <p className="text-lg font-semibold text-blue-600 mt-2">1,500€</p>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            En cours
          </span>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900">DEV-2024-002</h4>
          <p className="text-sm text-gray-600 mt-1">Application mobile</p>
          <p className="text-lg font-semibold text-green-600 mt-2">4,500€</p>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Accepté
          </span>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium text-gray-900">DEV-2024-003</h4>
          <p className="text-sm text-gray-600 mt-1">E-commerce</p>
          <p className="text-lg font-semibold text-gray-600 mt-2">2,800€</p>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
            Expiré
          </span>
        </div>
      </div>
    </div>
  );

  const renderTicketsTab = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Support Client</h3>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Ticket
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">Problème de connexion</h4>
              <p className="text-sm text-gray-600 mt-1">Entreprise Alpha - Ticket #001</p>
              <p className="text-sm text-gray-500 mt-2">Le client ne peut pas se connecter à son compte...</p>
            </div>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
              Urgent
            </span>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">Demande de fonctionnalité</h4>
              <p className="text-sm text-gray-600 mt-1">Entreprise Beta - Ticket #002</p>
              <p className="text-sm text-gray-500 mt-2">Le client souhaite ajouter une nouvelle fonctionnalité...</p>
            </div>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
              Normal
            </span>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">Question technique</h4>
              <p className="text-sm text-gray-600 mt-1">Entreprise Gamma - Ticket #003</p>
              <p className="text-sm text-gray-500 mt-2">Le client a une question sur l'API...</p>
            </div>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Résolu
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900">Clients actifs</h4>
          <p className="text-2xl font-bold text-blue-600 mt-2">12</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-medium text-green-900">Projets en cours</h4>
          <p className="text-2xl font-bold text-green-600 mt-2">8</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <h4 className="font-medium text-purple-900">CA mensuel</h4>
          <p className="text-2xl font-bold text-purple-600 mt-2">15,200€</p>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg">
          <h4 className="font-medium text-orange-900">Tickets ouverts</h4>
          <p className="text-2xl font-bold text-orange-600 mt-2">3</p>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'clients':
        return renderClientsTab();
      case 'projects':
        return renderProjectsTab();
      case 'invoices':
        return renderInvoicesTab();
      case 'quotes':
        return renderQuotesTab();
      case 'tickets':
        return renderTicketsTab();
      case 'analytics':
        return renderAnalyticsTab();
      default:
        return renderClientsTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">CRM MasterCom</h1>
          <p className="text-gray-600 mt-2">Gestion de la relation client et des projets</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'clients', label: 'Clients', icon: Users },
              { id: 'projects', label: 'Projets', icon: Folder },
              { id: 'invoices', label: 'Factures', icon: FileText },
              { id: 'quotes', label: 'Devis', icon: Quote },
              { id: 'tickets', label: 'Support', icon: MessageSquare },
              ...(userRole === 'master' ? [{ id: 'analytics', label: 'Analytics', icon: BarChart3 }] : []),
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

export default CRM;
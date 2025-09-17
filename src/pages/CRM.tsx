import { useState, useEffect, FC } from 'react';
import { 
  Users, FileText, Folder,
  Plus, Download, MessageSquare,
  BarChart3, Quote
} from 'lucide-react';
import { clientService, projectService, invoiceService, quoteService, supportService } from '../services/supabase';

interface CRMProps {
  userRole: string;
}

const CRM: FC<CRMProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('clients');
  const [clients, setClients] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [clientsData, projectsData, invoicesData, quotesData, ticketsData] = await Promise.all([
        clientService.getClients(),
        projectService.getProjects(),
        invoiceService.getInvoices(),
        quoteService.getQuotes(),
        supportService.getTickets()
      ]);
      
      setClients(clientsData || []);
      setProjects(projectsData || []);
      setInvoices(invoicesData || []);
      setQuotes(quotesData || []);
      setTickets(ticketsData || []);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderClientsTab = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Gestion des Clients</h3>
        <button 
          onClick={loadData}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Client
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="loading-spinner"></div>
          <span className="ml-2 text-gray-600">Chargement des clients...</span>
        </div>
      ) : (
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
                  Entreprise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Aucun client trouvé
                  </td>
                </tr>
              ) : (
                clients.map((client: any) => (
                  <tr key={client.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {client.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.email || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.company || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Modifier</button>
                      <button className="text-red-600 hover:text-red-900">Supprimer</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderProjectsTab = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Gestion des Projets</h3>
        <button 
          onClick={loadData}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Projet
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="loading-spinner"></div>
          <span className="ml-2 text-gray-600">Chargement des projets...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Aucun projet trouvé
            </div>
          ) : (
            projects.map((project: any) => {
              const progress = Math.floor(Math.random() * 100); // Simulation de progression
              const getStatusColor = (status: string) => {
                switch (status) {
                  case 'completed': return 'bg-green-600';
                  case 'in_progress': return 'bg-blue-600';
                  case 'pending': return 'bg-yellow-600';
                  default: return 'bg-gray-600';
                }
              };
              
              return (
                <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">{project.name || 'Projet sans nom'}</h4>
                  <p className="text-sm text-gray-600 mt-1">{project.description || 'Aucune description'}</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progression</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${getStatusColor(project.status || 'pending')}`} 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Budget: {project.budget ? `${project.budget}€` : 'Non défini'}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );

  const renderInvoicesTab = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Gestion des Factures</h3>
        <div className="flex space-x-2">
          <button 
            onClick={loadData}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button 
            onClick={loadData}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Facture
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="loading-spinner"></div>
          <span className="ml-2 text-gray-600">Chargement des factures...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {invoices.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Aucune facture trouvée
            </div>
          ) : (
            invoices.map((invoice: any) => {
              const getStatusInfo = (status: string) => {
                switch (status) {
                  case 'paid':
                    return { color: 'text-green-600', bg: 'bg-green-100', text: 'bg-green-800', label: 'Payée' };
                  case 'pending':
                    return { color: 'text-orange-600', bg: 'bg-yellow-100', text: 'bg-yellow-800', label: 'En attente' };
                  case 'overdue':
                    return { color: 'text-red-600', bg: 'bg-red-100', text: 'bg-red-800', label: 'En retard' };
                  default:
                    return { color: 'text-gray-600', bg: 'bg-gray-100', text: 'bg-gray-800', label: 'Inconnu' };
                }
              };
              
              const statusInfo = getStatusInfo(invoice.status || 'pending');
              
              return (
                <div key={invoice.id} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">
                    {invoice.invoice_number || `FAC-${invoice.id}`}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {invoice.client_name || 'Client inconnu'}
                  </p>
                  <p className={`text-lg font-semibold mt-2 ${statusInfo.color}`}>
                    {invoice.amount ? `${invoice.amount}€` : 'Montant non défini'}
                  </p>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.bg} ${statusInfo.text}`}>
                    {statusInfo.label}
                  </span>
                  {invoice.due_date && (
                    <div className="mt-2 text-xs text-gray-500">
                      Échéance: {new Date(invoice.due_date).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );

  const renderQuotesTab = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Gestion des Devis</h3>
        <button 
          onClick={loadData}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Devis
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="loading-spinner"></div>
          <span className="ml-2 text-gray-600">Chargement des devis...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quotes.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Aucun devis trouvé
            </div>
          ) : (
            quotes.map((quote: any) => {
              const getStatusInfo = (status: string) => {
                switch (status) {
                  case 'accepted':
                    return { color: 'text-green-600', bg: 'bg-green-100', text: 'bg-green-800', label: 'Accepté' };
                  case 'pending':
                    return { color: 'text-blue-600', bg: 'bg-blue-100', text: 'bg-blue-800', label: 'En cours' };
                  case 'expired':
                    return { color: 'text-gray-600', bg: 'bg-gray-100', text: 'bg-gray-800', label: 'Expiré' };
                  case 'rejected':
                    return { color: 'text-red-600', bg: 'bg-red-100', text: 'bg-red-800', label: 'Refusé' };
                  default:
                    return { color: 'text-blue-600', bg: 'bg-blue-100', text: 'bg-blue-800', label: 'En cours' };
                }
              };
              
              const statusInfo = getStatusInfo(quote.status || 'pending');
              
              return (
                <div key={quote.id} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">
                    {quote.quote_number || `DEV-${quote.id}`}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {quote.project_description || 'Description non disponible'}
                  </p>
                  <p className={`text-lg font-semibold mt-2 ${statusInfo.color}`}>
                    {quote.amount ? `${quote.amount}€` : 'Montant non défini'}
                  </p>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.bg} ${statusInfo.text}`}>
                    {statusInfo.label}
                  </span>
                  {quote.valid_until && (
                    <div className="mt-2 text-xs text-gray-500">
                      Valide jusqu'au: {new Date(quote.valid_until).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );

  const renderTicketsTab = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Support Client</h3>
        <button 
          onClick={loadData}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouveau Ticket
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="loading-spinner"></div>
          <span className="ml-2 text-gray-600">Chargement des tickets...</span>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucun ticket trouvé
            </div>
          ) : (
            tickets.map((ticket: any) => {
              const getPriorityInfo = (priority: string) => {
                switch (priority) {
                  case 'urgent':
                    return { bg: 'bg-red-100', text: 'text-red-800', label: 'Urgent' };
                  case 'high':
                    return { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Élevé' };
                  case 'normal':
                    return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Normal' };
                  case 'low':
                    return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Faible' };
                  default:
                    return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Normal' };
                }
              };
              
              const priorityInfo = getPriorityInfo(ticket.priority || 'normal');
              
              return (
                <div key={ticket.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {ticket.subject || 'Sujet non défini'}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {ticket.client_name || 'Client inconnu'} - Ticket #{ticket.id}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {ticket.description || ticket.message || 'Aucune description disponible'}
                      </p>
                      {ticket.created_at && (
                        <p className="text-xs text-gray-400 mt-2">
                          Créé le: {new Date(ticket.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityInfo.bg} ${priorityInfo.text}`}>
                      {priorityInfo.label}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );

  const renderAnalyticsTab = () => {
    // Calculer les statistiques à partir des vraies données
    const activeClients = clients.length;
    const activeProjects = projects.filter((p: any) => p.status === 'in_progress' || p.status === 'pending').length;
    const totalRevenue = invoices
      .filter((i: any) => i.status === 'paid')
      .reduce((sum: number, invoice: any) => sum + (invoice.amount || 0), 0);
    const openTickets = tickets.filter((t: any) => t.status !== 'resolved' && t.status !== 'closed').length;
    
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Analytics</h3>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="loading-spinner"></div>
            <span className="ml-2 text-gray-600">Chargement des analytics...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Clients actifs</h4>
              <p className="text-2xl font-bold text-blue-600 mt-2">{activeClients}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900">Projets en cours</h4>
              <p className="text-2xl font-bold text-green-600 mt-2">{activeProjects}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900">CA total</h4>
              <p className="text-2xl font-bold text-purple-600 mt-2">{totalRevenue.toLocaleString('fr-FR')}€</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900">Tickets ouverts</h4>
              <p className="text-2xl font-bold text-orange-600 mt-2">{openTickets}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

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
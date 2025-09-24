// Panel d'administration MasterCom - Version Simplifiée
import { useState, useEffect, FC } from 'react';
import { 
  Shield, Users, Database, Activity, 
  BarChart3, Download, RefreshCw,
  UserPlus, AlertTriangle, Sparkles
} from 'lucide-react';
import DeletionValidation from './DeletionValidation';
import CreateUserModal from './CreateUserModal';
import ThemeManager from './ThemeManager';
import { dataService } from '../services/auth';

// Types pour la gestion des utilisateurs
interface User {
  id: string;
  email: string;
  created_at: string;
  email_confirmed_at: string | null;
  last_sign_in_at: string | null;
}

interface Stats {
  totalUsers: number;
  totalClients: number;
  totalInvoices: number;
  totalQuotes: number;
  totalTickets: number;
  activeUsers: number;
  pendingTickets: number;
  completedProjects: number;
}

interface MasterPanelProps {
  userRole: string;
  onLogout?: () => void;
}

const MasterPanel: FC<MasterPanelProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalClients: 0,
    totalInvoices: 0,
    totalQuotes: 0,
    totalTickets: 0,
    activeUsers: 0,
    pendingTickets: 0,
    completedProjects: 0
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  useEffect(() => {
    loadStats();
    loadUsers();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Charger les données réelles depuis Supabase
      const [clients, projects, invoices, quotes, deletionRequests, users] = await Promise.all([
        dataService.getTableData('clients'),
        dataService.getTableData('projects'),
        dataService.getTableData('invoices'),
        dataService.getTableData('quotes'),
        dataService.getTableData('deletion_requests').catch(() => []), // Table optionnelle
        dataService.getTableData('users').catch(() => []) // Table optionnelle
      ]);

      // Calculer les statistiques
      const totalClients = clients.length;
      const totalInvoices = invoices.length;
      const totalQuotes = quotes.length;
      const completedProjects = projects.filter((p: any) => p.status === 'completed').length;
      const pendingDeletions = deletionRequests.filter((d: any) => d.status === 'pending').length;
      const totalUsers = users.length || 1; // Fallback sur 1 si pas de table users
      const activeUsers = users.filter((u: any) => u.status === 'active').length || 1;

      setStats({
        totalUsers,
        totalClients,
        totalInvoices,
        totalQuotes,
        totalTickets: pendingDeletions, // Utiliser les demandes de suppression comme "tickets"
        activeUsers,
        pendingTickets: pendingDeletions,
        completedProjects
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      // Charger les utilisateurs depuis la base de données
      const usersData = await dataService.getTableData('users');
      
      // Transformer les données pour correspondre à l'interface User
      const transformedUsers = usersData.map((user: any) => ({
        id: user.id,
        email: user.email,
        created_at: user.created_at,
        email_confirmed_at: user.created_at, // Utiliser created_at comme fallback
        last_sign_in_at: user.updated_at // Utiliser updated_at comme fallback
      }));
      
      setUsers(transformedUsers);
    } catch (err: any) {
      // Si la table users n'existe pas encore, utiliser l'utilisateur master par défaut
      setUsers([
        {
          id: 'aa72e089-7ae9-4fe6-bae1-04cce09df80c',
          email: 'master@mastercom.com',
          created_at: new Date().toISOString(),
          email_confirmed_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString()
        }
      ]);
    }
  };

  const handleCreateUser = () => {
    setShowCreateUserModal(true);
  };

  const handleUserCreated = () => {
    // Recharger la liste des utilisateurs après création
    loadUsers();
  };

  const handleToggleStatus = async () => {
    // Fonction mock
    alert('Fonction de modification de statut non implémentée');
  };

  const handleDeleteUser = async () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      // Fonction mock
      alert('Fonction de suppression non implémentée');
    }
  };

  const handleExportData = () => {
    // Fonction mock
    alert('Fonction d\'export non implémentée');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Master Panel</h1>
                <p className="text-sm text-gray-500">Administration du système</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Tableau de bord</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('deletion-validation')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'deletion-validation'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Vérification de suppression</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('themes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'themes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Thèmes Saisonniers</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Erreur:</strong> {error}
          </div>
        )}

        {activeTab === 'dashboard' && (
          <>
            {/* Statistiques */}
            {loading ? (
              <div className="flex items-center justify-center p-8 mb-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">Chargement des statistiques...</span>
              </div>
            ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Utilisateurs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Clients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Factures</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalInvoices}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTickets}</p>
              </div>
            </div>
          </div>
        </div>
            )}

        {/* Actions rapides */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleCreateUser}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>Créer Utilisateur</span>
            </button>
            <button
              onClick={handleExportData}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Exporter Données</span>
            </button>
            <button
              onClick={loadStats}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Actualiser</span>
            </button>
          </div>
        </div>

        {/* Liste des utilisateurs */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Utilisateurs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dernière connexion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.email_confirmed_at 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.email_confirmed_at ? 'Actif' : 'En attente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.last_sign_in_at 
                        ? new Date(user.last_sign_in_at).toLocaleDateString()
                        : 'Jamais'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleToggleStatus()}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteUser()}
                        className="text-red-600 hover:text-red-900"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}

        {activeTab === 'deletion-validation' && (
          <DeletionValidation userRole={userRole} />
        )}

        {activeTab === 'themes' && (
          <ThemeManager />
        )}
      </div>

      {/* Modal de création d'utilisateur */}
      <CreateUserModal
        isOpen={showCreateUserModal}
        onClose={() => setShowCreateUserModal(false)}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};

export default MasterPanel;
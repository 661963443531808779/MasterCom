// Panel d'administration MasterCom - Version Professionnelle
import { useState, useEffect, FC } from 'react';
import { 
  Shield, Users, Database, Activity, 
  BarChart3, Download, RefreshCw,
  UserPlus, AlertTriangle, Sparkles,
  TrendingUp, Globe, Settings, Bell,
  ChevronRight, Star, Zap, Target,
  Briefcase, FileText, CreditCard, Calendar,
  Eye, Edit, Trash2, MoreVertical
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
          email: 'master@master.com',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Professionnel */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Master Panel
                </h1>
                <p className="text-sm text-gray-600 font-medium">Centre de contrôle MasterCom</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-700">Système actif</span>
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Professionnelle */}
      <div className="bg-white/60 backdrop-blur-sm shadow-lg border-b border-gray-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`group relative py-4 px-6 font-semibold text-sm transition-all duration-300 rounded-t-xl ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <BarChart3 className={`h-5 w-5 ${activeTab === 'dashboard' ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`} />
                <span>Tableau de bord</span>
                {activeTab === 'dashboard' && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
                )}
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('deletion-validation')}
              className={`group relative py-4 px-6 font-semibold text-sm transition-all duration-300 rounded-t-xl ${
                activeTab === 'deletion-validation'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <AlertTriangle className={`h-5 w-5 ${activeTab === 'deletion-validation' ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`} />
                <span>Vérification</span>
                {activeTab === 'deletion-validation' && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
                )}
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('themes')}
              className={`group relative py-4 px-6 font-semibold text-sm transition-all duration-300 rounded-t-xl ${
                activeTab === 'themes'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Sparkles className={`h-5 w-5 ${activeTab === 'themes' ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`} />
                <span>Thèmes</span>
                {activeTab === 'themes' && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
                )}
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
            {/* Statistiques Professionnelles */}
            {loading ? (
              <div className="flex items-center justify-center p-12 mb-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
                  <span className="text-gray-600 font-medium">Chargement des statistiques...</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {/* Carte Utilisateurs */}
                <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-black text-gray-900 mb-1">0</div>
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Utilisateurs</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 font-medium">Aucun utilisateur enregistré</span>
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Carte Clients */}
                <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Database className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-black text-gray-900 mb-1">0</div>
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Clients</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 font-medium">Aucun client enregistré</span>
                      <Target className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Carte Factures */}
                <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <FileText className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-black text-gray-900 mb-1">0</div>
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Factures</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 font-medium">Aucune facture émise</span>
                      <CreditCard className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Carte Projets */}
                <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-black text-gray-900 mb-1">0</div>
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Projets</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 font-medium">Aucun projet en cours</span>
                      <Zap className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions Rapides Professionnelles */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl mb-12 border border-gray-200/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Actions Rapides</h2>
                  <p className="text-gray-600">Gérez votre système en quelques clics</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={handleCreateUser}
                  className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <UserPlus className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">Créer Utilisateur</div>
                      <div className="text-blue-100 text-sm">Ajouter un nouvel utilisateur</div>
                    </div>
                    <ChevronRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button
                  onClick={handleExportData}
                  className="group relative bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl text-white hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Download className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">Exporter Données</div>
                      <div className="text-green-100 text-sm">Télécharger les données</div>
                    </div>
                    <ChevronRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button
                  onClick={loadStats}
                  className="group relative bg-gradient-to-r from-gray-600 to-slate-600 p-6 rounded-2xl text-white hover:from-gray-700 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <RefreshCw className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">Actualiser</div>
                      <div className="text-gray-100 text-sm">Mettre à jour les données</div>
                    </div>
                    <ChevronRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            {/* Liste des Utilisateurs Professionnelle */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">Gestion des Utilisateurs</h2>
                      <p className="text-gray-600 font-medium">Administrez les accès et permissions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-blue-600">0</div>
                    <div className="text-sm text-gray-500 font-semibold">Utilisateurs actifs</div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <tr>
                      <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4" />
                          <span>Email</span>
                        </div>
                      </th>
                      <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4" />
                          <span>Statut</span>
                        </div>
                      </th>
                      <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Dernière connexion</span>
                        </div>
                      </th>
                      <th className="px-8 py-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Settings className="h-4 w-4" />
                          <span>Actions</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-8 py-16 text-center">
                          <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                              <Users className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun utilisateur enregistré</h3>
                              <p className="text-gray-600 mb-4">Commencez par créer votre premier utilisateur</p>
                              <button
                                onClick={handleCreateUser}
                                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                              >
                                <UserPlus className="h-5 w-5" />
                                <span>Créer le premier utilisateur</span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                                {user.email.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900">{user.email}</div>
                                <div className="text-xs text-gray-500">ID: {user.id.slice(0, 8)}...</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                              user.email_confirmed_at 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }`}>
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                user.email_confirmed_at ? 'bg-green-500' : 'bg-yellow-500'
                              }`}></div>
                              {user.email_confirmed_at ? 'Actif' : 'En attente'}
                            </span>
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-600">
                            {user.last_sign_in_at 
                              ? new Date(user.last_sign_in_at).toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : 'Jamais connecté'
                            }
                          </td>
                          <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleToggleStatus()}
                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Modifier"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser()}
                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <button
                                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                                title="Plus d'options"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
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
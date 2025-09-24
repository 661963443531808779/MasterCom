import { useState, useMemo, FC } from 'react';
import { 
  FolderOpen, Plus, Search, Edit, Trash2, Eye, 
  Calendar, Clock, Users, Target, CheckCircle, AlertCircle, 
  Play, BarChart3, ChevronDown, ChevronUp
} from 'lucide-react';
import { dataService } from '../services/auth';
import { useApiData } from '../hooks/useApiData';

// Utility functions for project validation and sanitization
const validateProjectData = (data: any) => {
  const errors: string[] = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Le nom du projet doit contenir au moins 2 caractères');
  }
  
  if (!data.description || data.description.trim().length < 10) {
    errors.push('La description doit contenir au moins 10 caractères');
  }
  
  if (!data.client_id) {
    errors.push('Un client doit être sélectionné');
  }
  
  if (!data.start_date) {
    errors.push('Une date de début est requise');
  }
  
  if (!data.end_date) {
    errors.push('Une date de fin est requise');
  }
  
  if (data.start_date && data.end_date && new Date(data.start_date) >= new Date(data.end_date)) {
    errors.push('La date de fin doit être postérieure à la date de début');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const sanitizeProjectData = (data: any) => {
  return {
    name: data.name?.trim() || '',
    description: data.description?.trim() || '',
    client_id: data.client_id || '',
    status: data.status || 'planning',
    priority: data.priority || 'medium',
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    budget: parseFloat(data.budget) || 0,
    commercial_id: data.commercial_id || null
  };
};

interface Project {
  id: string;
  name: string;
  description: string;
  client_id: string;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  start_date: string;
  end_date: string;
  budget: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  commercial_id?: string;
  progress: number;
  created_at: string;
  updated_at: string;
  client_name?: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

interface ProjectManagerProps {
  userRole: string;
}

const ProjectManager: FC<ProjectManagerProps> = ({ userRole }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  // Use API hooks for data management
  const {
    data: projects,
    loading
  } = useApiData<Project>({ endpoint: 'projects' });

  const {
    data: clients
  } = useApiData<Client>({ endpoint: 'clients' });

  // Simple notification system
  const showNotification = (type: string, title: string, message: string) => {
    console.log(`${type.toUpperCase()}: ${title} - ${message}`);
    // TODO: Implement proper notification system
  };
  
  // Gestion d'erreur simplifiée
  const handleError = (error: any) => {
    console.error('Erreur:', error);
  };

  // Form states
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    client_id: string;
    commercial_id: string;
    status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    start_date: string;
    end_date: string;
    budget: string;
    progress: number;
  }>({
    name: '',
    description: '',
    client_id: '',
    commercial_id: '',
    status: 'planning',
    priority: 'medium',
    start_date: '',
    end_date: '',
    budget: '',
    progress: 0
  });

  const statusOptions = [
    { value: 'planning', label: 'Planification', color: 'bg-gray-100 text-gray-800' },
    { value: 'in_progress', label: 'En cours', color: 'bg-blue-100 text-blue-800' },
    { value: 'on_hold', label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Terminé', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Annulé', color: 'bg-red-100 text-red-800' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Faible', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Moyenne', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'Élevée', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgente', color: 'bg-red-100 text-red-800' }
  ];

  // Load data

  // Filtered and sorted projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });

    return filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Project];
      let bValue: any = b[sortBy as keyof Project];

      if (sortBy === 'created_at' || sortBy === 'start_date' || sortBy === 'end_date') {
        aValue = new Date(aValue || 0);
        bValue = new Date(bValue || 0);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [projects, searchTerm, statusFilter, priorityFilter, sortBy, sortOrder]);

  // Statistics
  const stats = useMemo(() => {
    const total = projects.length;
    const inProgress = projects.filter(p => p.status === 'in_progress').length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const totalHours = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
    
    return { total, inProgress, completed, totalHours };
  }, [projects]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validation des données
      const validation = validateProjectData(formData);
      if (!validation.isValid) {
        showNotification('error', 'Erreurs de validation', validation.errors.join(', '));
        return;
      }

      // Sanitisation des données
      const sanitizedData = sanitizeProjectData(formData);
      
      if (editingProject) {
        await dataService.updateData('projects', editingProject.id, sanitizedData);
        showNotification('success', 'Succès', 'Projet mis à jour avec succès');
      } else {
        await dataService.insertData('projects', sanitizedData);
        showNotification('success', 'Succès', 'Projet créé avec succès');
      }
      
      setShowModal(false);
      setEditingProject(null);
      resetForm();
      // Data will be refreshed automatically by the hook
    } catch (error) {
      handleError(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      client_id: '',
      commercial_id: '',
      status: 'planning',
      priority: 'medium',
      start_date: '',
      end_date: '',
      budget: '',
      progress: 0
    });
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description || '',
      client_id: project.client_id || '',
      commercial_id: project.commercial_id || '',
      status: project.status,
      priority: project.priority,
      start_date: project.start_date || '',
      end_date: project.end_date || '',
      budget: project.budget?.toString() || '',
      progress: project.progress || 0
    });
    setShowModal(true);
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;
    
    try {
      await dataService.deleteData('projects', projectId);
      showNotification('success', 'Succès', 'Projet supprimé avec succès');
      // Data will be refreshed automatically by the hook
    } catch (error) {
      handleError(error);
    }
  };

  const toggleProjectExpansion = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const getStatusInfo = (status: string) => {
    return statusOptions.find(opt => opt.value === status) || statusOptions[0];
  };

  const getPriorityInfo = (priority: string) => {
    return priorityOptions.find(opt => opt.value === priority) || priorityOptions[1];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  if (userRole !== 'master' && userRole !== 'commercial') {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Accès refusé</h3>
        <p className="text-gray-600">Seuls les comptes Master et Commercial peuvent gérer les projets.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Projets</h1>
          <p className="text-gray-600 mt-1">Gérez vos projets commerciaux et suivez leur progression</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center space-x-2 shadow-lg transition-all duration-200"
        >
          <Plus className="h-5 w-5" />
          <span>Nouveau Projet</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FolderOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Projets</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Play className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En cours</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Terminés</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Budget Total</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalHours)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Toutes les priorités</option>
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="created_at-desc">Plus récent</option>
              <option value="created_at-asc">Plus ancien</option>
              <option value="name-asc">Nom A-Z</option>
              <option value="name-desc">Nom Z-A</option>
              <option value="priority-desc">Priorité élevée</option>
              <option value="priority-asc">Priorité faible</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Projets ({filteredProjects.length})</h2>
        </div>
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun projet trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' 
                ? 'Aucun projet ne correspond à vos critères de recherche.'
                : 'Commencez par créer votre premier projet.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && priorityFilter === 'all' && (
              <div className="mt-6">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto"
                >
                  <Plus className="h-4 w-4" />
                  <span>Créer un projet</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredProjects.map((project) => {
              const isExpanded = expandedProjects.has(project.id);
              const statusInfo = getStatusInfo(project.status);
              const priorityInfo = getPriorityInfo(project.priority);
              const client = clients.find(c => c.id === project.client_id);
              
              return (
                <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleProjectExpansion(project.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.color}`}>
                              {priorityInfo.label}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mt-1">{project.description}</p>
                          
                          <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
                            {client && (
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{client.name}</span>
                              </div>
                            )}
                            
                            {project.start_date && (
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Début: {formatDate(project.start_date)}</span>
                              </div>
                            )}
                            
                            {project.budget && (
                              <div className="flex items-center space-x-1">
                                <Target className="h-4 w-4" />
                                <span>{formatCurrency(project.budget)}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center space-x-1">
                              <BarChart3 className="h-4 w-4" />
                              <span>Progression: {project.progress || 0}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          // TODO: Implémenter la vue détaillée
                        }}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Voir les détails"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 pl-8 border-l-2 border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Informations du projet</h4>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">ID:</span> {project.id}</div>
                            <div><span className="font-medium">Créé le:</span> {formatDate(project.created_at)}</div>
                            {project.updated_at && (
                              <div><span className="font-medium">Modifié le:</span> {formatDate(project.updated_at)}</div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Détails</h4>
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">Statut:</span> {statusInfo.label}</div>
                            <div><span className="font-medium">Priorité:</span> {priorityInfo.label}</div>
                            <div><span className="font-medium">Progression:</span> {project.progress || 0}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingProject ? 'Modifier le projet' : 'Nouveau projet'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du projet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client
                  </label>
                  <select
                    value={formData.client_id}
                    onChange={(e) => setFormData({...formData, client_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner un client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priorité
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {priorityOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Progression (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({...formData, progress: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProject(null);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingProject ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
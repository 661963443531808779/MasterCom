import { FC, useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Trash2, RefreshCw, Eye } from 'lucide-react';
import { supabase } from '../services/auth';

interface DeletionRequest {
  id: string;
  table_name: string;
  record_id: string;
  record_data: any;
  reason: string;
  requested_by: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  reviewed_by?: string;
  reviewed_at?: string;
}

interface DeletionValidationProps {
  userRole: string;
}

const DeletionValidation: FC<DeletionValidationProps> = ({ userRole }) => {
  const [requests, setRequests] = useState<DeletionRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<DeletionRequest | null>(null);

  useEffect(() => {
    loadDeletionRequests();
  }, []);

  const loadDeletionRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('deletion_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (request: DeletionRequest) => {
    if (!confirm(`Êtes-vous sûr de vouloir approuver la suppression de cet enregistrement ?`)) {
      return;
    }

    try {
      setLoading(true);

      // Supprimer l'enregistrement de la table concernée
      const { error: deleteError } = await supabase
        .from(request.table_name)
        .delete()
        .eq('id', request.record_id);

      if (deleteError) throw deleteError;

      // Mettre à jour le statut de la demande
      const { error: updateError } = await supabase
        .from('deletion_requests')
        .update({
          status: 'approved',
          reviewed_by: 'master', // À remplacer par l'ID de l'utilisateur connecté
          reviewed_at: new Date().toISOString()
        })
        .eq('id', request.id);

      if (updateError) throw updateError;

      await loadDeletionRequests();
      setSelectedRequest(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (request: DeletionRequest) => {
    if (!confirm(`Êtes-vous sûr de vouloir rejeter cette demande de suppression ?`)) {
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from('deletion_requests')
        .update({
          status: 'rejected',
          reviewed_by: 'master', // À remplacer par l'ID de l'utilisateur connecté
          reviewed_at: new Date().toISOString()
        })
        .eq('id', request.id);

      if (error) throw error;

      await loadDeletionRequests();
      setSelectedRequest(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="badge badge-warning">En attente</span>;
      case 'approved':
        return <span className="badge badge-success">Approuvé</span>;
      case 'rejected':
        return <span className="badge badge-error">Rejeté</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const getTableDisplayName = (tableName: string) => {
    const tableNames: Record<string, string> = {
      'clients': 'Clients',
      'invoices': 'Factures',
      'quotes': 'Devis',
      'support_tickets': 'Tickets Support',
      'projects': 'Projets',
      'user_profiles': 'Profils Utilisateurs'
    };
    return tableNames[tableName] || tableName;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Vérification de Suppression</h2>
              <p className="text-gray-600">Validez ou rejetez les demandes de suppression d'enregistrements</p>
            </div>
          </div>
          <button
            onClick={loadDeletionRequests}
            disabled={loading}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualiser</span>
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">En attente</p>
              <p className="text-2xl font-bold text-gray-900">
                {requests.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Approuvées</p>
              <p className="text-2xl font-bold text-gray-900">
                {requests.filter(r => r.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Rejetées</p>
              <p className="text-2xl font-bold text-gray-900">
                {requests.filter(r => r.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des demandes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Demandes de Suppression</h3>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Chargement...</span>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune demande en attente</h3>
            <p className="text-gray-600">Toutes les demandes de suppression ont été traitées.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Table
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Raison
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Demandé par
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getTableDisplayName(request.table_name)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {request.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.requested_by}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Voir</span>
                      </button>
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request)}
                            disabled={loading}
                            className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Approuver</span>
                          </button>
                          <button
                            onClick={() => handleReject(request)}
                            disabled={loading}
                            className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                          >
                            <XCircle className="h-4 w-4" />
                            <span>Rejeter</span>
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de détail */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Détails de la Demande</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Table concernée</label>
                <p className="mt-1 text-sm text-gray-900">{getTableDisplayName(selectedRequest.table_name)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Raison de la suppression</label>
                <p className="mt-1 text-sm text-gray-900">{selectedRequest.reason}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Données de l'enregistrement</label>
                <pre className="mt-1 text-xs bg-gray-100 p-3 rounded-lg overflow-x-auto">
                  {JSON.stringify(selectedRequest.record_data, null, 2)}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Demandé par</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedRequest.requested_by}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date de demande</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedRequest.created_at).toLocaleString('fr-FR')}
                  </p>
                </div>
              </div>

              {selectedRequest.status !== 'pending' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Traité par</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedRequest.reviewed_by}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date de traitement</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedRequest.reviewed_at ? new Date(selectedRequest.reviewed_at).toLocaleString('fr-FR') : 'N/A'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
              <button
                onClick={() => setSelectedRequest(null)}
                className="btn-secondary"
              >
                Fermer
              </button>
              {selectedRequest.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleReject(selectedRequest)}
                    className="btn-secondary bg-red-600 hover:bg-red-700 text-white"
                  >
                    Rejeter
                  </button>
                  <button
                    onClick={() => handleApprove(selectedRequest)}
                    className="btn-primary bg-green-600 hover:bg-green-700"
                  >
                    Approuver
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletionValidation;
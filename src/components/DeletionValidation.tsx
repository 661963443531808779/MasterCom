import { useState, useEffect, FC } from 'react';
import { 
  Trash2, CheckCircle, XCircle, Clock, AlertTriangle,
  User, FileText, Folder, DollarSign, Eye, MessageSquare
} from 'lucide-react';
import { dataService } from '../services/auth';

interface DeletionRequest {
  id: string;
  table_name: string;
  record_id: string;
  record_data: any;
  reason: string;
  requested_by: string;
  requested_at: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by?: string;
  reviewed_at?: string;
  review_notes?: string;
}

interface DeletionValidationProps {
  userRole: string;
}

const DeletionValidation: FC<DeletionValidationProps> = ({ userRole }) => {
  const [requests, setRequests] = useState<DeletionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<DeletionRequest | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Charger les demandes de suppression
  useEffect(() => {
    loadDeletionRequests();
  }, []);

  const loadDeletionRequests = async () => {
    try {
      setLoading(true);
      const data = await dataService.getTableData('deletion_requests');
      setRequests(data as DeletionRequest[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Approuver une suppression
  const approveDeletion = async (requestId: string) => {
    try {
      setActionLoading(requestId);
      
      // Mettre à jour le statut de la demande
      await dataService.updateData('deletion_requests', requestId, {
        status: 'approved',
        reviewed_by: 'aa72e089-7ae9-4fe6-bae1-04cce09df80c', // UUID du compte master
        reviewed_at: new Date().toISOString(),
        review_notes: reviewNotes
      });

      // Supprimer l'enregistrement de la table concernée
      const request = requests.find(r => r.id === requestId);
      if (request) {
        await dataService.deleteData(request.table_name, request.record_id);
      }

      // Recharger les demandes
      await loadDeletionRequests();
      setSelectedRequest(null);
      setReviewNotes('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // Rejeter une suppression
  const rejectDeletion = async (requestId: string) => {
    try {
      setActionLoading(requestId);
      
      await dataService.updateData('deletion_requests', requestId, {
        status: 'rejected',
        reviewed_by: 'aa72e089-7ae9-4fe6-bae1-04cce09df80c', // UUID du compte master
        reviewed_at: new Date().toISOString(),
        review_notes: reviewNotes
      });

      await loadDeletionRequests();
      setSelectedRequest(null);
      setReviewNotes('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // Obtenir l'icône selon le type de table
  const getTableIcon = (tableName: string) => {
    switch (tableName) {
      case 'clients': return <User className="h-5 w-5" />;
      case 'projects': return <Folder className="h-5 w-5" />;
      case 'invoices': return <FileText className="h-5 w-5" />;
      case 'quotes': return <DollarSign className="h-5 w-5" />;
      default: return <Trash2 className="h-5 w-5" />;
    }
  };

  // Obtenir le nom affiché selon le type de table
  const getTableDisplayName = (tableName: string) => {
    switch (tableName) {
      case 'clients': return 'Client';
      case 'projects': return 'Projet';
      case 'invoices': return 'Facture';
      case 'quotes': return 'Devis';
      default: return tableName;
    }
  };

  // Obtenir la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Obtenir l'icône du statut
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Chargement des demandes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>Erreur:</strong> {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-8 w-8 text-orange-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vérification de Suppression</h2>
            <p className="text-gray-600">Validez ou refusez les demandes de suppression</p>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En Attente</p>
              <p className="text-2xl font-bold text-yellow-600">
                {requests.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approuvées</p>
              <p className="text-2xl font-bold text-green-600">
                {requests.filter(r => r.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejetées</p>
              <p className="text-2xl font-bold text-red-600">
                {requests.filter(r => r.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des demandes */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Demandes de Suppression</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {requests.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Trash2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Aucune demande de suppression en cours</p>
            </div>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getTableIcon(request.table_name)}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {getTableDisplayName(request.table_name)}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {request.record_data?.name || request.record_data?.email || 'Enregistrement'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Demandé le {new Date(request.requested_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1 capitalize">{request.status}</span>
                    </span>

                    {request.status === 'pending' && (
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Examiner
                      </button>
                    )}
                  </div>
                </div>

                {request.reason && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700">
                      <strong>Raison:</strong> {request.reason}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de validation */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Valider la Suppression
                </h3>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Type:</p>
                  <p className="text-sm text-gray-900">{getTableDisplayName(selectedRequest.table_name)}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Données:</p>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
                    {JSON.stringify(selectedRequest.record_data, null, 2)}
                  </pre>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Raison:</p>
                  <p className="text-sm text-gray-900">{selectedRequest.reason}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes de validation:
                  </label>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Ajoutez vos notes de validation..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => approveDeletion(selectedRequest.id)}
                    disabled={actionLoading === selectedRequest.id}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                  >
                    {actionLoading === selectedRequest.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approuver
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => rejectDeletion(selectedRequest.id)}
                    disabled={actionLoading === selectedRequest.id}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
                  >
                    {actionLoading === selectedRequest.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 mr-2" />
                        Rejeter
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletionValidation;

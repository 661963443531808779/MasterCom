import { useState, FC } from 'react';
import { 
  Plus, Edit, Trash2, Search, 
  FileText
} from 'lucide-react';
import { useApiData } from '../hooks/useApiData';
import { useSecureForm, validationRules } from '../hooks/useSecureForm';

interface Quote {
  id: string;
  quote_number: string;
  client_id: string;
  amount: number;
  tax_rate: number;
  total_amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  valid_until: string;
  accepted_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

const QuoteCRUD: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const {
    data: quotes,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem
  } = useApiData<Quote>({ endpoint: 'quotes' });

  const {
    data: clients
  } = useApiData({ endpoint: 'clients' });

  const {
    values: formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue
  } = useSecureForm({
    initialValues: {
      quote_number: '',
      client_id: '',
      amount: 0,
      tax_rate: 20,
      total_amount: 0,
      status: 'draft',
      valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      accepted_date: '',
      notes: ''
    },
    validationRules: {
      quote_number: validationRules.required,
      client_id: validationRules.required,
      amount: (value: number) => value > 0 ? null : 'Le montant doit être supérieur à 0'
    }
  });

  const handleCreate = async (values: any) => {
    try {
      const totalAmount = values.amount * (1 + values.tax_rate / 100);
      await createItem({ ...values, total_amount: totalAmount });
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la création du devis:', error);
    }
  };

  const handleUpdate = async (values: any) => {
    if (!editingQuote) return;
    
    try {
      const totalAmount = values.amount * (1 + values.tax_rate / 100);
      await updateItem(editingQuote.id, { ...values, total_amount: totalAmount });
      setShowModal(false);
      setEditingQuote(null);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du devis:', error);
    }
  };

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote);
    Object.keys(formData).forEach(key => {
      setFieldValue(key, quote[key as keyof Quote] || '');
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) {
      try {
        await deleteItem(id);
      } catch (error) {
        console.error('Erreur lors de la suppression du devis:', error);
      }
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = (quote.quote_number?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'accepted': return 'Accepté';
      case 'sent': return 'Envoyé';
      case 'draft': return 'Brouillon';
      case 'rejected': return 'Refusé';
      case 'expired': return 'Expiré';
      default: return status;
    }
  };

  const getClientName = (clientId: string): string => {
    const client = clients.find((c: any) => c.id === clientId);
    return (client && typeof client === 'object' && 'name' in client) ? String(client.name) : 'Client inconnu';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Devis</h2>
          <p className="text-gray-600">Gérez vos devis et suivez leur statut</p>
        </div>
        <button
          onClick={() => {
            setEditingQuote(null);
            resetForm();
            setShowModal(true);
          }}
          className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Devis
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher un devis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="draft">Brouillon</option>
            <option value="sent">Envoyé</option>
            <option value="accepted">Accepté</option>
            <option value="rejected">Refusé</option>
            <option value="expired">Expiré</option>
          </select>
        </div>
      </div>

      {/* Liste des devis */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {error && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <p className="text-red-700">Erreur: {error}</p>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Devis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valide jusqu'au
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{quote.quote_number}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(quote.created_at).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getClientName(quote.client_id)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {quote.total_amount.toLocaleString('fr-FR')}€
                    </div>
                    <div className="text-sm text-gray-500">
                      HT: {quote.amount.toLocaleString('fr-FR')}€
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                      {getStatusLabel(quote.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(quote.valid_until).toLocaleDateString('fr-FR')}
                    </div>
                    {quote.accepted_date && (
                      <div className="text-sm text-green-600">
                        Accepté le {new Date(quote.accepted_date).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(quote)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(quote.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredQuotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun devis trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Essayez de modifier vos critères de recherche.'
                : 'Commencez par créer votre premier devis.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal de création/édition */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingQuote ? 'Modifier le devis' : 'Nouveau devis'}
              </h3>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(editingQuote ? handleUpdate : handleCreate);
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Numéro de devis *
                    </label>
                    <input
                      type="text"
                      name="quote_number"
                      value={formData.quote_number}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.quote_number ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.quote_number && <p className="mt-1 text-sm text-red-600">{errors.quote_number}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client *
                    </label>
                    <select
                      name="client_id"
                      value={formData.client_id}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.client_id ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Sélectionner un client</option>
                      {clients.map((client: any) => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                    {errors.client_id && <p className="mt-1 text-sm text-red-600">{errors.client_id}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Montant HT (€) *
                    </label>
                    <input
                      type="number"
                      name="amount"
                      step="0.01"
                      min="0"
                      value={formData.amount}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.amount ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Taux TVA (%)
                    </label>
                    <input
                      type="number"
                      name="tax_rate"
                      min="0"
                      max="100"
                      value={formData.tax_rate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Montant TTC (€)
                    </label>
                    <input
                      type="number"
                      value={(formData.amount * (1 + formData.tax_rate / 100)).toFixed(2)}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valide jusqu'au
                    </label>
                    <input
                      type="date"
                      name="valid_until"
                      value={formData.valid_until}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Statut
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="draft">Brouillon</option>
                      <option value="sent">Envoyé</option>
                      <option value="accepted">Accepté</option>
                      <option value="rejected">Refusé</option>
                      <option value="expired">Expiré</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingQuote(null);
                      resetForm();
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Enregistrement...' : (editingQuote ? 'Modifier' : 'Créer')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteCRUD;

import { useState } from 'react';
import { dataService } from '../services/auth';

interface DeletionRequestData {
  table_name: string;
  record_id: string;
  record_data: any;
  reason: string;
}

export const useDeletionRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestDeletion = async (data: DeletionRequestData) => {
    try {
      setLoading(true);
      setError(null);

      // Créer une demande de suppression
      const deletionRequest = {
        table_name: data.table_name,
        record_id: data.record_id,
        record_data: data.record_data,
        reason: data.reason,
        requested_by: 'current-user-id', // En production, utiliser l'ID de l'utilisateur connecté
        status: 'pending'
      };

      await dataService.insertData('deletion_requests', deletionRequest);
      
      return { success: true, message: 'Demande de suppression envoyée pour validation' };
    } catch (err: any) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteWithConfirmation = async (
    tableName: string,
    recordId: string,
    recordData: any,
    reason: string
  ) => {
    // Demander confirmation à l'utilisateur
    const confirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer cet élément ?\n\n` +
      `Type: ${tableName}\n` +
      `Données: ${JSON.stringify(recordData, null, 2)}\n\n` +
      `Cette action nécessitera une validation du compte master.`
    );

    if (!confirmed) {
      return { success: false, message: 'Suppression annulée' };
    }

    // Demander la raison
    const deletionReason = reason || window.prompt(
      'Veuillez indiquer la raison de cette suppression :'
    );

    if (!deletionReason) {
      return { success: false, message: 'Raison de suppression requise' };
    }

    // Créer la demande de suppression
    return await requestDeletion({
      table_name: tableName,
      record_id: recordId,
      record_data: recordData,
      reason: deletionReason
    });
  };

  return {
    requestDeletion,
    deleteWithConfirmation,
    loading,
    error
  };
};

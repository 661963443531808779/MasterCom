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

      // Vérifier s'il existe déjà une demande en cours pour cet enregistrement
      const existingRequests = await dataService.getTableData('deletion_requests');
      const duplicateRequest = existingRequests.find((req: any) => 
        req.table_name === data.table_name && 
        req.record_id === data.record_id && 
        req.status === 'pending'
      );

      if (duplicateRequest) {
        return { 
          success: false, 
          message: `Une demande de suppression est déjà en cours pour cet élément. Statut: ${duplicateRequest.status}` 
        };
      }

      // Créer une demande de suppression
      const deletionRequest = {
        table_name: data.table_name,
        record_id: data.record_id,
        record_data: data.record_data,
        reason: data.reason,
        requested_by: 'aa72e089-7ae9-4fe6-bae1-04cce09df80c', // UUID du compte master
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
    // Cette fonction est maintenant remplacée par le système de confirmation personnalisé
    // Elle est gardée pour compatibilité mais ne devrait plus être utilisée directement
    return await requestDeletion({
      table_name: tableName,
      record_id: recordId,
      record_data: recordData,
      reason: reason
    });
  };

  return {
    requestDeletion,
    deleteWithConfirmation,
    loading,
    error
  };
};

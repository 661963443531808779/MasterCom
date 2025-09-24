import { useState, useCallback } from 'react';

interface ConfirmationState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'delete' | 'warning' | 'info';
  requireReason: boolean;
  confirmText: string;
  cancelText: string;
  onConfirm: (reason?: string) => void;
}

export const useConfirmation = () => {
  const [confirmation, setConfirmation] = useState<ConfirmationState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    requireReason: false,
    confirmText: 'Confirmer',
    cancelText: 'Annuler',
    onConfirm: () => {}
  });

  const showConfirmation = useCallback((
    title: string,
    message: string,
    onConfirm: (reason?: string) => void,
    options: {
      type?: 'delete' | 'warning' | 'info';
      requireReason?: boolean;
      confirmText?: string;
      cancelText?: string;
    } = {}
  ) => {
    setConfirmation({
      isOpen: true,
      title,
      message,
      type: options.type || 'info',
      requireReason: options.requireReason || false,
      confirmText: options.confirmText || 'Confirmer',
      cancelText: options.cancelText || 'Annuler',
      onConfirm
    });
  }, []);

  const hideConfirmation = useCallback(() => {
    setConfirmation(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  const confirmDelete = useCallback((
    title: string,
    message: string,
    onConfirm: (reason?: string) => void,
    requireReason: boolean = true
  ) => {
    showConfirmation(title, message, onConfirm, {
      type: 'delete',
      requireReason,
      confirmText: 'Supprimer',
      cancelText: 'Annuler'
    });
  }, [showConfirmation]);

  return {
    confirmation,
    showConfirmation,
    hideConfirmation,
    confirmDelete
  };
};

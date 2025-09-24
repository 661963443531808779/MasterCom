import { FC, useState } from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  title: string;
  message: string;
  type: 'delete' | 'warning' | 'info';
  requireReason?: boolean;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type,
  requireReason = false,
  confirmText = 'Confirmer',
  cancelText = 'Annuler'
}) => {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (requireReason && !reason.trim()) {
      return; // Ne pas confirmer si la raison est requise mais vide
    }
    onConfirm(reason.trim() || undefined);
    setReason('');
    onClose();
  };

  const handleCancel = () => {
    setReason('');
    onClose();
  };

  if (!isOpen) return null;

  const getConfig = () => {
    switch (type) {
      case 'delete':
        return {
          icon: Trash2,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          buttonColor: 'bg-red-600 hover:bg-red-700',
          titleColor: 'text-red-800'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          iconColor: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
          titleColor: 'text-yellow-800'
        };
      default:
        return {
          icon: AlertTriangle,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          buttonColor: 'bg-blue-600 hover:bg-blue-700',
          titleColor: 'text-blue-800'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
        onClick={handleCancel}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md ${config.bgColor} ${config.borderColor} border rounded-xl shadow-xl transform transition-all duration-300 ease-out`}>
        {/* Bouton de fermeture */}
        <button
          onClick={handleCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Contenu */}
        <div className="p-6">
          <div className="flex items-start space-x-4">
            {/* Icône */}
            <div className={`flex-shrink-0 ${config.iconColor}`}>
              <Icon className="h-8 w-8" />
            </div>

            {/* Texte */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-lg font-semibold ${config.titleColor} mb-3`}>
                {title}
              </h3>
              <div className="text-sm text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                {message}
              </div>

              {/* Champ de raison si requis */}
              {requireReason && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Raison de la suppression *
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    rows={3}
                    placeholder="Indiquez la raison de cette suppression..."
                    required
                  />
                  {!reason.trim() && (
                    <p className="text-xs text-red-500 mt-1">
                      La raison est obligatoire pour confirmer la suppression
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Boutons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={requireReason && !reason.trim()}
              className={`flex-1 px-4 py-2 text-white rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm hover:shadow-md ${config.buttonColor}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

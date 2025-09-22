import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Bell, BellOff } from 'lucide-react';

// Hooks de notifications - version production
const useNotifications = () => ({ 
  notifications: [], 
  removeNotification: () => {}, 
  clearAll: () => {} 
});

const useSystemNotifications = () => ({ 
  requestPermission: () => Promise.resolve(false), 
  showSystemNotification: () => {} 
});

const useRealtimeNotifications = () => ({ 
  isConnected: false 
});

const NotificationSystem: React.FC = () => {
  const { notifications, removeNotification, clearAll } = useNotifications();
  const { requestPermission } = useSystemNotifications();
  const { isConnected } = useRealtimeNotifications();
  const [systemNotificationsEnabled, setSystemNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Demander la permission pour les notifications système au chargement
    requestPermission().then((enabled: boolean) => {
      setSystemNotificationsEnabled(enabled);
    });
  }, [requestPermission]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const handleSystemNotificationToggle = async () => {
    if (!systemNotificationsEnabled) {
      const enabled = await requestPermission();
      setSystemNotificationsEnabled(enabled);
    } else {
      setSystemNotificationsEnabled(false);
    }
  };

  return (
    <>
      {/* Notification Bell */}
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center space-x-2">
          {/* Status de connexion */}
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} 
               title={isConnected ? 'Connecté' : 'Déconnecté'} />
          
          {/* Bouton notifications système */}
          <button
            onClick={handleSystemNotificationToggle}
            className={`p-2 rounded-full transition-colors ${
              systemNotificationsEnabled 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            title={systemNotificationsEnabled ? 'Notifications système activées' : 'Activer les notifications système'}
          >
            {systemNotificationsEnabled ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
          </button>

          {/* Bouton clear all */}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="px-3 py-1 text-xs bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              Effacer tout ({notifications.length})
            </button>
          )}
        </div>
      </div>

      {/* Notification Container */}
      <div className="fixed top-20 right-4 z-40 space-y-2 max-w-sm">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border shadow-lg transform transition-all duration-300 ease-in-out animate-slide-in-right ${getBackgroundColor(notification.type)}`}
          >
            <div className="flex items-start space-x-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {notification.message}
                </p>
                
                {/* Actions */}
                {notification.actions && (
                  <div className="mt-3 flex space-x-2">
                    {notification.actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                          action.style === 'danger' 
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : action.style === 'primary'
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default NotificationSystem;

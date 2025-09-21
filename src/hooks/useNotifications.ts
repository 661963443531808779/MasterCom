import { useState, useCallback, useEffect } from 'react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  actions?: NotificationAction[];
  persistent?: boolean;
}

export interface NotificationAction {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

export interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotifications = (): NotificationState => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newNotification: Notification = {
      id,
      duration: 5000,
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove notification after duration (unless persistent)
    if (!notification.persistent && newNotification.duration) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
  };
};

// Hook pour les notifications toast
export const useToast = () => {
  const { addNotification } = useNotifications();

  const toast = useCallback((type: Notification['type'], title: string, message: string, options?: Partial<Notification>) => {
    return addNotification({
      type,
      title,
      message,
      ...options,
    });
  }, [addNotification]);

  return {
    success: (title: string, message: string, options?: Partial<Notification>) =>
      toast('success', title, message, options),
    error: (title: string, message: string, options?: Partial<Notification>) =>
      toast('error', title, message, { persistent: true, ...options }),
    warning: (title: string, message: string, options?: Partial<Notification>) =>
      toast('warning', title, message, options),
    info: (title: string, message: string, options?: Partial<Notification>) =>
      toast('info', title, message, options),
  };
};

// Hook pour les notifications système
export const useSystemNotifications = () => {
  const { addNotification } = useNotifications();

  const requestPermission = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }, []);

  const showSystemNotification = useCallback(async (notification: Omit<Notification, 'id'>) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const systemNotification = new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: 'mastercom-notification',
      });

      systemNotification.onclick = () => {
        window.focus();
        systemNotification.close();
      };

      // Also add to in-app notifications
      addNotification(notification);
    }
  }, [addNotification]);

  return {
    requestPermission,
    showSystemNotification,
  };
};

// Hook pour les notifications en temps réel
export const useRealtimeNotifications = () => {
  const { addNotification } = useNotifications();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulation de connexion WebSocket
    const connectWebSocket = () => {
      // Dans un vrai projet, vous utiliseriez une vraie connexion WebSocket
      setIsConnected(true);
      
      // Simuler des notifications en temps réel
      const interval = setInterval(() => {
        const randomNotifications = [
          {
            type: 'info' as const,
            title: 'Nouveau client',
            message: 'Un nouveau client s\'est inscrit',
          },
          {
            type: 'success' as const,
            title: 'Facture payée',
            message: 'Une facture vient d\'être réglée',
          },
          {
            type: 'warning' as const,
            title: 'Projet en retard',
            message: 'Un projet approche de sa date limite',
          },
        ];

        const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        
        // Ajouter une notification toutes les 30 secondes (pour la démo)
        if (Math.random() < 0.1) { // 10% de chance
          addNotification(randomNotification);
        }
      }, 30000);

      return () => clearInterval(interval);
    };

    const cleanup = connectWebSocket();
    return cleanup;
  }, [addNotification]);

  return {
    isConnected,
  };
};

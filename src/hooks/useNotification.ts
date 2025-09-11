import { useState, useCallback } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

interface UseNotificationReturn {
  notifications: NotificationData[];
  showNotification: (type: NotificationType, title: string, message?: string, duration?: number) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

export const useNotification = (): UseNotificationReturn => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const showNotification = useCallback((
    type: NotificationType,
    title: string,
    message?: string,
    duration: number = 5000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: NotificationData = {
      id,
      type,
      title,
      message,
      duration
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    showNotification,
    removeNotification,
    clearAllNotifications
  };
};

import { useState, useEffect, useCallback } from 'react';

import { 
  Notification,
  NotificationError,
  fetchNotifications,
  markNotificationAsRead,
  deleteNotification,
  showNotification
} from '@/app/utils/notifications';

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await fetchNotifications();
      
      if ('error' in result) {
        setError(result.error);
        return;
      }

      setNotifications(result);
      setUnreadCount(result.filter(n => !n.read).length);
      setError(null);
    } catch (err) {
      setError('Failed to load notifications');
      console.error('Error loading notifications:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const result = await markNotificationAsRead(notificationId);
      
      if ('error' in result) {
        setError(result.error);
        return;
      }

      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? result : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      setError('Failed to mark notification as read');
      console.error('Error marking notification as read:', err);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      const promises = notifications
        .filter(n => !n.read)
        .map(n => markNotificationAsRead(n.id));
      
      const results = await Promise.all(promises);
      
      if (results.some(result => 'error' in result)) {
        setError('Failed to mark all notifications as read');
        return;
      }

      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      setError('Failed to mark all notifications as read');
      console.error('Error marking all notifications as read:', err);
    }
  }, [notifications]);

  const handleDeleteNotification = useCallback(async (notificationId: string) => {
    try {
      const result = await deleteNotification(notificationId);
      
      if ('error' in result) {
        setError(result.error);
        return;
      }

      setNotifications(prev => 
        prev.filter(n => n.id !== notificationId)
      );
      setUnreadCount(prev => 
        prev - (notifications.find(n => n.id === notificationId)?.read ? 0 : 1)
      );
    } catch (err) {
      setError('Failed to delete notification');
      console.error('Error deleting notification:', err);
    }
  }, [notifications]);

  // Poll for new notifications every minute
  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 60000);
    return () => clearInterval(interval);
  }, [loadNotifications]);

  // Show new notifications
  useEffect(() => {
    const unreadNotifications = notifications.filter(n => !n.read);
    unreadNotifications.forEach(showNotification);
  }, [notifications]);

  
}
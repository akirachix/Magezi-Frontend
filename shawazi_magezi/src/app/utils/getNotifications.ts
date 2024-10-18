export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
    read: boolean;
    createdAt: Date;
    userId: string;
  }
  
  export interface NotificationError {
    error: string;
    status?: number;
  }
  
  export async function fetchNotifications(): Promise<Notification[] | NotificationError> {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch notifications');
      }
  
      return data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return {
        error: (error as Error).message,
        status: 500,
      };
    }
  }
  
  
  export async function createNotification(data: {
    title: string;
    message: string;
    type: Notification['type'];
    userId: string;
  }): Promise<Notification | NotificationError> {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to create notification');
      }
  
      return responseData;
    } catch (error) {
      console.error('Error creating notification:', error);
      return {
        error: (error as Error).message,
        status: 500,
      };
    }
  }
  


  

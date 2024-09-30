import { io } from 'socket.io-client';

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5001';

const socket = io(SOCKET_URL, {
  transports: ['websocket'], 
  reconnectionAttempts: 5, 
  reconnectionDelayMax: 10000,
});

export const sendMessage = (content: string, sender: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!content || !sender) {
      return reject('Content and sender are required');
    }

    socket.emit('new message', { content, sender }, (error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export const fetchMessages = (): Promise<Message[]> => {
  return new Promise((resolve, reject) => {
    socket.on('initial messages', (messages: Message[]) => {
      resolve(messages);
    });

    socket.on('connect_error', (error: any) => {
      reject(error);
    });
  });
};

export const onNewMessage = (callback: (message: Message) => void) => {
  socket.on('new message', callback);

  return () => {
    socket.off('new message', callback);
  };
};

socket.on('disconnect', () => {
  console.warn('Socket disconnected. Attempting to reconnect...');
});


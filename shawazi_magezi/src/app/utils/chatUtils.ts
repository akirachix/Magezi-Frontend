import { io } from 'socket.io-client';

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
}

const socket = io('http://localhost:5001');

export const sendMessage = (content: string, sender: string): Promise<void> => {
  return new Promise((resolve) => {
    socket.emit('new message', { content, sender });
    resolve();
  });
};

export const fetchMessages = (): Promise<Message[]> => {
  return new Promise((resolve) => {
    socket.on('initial messages', (messages: Message[]) => {
      resolve(messages);
    });
  });
};

export const onNewMessage = (callback: (message: Message) => void) => {
  socket.on('new message', callback);
};





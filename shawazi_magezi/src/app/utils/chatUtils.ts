import Pusher from 'pusher-js';

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
}

// Initialize Pusher
const pusher = new Pusher('PUSHER_APP_KEY', {
  cluster: 'PUSHER_CLUSTER',
});

const channel = pusher.subscribe('chat-channel');

export const sendMessage = async (content: string, sender: string): Promise<void> => {
  await fetch('http://localhost:5001/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, sender }),
  });
};

export const fetchMessages = async (): Promise<Message[]> => {
  const response = await fetch('http://localhost:5001/messages');
  return response.json();
};

export const onNewMessage = (callback: (message: Message) => void) => {
  channel.bind('new-message', callback);
};





// import { io } from 'socket.io-client';

// export interface Message {
//   id: string;
//   sender: string;
//   content: string;
//   timestamp: number;
// }

// const socket = io('http://localhost:5001');

// export const sendMessage = (content: string, sender: string): Promise<void> => {
//   return new Promise((resolve) => {
//     socket.emit('new message', { content, sender });
//     resolve();
//   });
// };

// export const fetchMessages = (): Promise<Message[]> => {
//   return new Promise((resolve) => {
//     socket.on('initial messages', (messages: Message[]) => {
//       resolve(messages);
//     });
//   });
// };

// export const onNewMessage = (callback: (message: Message) => void) => {
//   socket.on('new message', callback);
// };





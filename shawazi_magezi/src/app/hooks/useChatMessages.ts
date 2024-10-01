import { useState, useEffect } from 'react';
import Pusher from 'pusher-js'; // Use 'pusher-js' for frontend integration
import { Message, sendMessage, fetchMessages, onNewMessage } from '../utils/chatUtils';

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMessages = async () => {
      try {
        const initialMessages = await fetchMessages();
        setMessages(initialMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to fetch messages');
      }
    };

    initializeMessages();

    // Initialize Pusher
    const pusher = new Pusher('USHER_APP_KEY', {
      cluster: 'PUSHER_CLUSTER',
    });

    const channel = pusher.subscribe('chat-channel');
    channel.bind('new-message', (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      // Clean up Pusher subscription
      pusher.unsubscribe('chat-channel');
      pusher.disconnect();
    };
  }, []);

  const addMessage = async (content: string, sender: string) => {
    try {
      await sendMessage(content, sender);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
    }
  };

  return { messages, addMessage, error };
};





// import { useState, useEffect, useRef } from 'react';
// import { io, Socket } from 'socket.io-client';

// localStorage.debug = '*';

// export interface Message {
//   id: string;
//   sender: string;
//   content: string;
//   timestamp: number;
// }

// export const useChatMessages = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     socketRef.current = io('http://localhost:5001', {
//       reconnectionAttempts: 5,
//       transports: ['websocket', 'polling'], // Allow fallback to polling
//     });

//     socketRef.current.on('connect', () => {
//       console.log('Connected to server');
//       setIsLoaded(true);
//       setError(null);
//     });

//     socketRef.current.on('connect_error', (error) => {
//       console.error('Socket connection error:', error);
//       setError(`Connection error: ${error.message}`);
//       setIsLoaded(false);
//     });

//     socketRef.current.on('initial messages', (initialMessages: Message[]) => {
//       setMessages(initialMessages);
//     });

//     socketRef.current.on('new message', (newMessage: Message) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     socketRef.current.on('disconnect', (reason) => {
//       console.log('Disconnected from server:', reason);
//       setIsLoaded(false);
//       if (reason === 'io server disconnect') {
//         socketRef.current?.connect();
//       }
//     });

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, []);

//   const addMessage = async (content: string, sender: string) => {
//     if (!socketRef.current) {
//       setError('Socket is not connected');
//       return;
//     }

//     const newMessage = {
//       id: Date.now().toString(),
//       sender,
//       content,
//       timestamp: Date.now(),
//     };

//     socketRef.current.emit('new message', newMessage, (error: any) => {
//       if (error) {
//         console.error('Error sending message:', error);
//         setError(`Failed to send message: ${error.message}`);
//       }
//     });
//   };

//   return { messages, addMessage, isLoaded, error };
// };
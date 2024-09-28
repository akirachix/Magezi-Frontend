import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
}

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:5001', {
      reconnectionAttempts: 5,
      transports: ['websocket'],
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
      setIsLoaded(true);
    });

    socketRef.current.on('initial messages', (initialMessages: Message[]) => {
      setMessages(initialMessages);
    });

    socketRef.current.on('new message', (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const addMessage = async (content: string, sender: string) => {
    if (!socketRef.current) return;

    const newMessage = {
      id: Date.now().toString(),
      sender,
      content,
      timestamp: Date.now(),
    };

    socketRef.current.emit('new message', newMessage);
  };

  return { messages, addMessage, isLoaded };
};

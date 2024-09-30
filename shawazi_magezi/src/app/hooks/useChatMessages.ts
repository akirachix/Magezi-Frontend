import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
}

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '',
    });

    const channel = pusher.subscribe('chat-channel');

    channel.bind('new-message', (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const addMessage = (content: string, sender: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender,
      content,
      timestamp: Date.now(),
    };

    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    });
  };

  return { messages, addMessage };
};

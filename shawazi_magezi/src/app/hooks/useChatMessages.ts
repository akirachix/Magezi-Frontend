// useChatMessages.ts
import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

const useChatMessages = (currentUserId: string, currentUserRole: string) => {
  const [messages, setMessages] = useState<any[]>([]);

  // Initialize Pusher and subscribe to the channel
  useEffect(() => {
    const pusher = new Pusher('YOUR_PUSHER_KEY', {
      cluster: 'YOUR_CLUSTER',
    });

    const channel = pusher.subscribe('chat-channel');
    channel.bind('new-message', (data: any) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusher.unsubscribe('chat-channel');
    };
  }, []);

  // Function to send a message
  const sendMessage = async (message: string, receiverId: string) => {
    const newMessage = {
      message,
      senderId: currentUserId,
      receiverId,
      role: currentUserRole,
    };

    // Send the message to the backend
    try {
      await fetch('http://localhost:5000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return {
    messages,
    sendMessage,
  };
};

export default useChatMessages;









// import { useState, useEffect } from 'react';
// import Pusher from 'pusher-js'; 
// import { Message, sendMessage, fetchMessages, onNewMessage } from '../utils/chatUtils';

// export const useChatMessages = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const initializeMessages = async () => {
//       try {
//         const initialMessages = await fetchMessages();
//         setMessages(initialMessages);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//         setError('Failed to fetch messages');
//       }
//     };
//     initializeMessages();
//     const pusher = new Pusher('PUSHER_APP_KEY', {
//       cluster: 'PUSHER_CLUSTER',
//     });

//     const channel = pusher.subscribe('chat-channel');
//     channel.bind('new-message', (newMessage: Message) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     return () => {
//       pusher.unsubscribe('chat-channel');
//       pusher.disconnect();
//     };
//   }, []);

//   const addMessage = async (content: string, sender: string) => {
//     try {
//       await sendMessage(content, sender);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setError('Failed to send message');
//     }
//   };

//   return { messages, addMessage, error };
// };

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

export const fetchMessages = async (): Promise<Message[]> => {
  const response = await fetch('/api/messages');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const sendMessage = async (content: string, sender: string): Promise<void> => {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, sender }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};



import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useChatMessages } from '../../hooks/useChatMessages';
import { useScrollToBottom } from '../../hooks/useScrollToBottom';
import { formatTimestamp } from '../../utils/dateUtils';
import { useGetUsers } from '@/app/hooks/useGetUsers';
import UserCard from '@/app/hooks/usersCard/UserCard';

interface UserType {
    id: string;
    first_name: string;
    role: string;
}

interface MessageType {
    id: string;
    content: string;
    sender: string;
    timestamp: number;
}

const ChatRoom: React.FC = () => {
    const { messages, addMessage, isLoaded } = useChatMessages();
    const { users, loading, error } = useGetUsers();

    const [inputMessage, setInputMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [availableUsers, setAvailableUsers] = useState<UserType[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const messagesEndRef = useScrollToBottom<HTMLDivElement>();
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const [currentUserName, setCurrentUserName] = useState<string | null>(null);

    const hardCodedMessages: { [key: string]: string[] } = {
        seller: ['Are you interested in this property?', 'The property is still available.', 'Would you like to schedule a viewing?'],
        buyer: ['I\'m interested in your land!', 'Is it still on sale?', 'What\'s the asking price for the property?', 'Can we arrange a visit?'],
        lawyer: ['Thank you for your message. How can I assist you with this property transaction?', 'Have you reviewed the contract details yet?', 'Let me know if you need any legal advice regarding this property.']
    };

    useEffect(() => {
        const userRole = getCookie('userRole');
        const userName = getCookie('userName') || 'Gatweri'; 
        setCurrentUserRole(userRole as string);
        setCurrentUserName(userName as string);
    }, []);

    useEffect(() => {
        if (!loading && !error) {
            let filteredUsers: UserType[] = [];
            if (currentUserRole === 'lawyer') {
                filteredUsers = users.filter((user: { role: string; }) => user.role === 'buyer' || user.role === 'seller');
            } else if (currentUserRole === 'buyer') {
                filteredUsers = users.filter((user: { role: string; }) => user.role === 'seller');
            } else if (currentUserRole === 'seller') {
                filteredUsers = users.filter((user: { role: string; }) => user.role === 'buyer');
            }
            setAvailableUsers(filteredUsers);
        }
    }, [loading, error, users, currentUserRole]);

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '' || !selectedUser) {
            console.error('Cannot send message: either message is empty or no user selected');
            return;
        }

        try {
            await addMessage(inputMessage, currentUserName || 'Unknown');
            setInputMessage('');

            setTimeout(() => {
                const responseRole = currentUserRole === 'lawyer' ? selectedUser.role : 'lawyer';
                const responseMessage = hardCodedMessages[responseRole][Math.floor(Math.random() * hardCodedMessages[responseRole].length)];
                addMessage(responseMessage, selectedUser.first_name);
            }, 1000);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await handleSendMessage();
        }
    };

    const filteredMessages = messages.filter((message) => {
        const sender = String(message.sender || '');
        const content = String(message.content || '');
        return sender.toLowerCase().includes(searchTerm.toLowerCase()) || content.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const startConversation = (user: UserType) => {
        setSelectedUser(user);
        console.log(`Starting conversation with ${user.first_name} (${user.role})`);
    };

    if (!isLoaded || loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading users: {error.message}</div>;
    }

    const getUserListTitle = () => {
        switch (currentUserRole) {
            case 'buyer':
                return 'Available Sellers';
            case 'seller':
                return 'Available Buyers';
            case 'lawyer':
                return 'Available Users';
            default:
                return 'Users';
        }
    };

    return (
        <div className="flex bg-gray-100 font-jost h-[777px] w-full">
            <div className="flex flex-1 max-w-7xl mx-auto px-2">
                <div className="w-1/4 bg-white border-r border-gray-200 p-2 flex flex-col">
                    <div className="mb-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search users..."
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        <h2 className="font-semibold mt-4">
                            {getUserListTitle()}
                        </h2>

                        {availableUsers.length > 0 ? (
                            availableUsers.map((user) => (
                                <UserCard 
                                    key={user.id} 
                                    user={user} 
                                    startConversation={() => startConversation(user)} 
                                />
                            ))
                        ) : (
                            <p>No users available</p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-grow">
                    <header className="bg-white shadow-sm p-3 flex items-center">
                        <h1 className="text-xl font-semibold text-green-700">
                            {selectedUser ? `Chat with ${selectedUser.first_name} (${selectedUser.role})` : 'Select a user to chat'}
                        </h1>
                    </header>

                    <main className="flex-1 overflow-y-auto p-4 bg-gray-50" ref={messagesEndRef}>
                        {filteredMessages.map((message) => (
                            <div key={message.id} className={`mb-4 ${message.sender === currentUserName ? 'flex justify-end' : 'flex justify-start'}`}>
                                <div className={`max-w-[70%] p-2 rounded-lg ${
                                    message.sender === currentUserName 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-200 text-gray-800'
                                }`}>
                                    <p className="font-semibold">{message.sender}</p>
                                    <p>{message.content}</p>
                                    <p className={`text-xs ${
                                        message.sender === currentUserName 
                                        ? 'text-blue-200' 
                                        : 'text-gray-500'
                                    }`}>
                                        {formatTimestamp(message.timestamp)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </main>

                    <footer className="bg-white p-4 flex">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-1 p-2 border rounded"
                        />
                        <button 
                            onClick={handleSendMessage} 
                            className="ml-2 bg-green-500 text-white p-2 rounded"
                        >
                            Send
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;

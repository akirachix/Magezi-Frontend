import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import useChatMessages from '../../hooks/useChatMessages';
import { useScrollToBottom } from '../../hooks/useScrollToBottom';
import { formatTimestamp } from '../../utils/dateUtils';
import { Search, Send, User } from 'lucide-react';
import { useGetUsers } from '@/app/hooks/useGetUsers';
import UserCard from '@/app/hooks/usersCard/UserCard';

interface UserType {
    id: string;
    first_name: string;
    role: string;
}

const ChatRoom: React.FC = () => {
    const { messages, sendMessage, error: chatError } = useChatMessages();
    const { users, loading, error: usersError } = useGetUsers();

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
        const userName = getCookie('userName') as string;

        setCurrentUserRole(userRole as string);
        setCurrentUserName(userName);
    }, []);

    useEffect(() => {
        if (!loading && !usersError) {
            let filteredUsers: UserType[] = [];
            if (currentUserRole === 'lawyer') {
                filteredUsers = users.filter(user => user.role === 'buyer' || user.role === 'seller');
            } else if (currentUserRole === 'buyer') {
                filteredUsers = users.filter(user => user.role === 'seller');
            } else if (currentUserRole === 'seller') {
                filteredUsers = users.filter(user => user.role === 'buyer');
            }
            setAvailableUsers(filteredUsers);
        }
    }, [loading, usersError, users, currentUserRole]);

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '' || !selectedUser) {
            console.error('Cannot send message: either message is empty or no user selected');
            return;
        }

        try {
            // Send the message using the sendMessage function from the useChatMessages hook
            await sendMessage(inputMessage, selectedUser.id);
            setInputMessage('');

            // Simulated response (you might want to remove this in a real application)
            setTimeout(() => {
                const responseRole = currentUserRole === 'lawyer' ? selectedUser.role : currentUserRole;
                if (responseRole) {
                    const responseMessage = hardCodedMessages[responseRole][Math.floor(Math.random() * hardCodedMessages[responseRole].length)];
                    sendMessage(responseMessage, currentUserName || 'Unknown');
                }
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

    const filteredMessages = messages.filter((message: { sender: any; content: any; }) => {
        const sender = String(message.sender || '');
        const content = String(message.content || '');
        return sender.toLowerCase().includes(searchTerm.toLowerCase()) || content.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const startConversation = (user: UserType) => {
        setSelectedUser(user);
        console.log(`Starting conversation with ${user.first_name} (${user.role})`);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    if (usersError || chatError) {
        return <div className="flex justify-center items-center h-full">Error: {usersError?.message || chatError}</div>;
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
        <div className="flex flex-col md:flex-row bg-gray-100 font-jost h-screen">
            <div className="flex flex-col w-full md:w-1/4 bg-white border-r border-gray-200 p-4 shadow-md">
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search users..."
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                </div>
                <h2 className="font-semibold mt-4">{getUserListTitle()}</h2>
                <div className="flex-grow overflow-y-auto mt-2">
                    {availableUsers.length > 0 ? (
                        availableUsers.map((user) => (
                            <UserCard 
                                key={user.id} 
                                user={user} 
                                startConversation={() => startConversation(user)} 
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">No users available</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col flex-grow w-full">
                <header className="bg-white shadow-sm p-3 flex items-center border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-green-700 flex-1">
                        {selectedUser ? `Chat with ${selectedUser.first_name} (${selectedUser.role})` : 'Select a user to chat'}
                    </h1>
                    <User size={24} className="text-green-700" />
                </header>

                <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {filteredMessages.map((message) => (
                        <div key={message.id} ref={messagesEndRef} className={`flex ${message.sender === currentUserName ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-2 rounded-lg shadow-md mb-2 ${message.sender === currentUserName ? 'bg-green-600 text-white' : 'bg-gray-400 text-black'}`}>
                                <div className="text-sm">
                                    {message.sender} <span className="text-xs text-gray-600">{formatTimestamp(new Date(message.timestamp).getTime())}</span>
                                </div>
                                <div>{message.content}</div>
                            </div>
                        </div>
                    ))}
                </main>

                <footer className="p-4 bg-white border-t border-gray-200 flex items-center">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 p-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        <Send size={24} />
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ChatRoom;


















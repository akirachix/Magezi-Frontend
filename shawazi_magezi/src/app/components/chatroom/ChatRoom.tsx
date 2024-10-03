import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useScrollToBottom } from '../../hooks/useScrollToBottom';
import { formatTimestamp } from '../../utils/dateUtils';
import { Send, User } from 'lucide-react';
import { useGetUsers } from '@/app/hooks/useGetUsers';
import UserCard from '@/app/hooks/usersCard/UserCard';
import useChatMessages from '@/app/hooks/useChatMessages';
import InviteLawyerModal from '../InviteLawyerModal';

interface UserType {
    id: string;
    first_name: string;
    role: 'buyer' | 'seller' | 'lawyer';
}


const BASE_URL = process.env.BASE_URL;

const ChatRoom: React.FC = () => {
    const { users, loading, error: usersError } = useGetUsers();
    const [inputMessage, setInputMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [availableUsers, setAvailableUsers] = useState<UserType[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const messagesEndRef = useScrollToBottom<HTMLDivElement>();
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const [currentUserName, setCurrentUserName] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isInviteModalOpen, setInviteModalOpen] = useState(false); 

    const { messages, sendMessage } = useChatMessages(currentUserId || '', currentUserRole || '');

    useEffect(() => {
        const userRole = getCookie('userRole');
        const userName = getCookie('userName') as string;
        const userId = getCookie('userId') as string;

        setCurrentUserRole(userRole as string);
        setCurrentUserName(userName);
        setCurrentUserId(userId);
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
            setErrorMessage('Cannot send message: Message is empty or no user selected.');
            return;
        }

        setSendingMessage(true);
        setErrorMessage(null);

        try {
            await sendMessage(inputMessage, selectedUser.id);
            setInputMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
            setErrorMessage('Failed to send message. Please try again.');
        } finally {
            setSendingMessage(false);
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

    const handleInviteLawyer = () => {
        setInviteModalOpen(true);
    };

    const handleCloseModal = () => {
        setInviteModalOpen(false); 
    };

    const handleInviteSubmit = async (first_name: string, last_name: string, phone_number: string) => {
        try {
            if (!BASE_URL) {
                throw new Error('Base URL is not defined');
            }
            console.log(`Sending invitation to: ${BASE_URL}/api/send_invitation`);
            

            const response = await fetch(`${BASE_URL}/api/send_invitation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                                    },
                body: JSON.stringify({ first_name, last_name, phone_number }),
            });

            if (!response.ok) throw new Error('Failed to send invitation');
            alert('Invitation sent successfully!'); 
            handleCloseModal(); 

        }
         catch (error) {
            console.error('Error sending invitation:', error);
            alert('Failed to send invitation. Please try again.');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    if (usersError) {
        return <div className="flex justify-center items-center h-full">Error: {usersError.message}</div>;
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
                <header className="bg-white shadow-sm p-3 flex flex-col items-center border-b border-gray-200">
                    <User size={70} className="text-green-600 mb-2 w-30 h-30" />  {/* Larger user icon */}
                    <h1 className="text-xl font-semibold text-green-700">
                        {selectedUser ? ` ${selectedUser.first_name} (${selectedUser.role})` : 'Select a user to chat'}
                    </h1>
                </header>

                <main className="flex-grow overflow-y-auto p-4">
                    {filteredMessages.length > 0 ? (
                        filteredMessages.map((message, index) => (
                            <div key={index} className={`mb-2 ${message.sender === currentUserId ? 'text-right' : 'text-left'}`}>
                                <div className={`inline-block p-2 rounded ${message.sender === currentUserId ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    <p className="text-sm">
                                        {message.content}
                                    </p>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    {message.sender === currentUserId ? currentUserName : selectedUser?.first_name} • {formatTimestamp(message.timestamp)}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No messages yet. Start chatting!</p>
                    )}
                    <div ref={messagesEndRef}></div>
                </main>

                {errorMessage && (
                    <div className="bg-red-100 text-red-700 p-2 text-center">
                        {errorMessage}
                    </div>
                )}

                <footer className="bg-white p-4 border-t border-gray-200">
                    <div className="flex flex-col items-end mb-2">
                        <button
                            onClick={handleInviteLawyer}
                            className="bg-orange-500 hover:bg-green-700 hover:text-white text-white text-sm px-4 py-2 rounded flex items-center transition-all duration-300"
                        >
                            Invite Lawyer
                        </button>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message..."
                            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={sendingMessage}
                            className="bg-green-700 text-white p-2 rounded ml-2 hover:bg-green-600 transition-all duration-300"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </footer>
            </div>

            <InviteLawyerModal
                isOpen={isInviteModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleInviteSubmit}  
            />
        </div>
    );
};

export default ChatRoom;













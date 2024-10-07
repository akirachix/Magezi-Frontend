"use client";
import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useScrollToBottom } from '../hooks/useScrollToBottom';
import { formatTimestamp } from '../utils/dateUtils';
import { Send } from 'lucide-react';
import { useGetUsers } from '@/app/hooks/useGetUsers';
import UserCard from '@/app/hooks/usersCard/UserCard';
import useChatMessages from '@/app/hooks/useChatMessages';
import InviteLawyerModal from '../inviteLawyerModal/page';

interface UserType {
    id: string;
    first_name: string;
    role: 'buyer' | 'seller' | 'lawyer';
}

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
    const [inviteModalOpen, setInviteModalOpen] = useState(false);

    const { messages, sendMessage } = useChatMessages(currentUserId || '', currentUserRole || '');

    useEffect(() => {
        const userRole = getCookie('userRole') as string;
        const userName = getCookie('userName') as string;
        const userId = getCookie('userId') as string;

        setCurrentUserRole(userRole);
        setCurrentUserName(userName);
        setCurrentUserId(userId);
    }, []);

    useEffect(() => {
        if (!loading && !usersError) {
            const filteredUsers: UserType[] = users.filter(user => {
                if (currentUserRole === 'lawyer') {
                    return user.role === 'buyer' || user.role === 'seller';
                }
                if (currentUserRole === 'buyer') {
                    return user.role === 'seller';
                }
                if (currentUserRole === 'seller') {
                    return user.role === 'buyer';
                }
                return false;
            });
            setAvailableUsers(filteredUsers);
        }
    }, [loading, usersError, users, currentUserRole]);

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '' || !selectedUser) {
            setErrorMessage('Cannot send message: Message is empty or no user selected.');
            return;
        }

        setSendingMessage(true);
        setErrorMessage(null);

        try {
            const messageWithSender = `${currentUserName}: ${inputMessage}`;
            await sendMessage(messageWithSender, selectedUser.id);
            setInputMessage('');

            if (currentUserRole === 'buyer') {
                setTimeout(() => {
                    const simulatedReply = `Hi, welcome to Shawazi. We look forward to your support.`;
                    sendMessage(simulatedReply, selectedUser.id);
                }, 1000);
            }
        } catch {
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
    };

    const handleInviteLawyer = () => {
        setInviteModalOpen(true);
    };

    const handleCloseModal = () => {
        setInviteModalOpen(false);
    };

    const handleSubmitInvite = async (firstName: string, lastName: string, phoneNumber: string) => {
        const invitationLink = process.env.NEXT_PUBLIC_INVITE_LINK; 
        const invitationMessage = `Hi ${firstName}, you've been invited to join our platform! Here's the link: ${invitationLink}`;
        const invitationData = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            message: invitationMessage,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send_invitation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invitationData),
            });

            if (!response.ok) {
                throw new Error('Failed to send invitation');
            }

            const result = await response.json();
            alert(result.message || 'Invitation sent successfully!');
            handleCloseModal();
        } catch (error) {
            console.error('Error sending invitation:', error);
            alert('Failed to send invitation. Please try again.');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    if (usersError) {
        const errorMessage = typeof usersError === 'string' ? usersError : usersError.message;
        return <div className="flex justify-center items-center h-full">Error: {errorMessage}</div>;
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
            <div className="hidden md:flex flex-col w-full md:w-1/4 bg-white border-r border-gray-200 p-4 shadow-md">
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
                <div className="flex flex-col items-end mb-2">
                    <button
                        onClick={handleInviteLawyer}
                        className="bg-green-700 text-white p-2 rounded hover:bg-orange-500"
                    >
                        Invite Lawyer
                    </button>
                </div>
            </div>

            <div className="flex flex-col w-full md:w-3/4 p-4">
                <div className="flex-grow overflow-y-auto p-2 border border-gray-200 rounded-md">
                    {filteredMessages.length > 0 ? (
                        filteredMessages.map((message, index) => (
                            <div key={index} className={`my-2 ${message.sender === currentUserName ? 'text-right' : 'text-left'}`}>
                                <div className="font-semibold">{message.sender}</div>
                                <div className="text-sm text-gray-600">
                                {formatTimestamp(Number(message.timestamp))}
                                </div>
                                <div>{message.content}</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No messages yet</p>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                <div className="flex mt-4">
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
                        className="ml-2 bg-green-700 text-white p-2 rounded hover:bg-orange-500"
                        disabled={sendingMessage}
                    >
                        <Send />
                    </button>
                </div>
            </div>

            {inviteModalOpen && (
                <InviteLawyerModal 
                    onClose={handleCloseModal} 
                    onSubmit={handleSubmitInvite} 
                />
            )}
        </div>
    );
};

export default ChatRoom;






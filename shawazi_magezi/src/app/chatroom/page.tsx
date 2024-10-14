"use client";
import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useScrollToBottom } from "../hooks/useScrollToBottom";
import { Send, ChevronDown } from "lucide-react";
import { useGetUsers } from "@/app/hooks/useGetUsers";
import UserCard from "@/app/hooks/usersCard/UserCard";
import useChatMessages from "@/app/hooks/useChatMessages";
import InviteLawyerModal from "../components/InviteLawyerModal";
import { UserDatas } from "../utils/types";
import SideBar from "../components/SideBarPwa";

type GetUserType = {
    id: string;
    first_name: string;
    role: "buyer" | "seller" | "lawyer";
};

interface MessageType {
    content: string;
    sender: string;
    receiverId: string;
    timestamp: number;
}

interface ChatMessagesHook {
    messages: MessageType[];
    sendMessage: (message: MessageType, receiverId: string) => Promise<void>;
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}

const ChatRoom: React.FC = () => {
    const { users, loading } = useGetUsers();
    const [inputMessage, setInputMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [availableUsers, setAvailableUsers] = useState<GetUserType[]>([]);
    const [selectedUser, setSelectedUser] = useState<GetUserType | null>(null);
    const messagesEndRef = useScrollToBottom<HTMLDivElement>();
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const [currentUserName, setCurrentUserName] = useState<string | null>(null);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { messages, sendMessage, setMessages } = useChatMessages(
        currentUserName || "",
        currentUserRole || ""
    ) as unknown as ChatMessagesHook;

    useEffect(() => {
        const userRole = getCookie("userRole") as string;
        const userName = getCookie("userName") as string;
        setCurrentUserRole(userRole);
        setCurrentUserName(userName);
    }, []);

    useEffect(() => {
        if (!loading && users) {
            const filteredUsers: GetUserType[] = users.filter((user) => {
                if (currentUserRole === "lawyer") {
                    return user.role === "buyer" || user.role === "seller";
                }
                if (currentUserRole === "buyer") {
                    return user.role === "seller";
                }
                if (currentUserRole === "seller") {
                    return user.role === "buyer";
                }
                return false;
            });
            setAvailableUsers(filteredUsers);
        }
    }, [loading, users, currentUserRole]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (inputMessage.trim() === "" || !selectedUser || sendingMessage) {
            setErrorMessage("Cannot send message: Message is empty or no user selected.");
            return;
        }

        const messageWithSender: MessageType = {
            content: inputMessage.trim(),
            sender: currentUserName || "",
            receiverId: selectedUser.id,
            timestamp: Date.now()
        };

        setSendingMessage(true);
        setErrorMessage(null); 
        
        try {
            await sendMessage(messageWithSender, selectedUser.id);
            setMessages((prevMessages: MessageType[]) => [...prevMessages, messageWithSender]);
            setInputMessage(""); 
            setErrorMessage(null); 
        } catch (error: unknown) {
            console.error(error); // Log the error for debugging
            if (error instanceof Error) {
                setErrorMessage(error.message); // Use the error message if it's an instance of Error
            } else {
                setErrorMessage("Failed to send message. Please try again.");
            }
        } finally {
            setSendingMessage(false);
        }
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            await handleSendMessage(e);
        }
    };

    const filteredMessages = messages.filter((message) => {
        const sender = String(message.sender || "");
        const content = String(message.content || "");
        return (
            sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
            content.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const startConversation = (user: GetUserType) => {
        setSelectedUser(user);
        setIsDropdownOpen(false);
    };

    const handleInviteLawyer = () => {
        setInviteModalOpen(true);
    };

    const handleCloseModal = () => {
        setInviteModalOpen(false);
    };

    const handleSubmitInvite = async (
        firstName: string,
        lastName: string,
        invitedBy: string,
        phoneNumber: string
    ) => {
        const invitationLink = process.env.NEXT_PUBLIC_BASE_URL;
        const invitationMessage = `Hi ${firstName}, you've been invited to join our platform! Here's the link: ${invitationLink}`;
        const invitationData = {
            first_name: firstName,
            last_name: lastName,
            invited_by: invitedBy,
            phone_number: phoneNumber,
            message: invitationMessage,
        };

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/send_invitation`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(invitationData),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to send invitation");
            }
            const result = await response.json();
            alert(result.message || "Invitation sent successfully!");
            handleCloseModal();
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Something went wrong');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">Loading...</div>
        );
    }

    const getUserListTitle = () => {
        switch (currentUserRole) {
            case "buyer":
                return "Available Sellers";
            case "seller":
                return "Available Buyers";
            case "lawyer":
                return "Available Users";
            default:
                return "Users";
        }
    };

    const parseMessageContent = (content: string | { content: string }): string => {
        if (typeof content === 'string') {
            try {
                const parsed = JSON.parse(content);
                return parsed.content || content;
            } catch {
                return content;
            }
        }
        return content.content || JSON.stringify(content);
    };

    const formatTimestamp = (timestamp: number): string => {
        const date = new Date(timestamp);
        return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`; // Format as HH:mm
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 font-jost h-screen">
            <SideBar userRole=""/>
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
                                user={user as Partial<UserDatas>}
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
                <div className="md:hidden mb-4">
                    <div
                        className="bg-white p-2 rounded border border-gray-300 flex justify-between items-center cursor-pointer mb-2"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span>{selectedUser ? selectedUser.first_name : "Select a user"}</span>
                        <ChevronDown />
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded shadow-lg">
                            {availableUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => startConversation(user)}
                                >
                                    {user.first_name}
                                </div>
                            ))}
                        </div>
                    )}
                    <button
                        onClick={handleInviteLawyer}
                        className="bg-green-700 text-white p-2 rounded hover:bg-orange-500 w-full"
                    >
                        Invite Lawyer
                    </button>
                </div>

                <div className="hidden md:block">
                    <h2 className="text-xl font-semibold mb-2">
                        {selectedUser
                            ? `Conversation with ${selectedUser.first_name}`
                            : "No user selected"}
                    </h2>
                </div>

                <div className="flex-grow overflow-y-auto mb-4" ref={messagesEndRef}>
                    {filteredMessages.length > 0 ? (
                        filteredMessages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-2 p-2 rounded-lg text-sm max-w-[75%] ${
                                    message.sender === currentUserName
                                        ? "bg-green-200 self-end"
                                        : "bg-gray-300 self-start"
                                }`}
                            >
                                <span className="font-semibold">
                                    {message.sender === currentUserName
                                        ? "You"
                                        : selectedUser?.first_name}
                                    :
                                </span>{" "}
                                {parseMessageContent(message.content)}
                                <div className="text-xs text-gray-500">
                                    {formatTimestamp(message.timestamp)} {/* Display timestamp */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No messages yet</p>
                    )}
                </div>

                <form onSubmit={handleSendMessage} className="flex items-center">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                    <button
                        type="submit"
                        className="bg-green-700 text-white p-2 rounded-r hover:bg-green-800"
                    >
                        <Send />
                    </button>
                </form>
                {errorMessage && (
                    <div className="text-red-500 mt-2">{errorMessage}</div>
                )}
            </div>

            <InviteLawyerModal
                isOpen={inviteModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitInvite}
            />
        </div>
    );
};

export default ChatRoom;
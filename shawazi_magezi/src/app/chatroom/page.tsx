"use client";
import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useScrollToBottom } from "../hooks/useScrollToBottom";
import { Send, ChevronDown, Menu } from "lucide-react";
import { useGetUsers } from "@/app/hooks/useGetUsers";
import UserCard from "@/app/hooks/usersCard/UserCard";
import useChatMessages from "@/app/hooks/useChatMessages";
import { UserDatas } from "../utils/types";
import { Toaster, toast } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import InviteLawyerModal from "../(lawyer)/lawyer/components/Invite-lawyer";
import SideBar from "../components/Sidebarpwa";

type GetUserType = {
  id: string;
  first_name: string;
  role: "buyer" | "seller" | "lawyer";
};

type MessageType = {
  sender: string;
  content: string;
  timestamp: number;
  recipientId: string;
};

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const ChatRoom: React.FC = () => {
  const { users, loading, error: usersError } = useGetUsers();
  const [inputMessage, setInputMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [availableUsers, setAvailableUsers] = useState<GetUserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<GetUserType | null>(null);
  const messagesEndRef = useScrollToBottom<HTMLDivElement>();
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [sendingMessage, setSendingMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserListVisible, setIsUserListVisible] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { sendMessage } = useChatMessages(
    currentUserId || "",
    currentUserRole || ""
  );
  const [localMessages, setLocalMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const userRole = getCookie("userRole") as string;
    const userName = getCookie("userName") as string;
    const userId = getCookie("userId") as string;
    setCurrentUserRole(userRole);
    setCurrentUserName(userName);
    setCurrentUserId(userId);
  }, []);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setLocalMessages(JSON.parse(storedMessages));
    }
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


  const handleSendMessage = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (inputMessage.trim() === "" || !selectedUser || sendingMessage) {
      setErrorMessage(
        "Cannot send message: Message is empty or no user selected."
      );
      return;
    }
    setSendingMessage(true);
    setErrorMessage(null);
    try {
      const timestamp = Date.now();
      const messageWithTimestamp: MessageType = {
        sender: currentUserName!,
        content: inputMessage,
        timestamp,
        recipientId: selectedUser.id,
      };

      const updatedMessages = [...localMessages, messageWithTimestamp];
      setLocalMessages(updatedMessages);
      localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));

      await sendMessage(inputMessage, selectedUser.id);
      setInputMessage("");
    } catch {
      setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const filteredMessages = selectedUser
    ? localMessages.filter((message: MessageType) => {
        return (
          (message.sender === selectedUser.id ||
            message.recipientId === selectedUser.id) &&
          (message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.content.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      })
    : [];

  const startConversation = (user: GetUserType) => {
    setSelectedUser(user);
    setIsUserListVisible(false);
  };

  const handleInviteLawyerClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInviteLawyerSubmit = async (
    firstName: string,
    lastName: string,
    invitedBy: string,
    phoneNumber: string
  ) => {
    const invitationData = {
      first_name: firstName,
      last_name: lastName,
      invited_by: invitedBy,
      phone_number: phoneNumber,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send_invitation/`,
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

      toast.success("Invitation sent successfully!"); 
      handleCloseModal();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (usersError) {
    const errorMessage =
      typeof usersError === "string" ? usersError : usersError.message;
    return (
      <div className="flex justify-center items-center h-full">
        Error: {errorMessage}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 font-jost">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-1/4 md:w-1/5 bg-white border-r border-gray-200 shadow-md hidden lg:block">
        <SideBar userRole={""} />
      </div>

      <div className="lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-4 text-gray-500 focus:outline-none focus:text-gray-700"
        >
          <Menu size={24} />
        </button>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-white">
            <div className="p-4">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="mb-4 text-gray-500 focus:outline-none focus:text-gray-700"
              >
                Close
              </button>
              <SideBar userRole={""} />
            </div>
          </div>
        )}
      </div>

      <div className="flex-grow flex flex-col md:flex-row">
        <div className={`w-full md:w-1/4 lg:w-1/3 xl:w-1/4 bg-white p-4 border-r border-gray-200 shadow-md hidden lg:block`}>
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="w-full border-2 p-2 rounded-lg border-hover"
            />
          </div>
          <h2 className="font-semibold mt-4">{getUserListTitle()}</h2>
          <div className="flex-grow overflow-y-auto mt-2 bg-[#c5daa6]" style={{ maxHeight: '60vh' }}>
            {availableUsers.length > 0 ? (
              availableUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user as Partial<UserDatas>}
                  startConversation={() => startConversation(user)}
                />
              ))
            ) : (
              <p className="text-gray-600">No users available</p>
            )}
          </div>
        </div>

        <div className="lg:hidden w-full p-4">
          <div className="relative">
            <button
              onClick={() => setIsUserListVisible(!isUserListVisible)}
              className="flex items-center justify-between w-full bg-white border border-gray-300 p-2 rounded-md"
            >
              <span>{selectedUser ? selectedUser.first_name : getUserListTitle()}</span>
              <ChevronDown className={`transform transition-transform ${isUserListVisible ? "rotate-180" : ""}`} />
            </button>
            {isUserListVisible && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {availableUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      startConversation(user);
                      setIsUserListVisible(false);
                    }}
                  >
                    <UserCard
                      user={user as Partial<UserDatas>}
                      startConversation={() => {}}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="chat-area flex flex-grow flex-col p-4 bg-white md:w-3/4 lg:w-3/4">
          <div className="flex-grow overflow-y-auto bg-white border p-4 rounded shadow-md chat-messages">
            <h2 className="font-semibold text-2xl mt-12 text-primary ml-0">
              Chat with {selectedUser ? selectedUser.first_name : "..."}
            </h2>
            {filteredMessages.map((message, index) => (
              <div key={index} className={`my-2 ${message.sender === currentUserName ? "text-right" : "text-left"}`}>
                <div className="flex items-center justify-end mr-4">
                  <div className="bg-[#D0F1A1] p-7 rounded-lg shadow-md flex items-center">
                    <CgProfile className="text-primary mr-2 text-2xl" />
                    <span className="font-semibold text-xl">{message.sender}:</span>
                    <span className="text-xl ml-2">{message.content}</span>
                  </div>
                  <div className="text-gray-500 text-xs ml-2">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-4">
            <form onSubmit={handleSendMessage} className="flex w-full">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="border-hover border-2 p-2 rounded-l w-3/4"
              />
              <button
                type="submit"
                className="bg-hover text-white hover:bg-green-600 p-2 rounded-r w-1/4"
              >
                <Send />
              </button>
            </form>
            <button
              className="w-full mt-2 bg-hover text-white hover:bg-green-600 p-2 rounded"
              onClick={handleInviteLawyerClick}
            >
              Invite Lawyer
            </button>
          </div>

          {errorMessage && <div className="text-red-600 mt-2">{errorMessage}</div>}
        </div>
      </div>

      <InviteLawyerModal open={isModalOpen} onClose={handleCloseModal} onSubmit={handleInviteLawyerSubmit} />
    </div>
  );
};

export default ChatRoom;
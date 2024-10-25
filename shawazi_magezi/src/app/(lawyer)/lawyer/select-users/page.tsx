"use client";
import React, { useEffect, useState } from "react";
import { Search, UserPlus, ArrowLeft } from "lucide-react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import LawyerSidebar from "../components/lawyerSidebar";

// Define types for better type safety
interface User {
  id: string;
  username: string;
  email?: string;
  role: 'lawyer' | 'buyer' | 'seller';
  created_at?: string;
}

interface UserData {
  username: string;
  userPhone: string;
  user_role: string;
  isLoggedIn: boolean;
  lawyer_viewed: boolean;
  csrftoken: string;
}

interface Users {
  lawyers: User[];
  buyers: User[];
  sellers: User[];
}

const SelectUsersPage = () => {
  const [userData, setUserData] = useState<UserData>({
    username: "",
    userPhone: "",
    user_role: "",
    isLoggedIn: false,
    lawyer_viewed: false,
    csrftoken: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<Users>({
    lawyers: [],
    buyers: [],
    sellers: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = () => {
      const username = getCookie("userName") || "";
      const userPhone = getCookie("userPhone") || "";
      const user_role = getCookie("user_role") || "";
      const isLoggedIn = getCookie("isLoggedIn") === "true";
      const lawyer_viewed = getCookie("lawyer_viewed") === "true";
      const csrftoken = getCookie("csrftoken") || "";

      setUserData({
        username,
        userPhone,
        user_role,
        isLoggedIn,
        lawyer_viewed,
        csrftoken,
      });
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        // First, try to fetch from your API route
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('token')}`,
            'X-CSRFToken': getCookie('csrftoken')
          },
          credentials: 'include' // Important for cookies
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server');
        }

        // Type guard and data validation
        const isValidUser = (user: any): user is User => {
          return user && 
                 typeof user.id === 'string' && 
                 typeof user.username === 'string' && 
                 (user.email === undefined || typeof user.email === 'string') &&
                 ['lawyer', 'buyer', 'seller'].includes(user.role);
        };

        // Filter out invalid user data
        const validData = data.filter(isValidUser);
        
        // Categorize users based on their roles
        const categorizedUsers = {
          lawyers: validData.filter(user => user.role === 'lawyer'),
          buyers: validData.filter(user => user.role === 'buyer'),
          sellers: validData.filter(user => user.role === 'seller')
        };

        setUsers(categorizedUsers);
        console.log('Fetched users:', categorizedUsers); // For debugging
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once on mount

  // Safe search function
  const safeSearch = (text: string | undefined, searchTerm: string): boolean => {
    if (!text) return false;
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredUsers = {
    lawyers: users.lawyers.filter(user =>
      safeSearch(user.username, searchTerm) ||
      safeSearch(user.email, searchTerm)
    ),
    buyers: users.buyers.filter(user =>
      safeSearch(user.username, searchTerm) ||
      safeSearch(user.email, searchTerm)
    ),
    sellers: users.sellers.filter(user =>
      safeSearch(user.username, searchTerm) ||
      safeSearch(user.email, searchTerm)
    )
  };

  const handleSelectUser = (user: User) => {
    if (!selectedUsers.find(selected => selected.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter(user => user.id !== userId));
  };

  // Debug output
  useEffect(() => {
    console.log('Current users state:', users);
  }, [users]);

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        <div className="w-full lg:w-[20%] sticky top-0 z-10">
          <LawyerSidebar />
        </div>
        <div className="flex flex-col flex-grow p-4 sm:p-6 md:p-8 w-full lg:w-[80%] items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-white">
        <div className="w-full lg:w-[20%] sticky top-0 z-10">
          <LawyerSidebar />
        </div>
        <div className="flex flex-col flex-grow p-4 sm:p-6 md:p-8 w-full lg:w-[80%]">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-red-600 hover:text-red-800 underline"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <div className="w-full lg:w-[20%] sticky top-0 z-10">
        <LawyerSidebar />
      </div>

      <div className="flex flex-col flex-grow p-4 sm:p-6 md:p-8 w-full lg:w-[80%]">
        <Link 
          href="/lawyer/draft-contract" 
          className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Draft Contract
        </Link>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-8">
          Select Users for Agreement
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Selected Users</h2>
          <div className="flex flex-wrap gap-3">
            {selectedUsers.length === 0 ? (
              <p className="text-gray-500">No users selected yet</p>
            ) : (
              selectedUsers.map(user => (
                <div 
                  key={user.id}
                  className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2"
                >
                  <span>{user.username} ({user.role})</span>
                  <button 
                    onClick={() => handleRemoveUser(user.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {['lawyers', 'buyers', 'sellers'].map(role => (
          <div key={role} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 capitalize">{role}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredUsers[role as keyof Users].length === 0 ? (
                <p className="text-gray-500 col-span-full">No {role} found</p>
              ) : (
                filteredUsers[role as keyof Users].map(user => (
                  <div
                    key={user.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{user.username}</h3>
                        {user.email && <p className="text-sm text-gray-600">{user.email}</p>}
                        <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                      </div>
                      <button
                        onClick={() => handleSelectUser(user)}
                        className="text-blue-600 hover:text-blue-800"
                        disabled={selectedUsers.some(selected => selected.id === user.id)}
                      >
                        <UserPlus size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}

        <div className="mt-8 flex justify-center">
          <Link 
            href={selectedUsers.length > 0 ? "/lawyer/agreements" : "#"}
            className={`w-[70%] ${selectedUsers.length === 0 ? 'pointer-events-none opacity-50' : ''}`}
          >
            <button 
              className="bg-foreground text-white w-full py-2 rounded-lg hover:bg-white hover:text-foreground hover:border border-foreground transition duration-300 text-[18px] md:text-[20px] lg:text-[22px]"
              disabled={selectedUsers.length === 0}
            >
              Continue to Agreement
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectUsersPage;







"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, Settings, Shield, FileText } from "lucide-react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Link from "next/link";
import LawyerSidebar from "../components/lawyerSidebar";
import { Card, CardContent } from "@/app/(admin)/admin/components/Ui";


const WelcomeSection = () => {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    userPhone: "",
    user_role: "",
    isLoggedIn: false,
    lawyer_viewed: false,
    csrftoken: "",
    inviter: "",
  });
  const [buyers, setBuyers] = useState<{ id: string; name: string }[]>([]);
  const [sellers, setSellers] = useState<{ id: string; name: string }[]>([]);
  const [agreements, setAgreements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = () => {
    const username = getCookie("userName") || "";
    const userPhone = getCookie("userPhone") || "";
    const user_role = getCookie("user_role") || "";
    const isLoggedIn = getCookie("isLoggedIn") === "true";
    const lawyer_viewed = getCookie("lawyer_viewed") === "true";
    const csrftoken = getCookie("csrftoken") || "";
    const inviter = getCookie("inviter") || "";
    
    setUserData({
      id: getCookie("userId") || "",
      username,
      userPhone,
      user_role,
      isLoggedIn,
      lawyer_viewed,
      csrftoken,
      inviter,
    });
  };

  const fetchUsers = async () => {
    try {
      const usersResponse = await fetch('/api/users');
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        const buyersList = usersData.filter((user: { role: string; }) => user.role === 'buyer');
        const sellersList = usersData.filter((user: { role: string; }) => user.role === 'seller');
        setBuyers(buyersList);
        setSellers(sellersList);
      } else {
        const errorData = await usersResponse.json();
        console.error(errorData.message || 'Failed to fetch users.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    const fetchAgreements = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/agreements?userId=${userData.id}`);
        if (response.ok) {
          const data = await response.json();
          setAgreements(data);
        }
      } catch (error) {
        console.error('Error fetching agreements:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (userData.id) {
      fetchAgreements();
    }
  }, [userData.id]);

  useEffect(() => {
    fetchUserData();
    fetchUsers();
  }, []);

  const renderAgreementsCard = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse bg-gray-100 h-full rounded-md p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      );
    }


      return (
        <div className="h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Agreements</h3>
            <span className="text-sm text-gray-600">
              Total: {agreements.length}
            </span>
          </div>

          {agreements.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6">
              <FileText className="text-gray-400 mb-2" size={32} />
              <p className="text-gray-600 text-center">No agreements found yet.</p>
              <p className="text-gray-500 text-sm text-center mt-1">
                Click "Start Agreement Creation" below to create your first agreement.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {agreements.slice(0, 3).map((agreement, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm">
                    {agreement.title || `Agreement #${agreement.id}`}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(agreement.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen  bg-white">
      <div className="w-full lg:w-[20%] sticky top-0 z-10">
        <LawyerSidebar />
      </div>
      <div className="flex flex-col flex-grow mt-10 p-6 text-center w-full lg:w-[80%]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl mr-14   font-semibold text-gray-800 mt-4 mb-6">
          Welcome {userData.username || "to The Shawazi Application"}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 ml-[14%] mb-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Available Users</h3>
              <div className="text-sm text-gray-600">
                <p>Buyers: {buyers.length}</p>
                <p>Sellers: {sellers.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Invitation Info</h3>
              <p className="text-sm text-gray-600">
                Invited By: {userData.inviter || "Unknown"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row mt-14 items-center lg:items-start gap-8 justify-center">
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/media/low.png"
              alt="Legal scales and gavel"
              width={700}
              height={400}
              className="object-contain w-full max-w-sm lg:max-w-lg"
              priority
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <CheckCircle className="text-black" size={45} />
              <span className="text-xl font-semibold text-gray-800">Transparency</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <Settings className="text-black" size={45} />
              <span className="text-xl font-semibold text-gray-800">Verify Transactions</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <Shield className="text-black" size={45} />
              <span className="text-xl font-semibold text-gray-800">Management</span>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 flex justify-center px-4 mr-[15%]">
          <Link href="/lawyer/link-to-join" className="block w-full md:w-[80%] lg:w-[70%]">
            <button className="bg-foreground text-white w-full py-2.5 sm:py-3 rounded-lg
                      hover:bg-primary hover:text-white hover:border border-foreground
                      transition duration-300 text-base sm:text-lg md:text-xl lg:text-[22px]">
              Start Agreement Creation
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
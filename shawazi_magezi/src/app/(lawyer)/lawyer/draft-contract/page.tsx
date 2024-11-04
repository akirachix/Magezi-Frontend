"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, Settings, Shield, Plus, Users, FileText } from "lucide-react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Link from "next/link";
import LawyerSidebar from "../components/lawyerSidebar";

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

  const useData = () => {
    useEffect(() => {
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

        // Set hasAgreements to false by default for new users
        setHasAgreements(false);
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

      const fetchAgreements = async () => {
        try {
          const agreementsResponse = await fetch(`/api/agreements?userId=${userData.id}`);
          if (agreementsResponse.ok) {
            const agreementsData = await agreementsResponse.json();
            setAgreements(agreementsData);
          } else {
            console.error('Failed to fetch agreements.');
          }
        } catch (error) {
          console.error('Error fetching agreements:', error);
        }
      };

      fetchUserData();
      fetchUsers();
      if (userData.id) {
        fetchAgreements();
      }
    }, [userData.id]);

    return userData;
  };

  const currentUserData = useData();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <div className="w-full lg:w-[20%] sticky top-0 z-10">
        <LawyerSidebar />
      </div>
      <div className="flex flex-col flex-grow mt-10 p-6 text-center w-full lg:w-[80%]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mt-4 mb-6">
          Welcome {userData.username || "to The Shawazi Application"}
        </h1>

        {/* User Stats Section */}
        <div className="flex flex-col lg:flex-row justify-center gap-4 mb-6">
          {/* Available Buyers and Sellers Section */}
          <div className="border border-gray-300 rounded-md p-2 flex-1">
            <div className="text-sm text-gray-600">
              Available Buyers: {buyers.length} | Available Sellers: {sellers.length}
            </div>
          </div>

          {/* Agreements Section */}
          <div className="border border-gray-300 rounded-md p-2 flex-1">
            <div className="text-sm text-gray-600">
              {agreements.length > 0 ?
                `Agreements Count: ${agreements.length}` :
                "No agreements found."
              }
            </div>
          </div>

          {/* Invited By Section */}
          <div className="border border-gray-300 rounded-md p-2 flex-1">
            <div className="text-sm text-gray-600">
              Invited By: {userData.inviter || "Unknown"}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row mt-6 items-center lg:items-start gap-8 justify-center">
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

        <div className="mt-8 sm:mt-10 flex justify-center px-4">
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


















// "use client";
// import React, { useEffect, useState } from "react";
// import { CheckCircle, Settings, Shield } from "lucide-react";
// import Image from "next/image";
// import { getCookie } from "cookies-next";
// import Link from "next/link";
// import LawyerSidebar from "../components/lawyerSidebar";

// const WelcomeSection = () => {
//   const [userData, setUserData] = useState({
//     id: "",
//     username: "",
//     userPhone: "",
//     user_role: "",
//     isLoggedIn: false,
//     lawyer_viewed: false,
//     csrftoken: "",
//     inviter: "",
//   });

//   const [buyers, setBuyers] = useState<{ id: string; name: string }[]>([]);
//   const [sellers, setSellers] = useState<{ id: string; name: string }[]>([]);
//   const [agreements, setAgreements] = useState<any[]>([]);

//   const useData = () => {
//     useEffect(() => {
//       const fetchUserData = () => {
//         const username = getCookie("userName") || "";
//         const userPhone = getCookie("userPhone") || "";
//         const user_role = getCookie("user_role") || "";
//         const isLoggedIn = getCookie("isLoggedIn") === "true";
//         const lawyer_viewed = getCookie("lawyer_viewed") === "true";
//         const csrftoken = getCookie("csrftoken") || "";
//         const inviter = getCookie("inviter") || "";

//         setUserData({
//           id: getCookie("userId") || "",
//           username,
//           userPhone,
//           user_role,
//           isLoggedIn,
//           lawyer_viewed,
//           csrftoken,
//           inviter,
//         });
//       };

//       const fetchUsers = async () => {
//         try {
//           const usersResponse = await fetch('/api/users');
//           if (usersResponse.ok) {
//             const usersData = await usersResponse.json();
//             const buyersList = usersData.filter((user: { role: string; }) => user.role === 'buyer');
//             const sellersList = usersData.filter((user: { role: string; }) => user.role === 'seller');
//             setBuyers(buyersList);
//             setSellers(sellersList);
//           } else {
//             const errorData = await usersResponse.json();
//             console.error(errorData.message || 'Failed to fetch users.');
//           }
//         } catch (error) {
//           console.error('Error fetching users:', error);
//         }
//       };

//       const fetchAgreements = async () => {
//         try {
//           const agreementsResponse = await fetch(`/api/agreements?userId=${userData.id}`);
//           if (agreementsResponse.ok) {
//             const agreementsData = await agreementsResponse.json();
//             setAgreements(agreementsData);
//           } else {
//             console.error('Failed to fetch agreements.');
//           }
//         } catch (error) {
//           console.error('Error fetching agreements:', error);
//         }
//       };

//       fetchUserData();
//       fetchUsers();
//       if (userData.id) {
//         fetchAgreements();
//       }
//     }, [userData.id]);

//     return userData;
//   };

//   const currentUserData = useData();

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-white">
//       <div className="w-full lg:w-[20%] sticky top-0 z-10">
//         <LawyerSidebar />
//       </div>
//       <div className="flex flex-col flex-grow mt-10 p-6 text-center w-full lg:w-[80%]">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mt-4 mb-6">
//           Welcome {userData.username || "to The Shawazi Application"}
//         </h1>

//         {/* User Stats Section */}
//         <div className="flex flex-col lg:flex-row justify-center gap-4 mb-6">
//           {/* Available Buyers and Sellers Section */}
//           <div className="border border-gray-300 rounded-md p-2 flex-1">
//             <div className="text-sm text-gray-600">
//               Available Buyers: {buyers.length} | Available Sellers: {sellers.length}
//             </div>
//           </div>

//           {/* Agreements Section */}
//           <div className="border border-gray-300 rounded-md p-2 flex-1">
//             <div className="text-sm text-gray-600">
//               {agreements.length > 0 ?
//                 `Agreements Count: ${agreements.length}` :
//                 "No agreements found."
//               }
//             </div>
//           </div>

//           {/* Invited By Section */}
//           <div className="border border-gray-300 rounded-md p-2 flex-1">
//             <div className="text-sm text-gray-600">
//               Invited By: {userData.inviter || "Unknown"}
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row mt-6 items-center lg:items-start gap-8 justify-center">
//           <div className="w-full lg:w-1/2 flex justify-center">
//             <Image
//               src="/media/low.png"
//               alt="Legal scales and gavel"
//               width={700}
//               height={400}
//               className="object-contain w-full max-w-sm lg:max-w-lg"
//               priority
//             />
//           </div>
          
//           <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8">
//             <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
//               <CheckCircle className="text-black" size={45} />
//               <span className="text-xl font-semibold text-gray-800">Transparency</span>
//             </div>
//             <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
//               <Settings className="text-black" size={45} />
//               <span className="text-xl font-semibold text-gray-800">Verify Transactions</span>
//             </div>
//             <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
//               <Shield className="text-black" size={45} />
//               <span className="text-xl font-semibold text-gray-800">Management</span>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 sm:mt-10 flex justify-center px-4">
//           <Link href="/lawyer/link-to-join" className="w-[70%]">
//             <button className="bg-foreground text-white w-full py-2 rounded-lg hover:bg-white hover:text-foreground hover:border border-foreground transition duration-300 text-[18px] md:text-[20px] lg:text-[22px]">
//               Start Agreement Creation
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeSection;









// "use client";
// import React, { useEffect, useState } from "react";
// import { CheckCircle, Settings, Shield } from "lucide-react";
// import Image from "next/image";
// import { getCookie } from "cookies-next";
// import Link from "next/link";
// import LawyerSidebar from "../components/lawyerSidebar";

// const WelcomeSection = () => {
//   const [userData, setUserData] = useState({
//     id: "", // Add user ID
//     username: "",
//     userPhone: "",
//     user_role: "",
//     isLoggedIn: false,
//     lawyer_viewed: false,
//     csrftoken: "",
//     inviter: "", // Add inviter name or ID
//   });

//   const [buyers, setBuyers] = useState<{ id: string; name: string }[]>([]);
//   const [sellers, setSellers] = useState<{ id: string; name: string }[]>([]);
//   const [agreements, setAgreements] = useState<any[]>([]);

//   const useData = () => {
//     useEffect(() => {
//       const fetchUserData = async () => {
//         const username = getCookie("userName") || "";
//         const userPhone = getCookie("userPhone") || "";
//         const user_role = getCookie("user_role") || "";
//         const isLoggedIn = getCookie("isLoggedIn") === "true";
//         const lawyer_viewed = getCookie("lawyer_viewed") === "true";
//         const csrftoken = getCookie("csrftoken") || "";
//         const inviter = getCookie("inviter") || ""; // Assuming inviter info is stored in cookies

//         // Optionally: Fetch user data from the API for more reliable details
//         // const response = await fetch('/api/user/current');
//         // const userDetails = await response.json();
//         // setUserData(userDetails);

//         setUserData({
//           id: getCookie("userId") || "", // Assuming user ID is stored in cookies
//           username,
//           userPhone,
//           user_role,
//           isLoggedIn,
//           lawyer_viewed,
//           csrftoken,
//           inviter, // Set inviter info
//         });
//       };

//       const fetchUsers = async () => {
//         try {
//           const usersResponse = await fetch('/api/users');
//           if (usersResponse.ok) {
//             const usersData = await usersResponse.json();
//             const buyersList = usersData.filter((user: { role: string; }) => user.role === 'buyer');
//             const sellersList = usersData.filter((user: { role: string; }) => user.role === 'seller');
//             setBuyers(buyersList);
//             setSellers(sellersList);
//           } else {
//             const errorData = await usersResponse.json();
//             console.error(errorData.message || 'Failed to fetch users.');
//           }
//         } catch (error) {
//           console.error('Error fetching users:', error);
//         }
//       };

//       // New fetch function for agreements related to the current user
//       const fetchAgreements = async () => {
//         try {
//           const agreementsResponse = await fetch(`/api/agreements?userId=${userData.id}`);
//           if (agreementsResponse.ok) {
//             const agreementsData = await agreementsResponse.json();
//             setAgreements(agreementsData);
//           } else {
//             console.error('Failed to fetch agreements.');
//           }
//         } catch (error) {
//           console.error('Error fetching agreements:', error);
//         }
//       };

//       fetchUserData();
//       fetchUsers();
//       // Call fetchAgreements after userData is set with an ID
//       if (userData.id) {
//         fetchAgreements();
//       }
//     }, [userData.id]); // Dependency on userData.id to trigger fetching agreements when user ID is available

//     return userData;
//   };

//   useData();

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-white">
//       <div className="w-full lg:w-[20%] sticky top-0 z-10">
//         <LawyerSidebar />
//       </div>
//       <div className="flex flex-col flex-grow mt-10 p-4 sm:p-6 md:p-8 text-center w-full lg:w-[80%]">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold ml-[-10%] text-gray-800 mt-4 sm:mt-6 md:mt-10 mb-4 sm:mb-6 md:mb-8 px-2">
//           Welcome to The Shawazi Application
//         </h1>
//         <div className="text-sm text-gray-600 mb-4">
//           Available Buyers: {buyers.length} | Available Sellers: {sellers.length}
//         </div>
        
//         {/* Display agreements count or no agreement message */}
//         <div className="text-sm text-gray-600 mb-4">
//           {agreements.length > 0 ? 
//             `Agreements Count: ${agreements.length}` : 
//             "No agreements found."
//           }
//         </div>

//         {/* Display inviter's username */}
//         <div className="text-sm text-gray-600 mb-4">
//           Invited By: {userData.inviter || "Unknown"}
//         </div>

//         <div className="flex flex-col lg:flex-row mt-4 md:mt-6 items-center lg:items-start gap-6 sm:gap-8 md:gap-10 lg:gap-20 px-2 sm:px-4">
//           <div className="w-full lg:w-1/2 flex justify-center">
//             <Image
//               src="/media/low.png"
//               alt="Legal scales and gavel"
//               width={700}
//               height={400}
//               className="object-contain mt-4 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px]"
//               priority
//             />
//           </div>
//           <div className="w-full lg:w-1/2 space-y-10 sm:space-y-6 md:space-y-8 mt-6 lg:space-y-16 lg:mt-14">
//             <div className="flex items-center gap-3 sm:gap-4 md:gap-6 px-4">
//               <CheckCircle className="text-black min-w-[20px] sm:min-w-[20px]" size={45} />
//               <span className="text-[18px] sm:text-[20px] md:text-[30px] lg:text-[26px] font-semibold text-primary text-left">
//                 Transparency
//               </span>
//             </div>
//             <div className="flex items-center gap-3 sm:gap-4 md:gap-6 px-4">
//               <Settings className="text-black min-w-[24px] sm:min-w-[30px]" size={45} />
//               <span className="text-[18px] sm:text-[20px] md:text-[30px] lg:text-[26px] font-semibold text-primary text-left">
//                 Verify Transactions
//               </span>
//             </div>
//             <div className="flex items-center gap-3 sm:gap-4 md:gap-6 px-4">
//               <Shield className="text-black min-w-[24px] sm:min-w-[30px]" size={45} />
//               <span className="text-[18px] sm:text-[20px] md:text-[30px] lg:text-[26px] lg:whitespace-nowrap font-semibold text-primary text-left">
//                 Management
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="mt-8 sm:mt-10 md:mt-16 lg:mt-20 flex justify-center px-4">
//           <Link href="/lawyer/link-to-join" className="w-[70%] ml-[-10%]">
//             <button className="bg-foreground text-white w-full py-2 rounded-lg hover:bg-white hover:text-foreground hover:border border-foreground transition duration-300 text-[18px] md:text-[20px] lg:text-[22px]">
//               Start Agreement Creation
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeSection;

















// "use client";
// import React, { useEffect, useState } from "react";
// import { CheckCircle, Settings, Shield } from "lucide-react";
// import Image from "next/image";
// import { getCookie } from "cookies-next";
// import Link from "next/link";
// import LawyerSidebar from "../components/lawyerSidebar";

// const WelcomeSection = () => {
//   const [userData, setUserData] = useState({
//     username: "",
//     userPhone: "",
//     user_role: "",
//     isLoggedIn: false,
//     lawyer_viewed: false,
//     csrftoken: "",
//   });

//   const useData = () => {
//     useEffect(() => {
//       const fetchUserData = () => {
//         const username = getCookie("userName") || "";
//         const userPhone = getCookie("userPhone") || "";
//         const user_role = getCookie("user_role") || "";
//         const isLoggedIn = getCookie("isLoggedIn") === "true";
//         const lawyer_viewed = getCookie("lawyer_viewed") === "true";
//         const csrftoken = getCookie("csrftoken") || "";

//         setUserData({
//           username,
//           userPhone,
//           user_role,
//           isLoggedIn,
//           lawyer_viewed,
//           csrftoken,
//         });
//       };

//       fetchUserData();
//     }, []);

//     return userData;
//   };

//   useData();

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-white">
//       <div className="w-full lg:w-[20%] sticky top-0 z-10">
//         <LawyerSidebar />
//       </div>

//       <div className="flex flex-col flex-grow mt-10 p-4 sm:p-6 md:p-8 text-center w-full lg:w-[80%]">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold ml-[-10%] text-gray-800 mt-4 sm:mt-6 md:mt-10 mb-4 sm:mb-6 md:mb-8 px-2">
//           Welcome to The Shawazi Application
//         </h1>
//         <div className="flex flex-col lg:flex-row mt-4 md:mt-6 items-center lg:items-start gap-6 sm:gap-8 md:gap-10 lg:gap-20 px-2 sm:px-4">
//           <div className="w-full lg:w-1/2 flex justify-center">
//             <Image
//               src="/media/low.png"
//               alt="Legal scales and gavel"
//               width={700}
//               height={400}
//               className="object-contain mt-4 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px]"
//               priority
//             />
//           </div>
//           <div className="w-full lg:w-1/2 space-y-10 sm:space-y-6 md:space-y-8 mt-6 lg:space-y-16  lg:mt-14">
//             <div className="flex items-center gap-3 sm:gap-4 md:gap-6 px-4">
//               <CheckCircle className="text-black min-w-[20px] sm:min-w-[20px]" size={45} />
//               <span className="text-[18px] sm:text-[20px] md:text-[30px] lg:text-[26px] font-semibold text-primary text-left">
//                 Transparency
//               </span>
//             </div>
//             <div className="flex items-center gap-3 sm:gap-4 md:gap-6 px-4">
//               <Settings className="text-black min-w-[24px] sm:min-w-[30px]" size={45} />
//               <span className="text-[18px] sm:text-[20px] md:text-[30px] lg:text-[26px] font-semibold text-primary text-left">
//                 Verify Transactions
//               </span>
//             </div>
//             <div className="flex items-center gap-3 sm:gap-4 md:gap-6 px-4">
//               <Shield className="text-black min-w-[24px] sm:min-w-[30px]" size={45} />
//               <span className="text-[18px] sm:text-[20px] md:text-[30px] lg:text-[26px] lg:whitespace-nowrap font-semibold text-primary text-left">
//                 Management
//               </span>
//             </div>
//           </div>
//         </div>
        
//         <div className="mt-8 sm:mt-10 md:mt-16 lg:mt-20 flex justify-center px-4">
//           <Link href="/lawyer/link-to-join" className="w-[70%] ml-[-10%]">
//             <button className="bg-foreground text-white w-full py-2 rounded-lg hover:bg-white hover:text-foreground hover:border border-foreground transition duration-300 text-[18px] md:text-[20px] lg:text-[22px]">
//               Start Chat
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeSection;
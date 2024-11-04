"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, Settings, Shield, FileText } from "lucide-react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Link from "next/link";
import LawyerSidebar from "../components/lawyerSidebar";
import { Card, CardContent } from "@/app/(admin)/admin/components/Ui";
import { useRouter } from "next/navigation"; 

const WelcomeSection = () => {
  const router = useRouter();
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
      const usersResponse = await fetch("/api/users");
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        const buyersList = usersData.filter(
          (user: { role: string }) => user.role === "buyer"
        );
        const sellersList = usersData.filter(
          (user: { role: string }) => user.role === "seller"
        );
        setBuyers(buyersList);
        setSellers(sellersList);
      } else {
        const errorData = await usersResponse.json();
        console.error(errorData.message || "Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // useEffect(() => {
  //   const fetchAgreements = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(`/api/agreements?userId=${userData.id}`);
  //       if (response.ok) {
  //         const data = await response.json();
  //         setAgreements(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching agreements:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (userData.id) {
  //     fetchAgreements();
  //   }
  // }, [userData.id]);

  // useEffect(() => {
  //   fetchUserData();
  //   fetchUsers();
  // }, []);

  // const renderAgreementsCard = () => {
  //   if (isLoading) {
  //     return (
  //       <div className="animate-pulse bg-gray-100 h-full rounded-md p-4">
  //         <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  //         <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="h-full">
  //       <div className="flex justify-between items-center mb-4">
  //         <h3 className="font-medium">Agreements</h3>
  //         <span className="text-sm text-gray-600">
  //           Total: {agreements.length}
  //         </span>
  //       </div>

  //       {agreements.length === 0 ? (
  //         <div className="flex flex-col items-center justify-center py-6">
  //           <FileText className="text-gray-400 mb-2" size={32} />
  //           <p className="text-gray-600 text-center">No agreements found yet.</p>
  //           <p className="text-gray-500 text-sm text-center mt-1">
  //             Click "Start Agreement Creation" below to create your first
  //             agreement.
  //           </p>
  //         </div>
  //       ) : (
  //         <div className="space-y-2">
  //           {agreements.slice(0, 3).map((agreement, index) => (
  //             <div
  //               key={index}
  //               className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
  //             >
  //               <span className="text-sm">
  //                 {agreement.title || `Agreement #${agreement.id}`}
  //               </span>
  //               <span className="text-xs text-gray-500">
  //                 {new Date(agreement.createdAt).toLocaleDateString()}
  //               </span>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  useEffect(() => {
    const fetchAgreements = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/agreements?userId=${userData.id}`);
        if (response.ok) {
          const data = await response.json();
  
          // Filter agreements to ensure the user is a party involved
          const filteredAgreements = data.filter(
            (agreement: { lawyer: string; buyer: string; seller: string; }) =>
              agreement.lawyer === userData.id ||
              agreement.buyer === userData.id ||
              agreement.seller === userData.id
          );
  
          setAgreements(filteredAgreements);
        }
      } catch (error) {
        console.error("Error fetching agreements:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (userData.id) {
      fetchAgreements();
    }
  }, [userData.id]);
  
  const renderAgreementsCard = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse bg-gray-100 h-full rounded-md p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      );
    }
  
    // Check if there are no agreements to display
    if (agreements.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-6">
          <FileText className="text-gray-400 mb-2" size={32} />
          <p className="text-gray-600 text-center">No agreements found yet.</p>
          <p className="text-gray-500 text-sm text-center mt-1">
            Click "Start Agreement Creation" below to create your first agreement.
          </p>
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
      </div>
    );
  };
  

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <div className="w-full lg:w-[20%] sticky top-0 z-10">
        <LawyerSidebar />
      </div>
      <div className="flex flex-col flex-grow mt-10 p-6 text-center w-full lg:w-[80%]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl mr-14 font-semibold text-gray-800 mt-4 mb-6">
          Welcome {userData.username || "to The Shawazi Application"}
        </h1>

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

        <div className="mt-8 sm:mt-10 flex justify-center px-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-8">
            <Link href="/lawyer/link-to-join" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto bg-[#508408] text-white font-bold py-3 px-20 rounded-lg 
                          hover:bg-primary transition duration-300 text-center"
              >
                Start Agreement Creation
              </button>
            </Link>

            <button
              type="button"
              className="w-full sm:w-auto bg-transparent text-foreground border-foreground border-2 
                        font-bold py-3 px-20 rounded-lg hover:bg-foreground hover:text-white transition 
                        duration-300 text-center"
              onClick={() => router.push("/lawyer/components/agreementnext")}
            >
              View Agreements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;




// // WelcomeSection.tsx
// "use client";
// import React, { useEffect, useState } from "react";
// import { CheckCircle, Settings, Shield, FileText } from "lucide-react";
// import Image from "next/image";
// import { getCookie } from "cookies-next";
// import Link from "next/link";
// import dynamic from 'next/dynamic';
// import { useRouter } from "next/navigation";

// // Dynamically import LawyerSidebar with no SSR to avoid hydration issues
// const LawyerSidebar = dynamic(() => import("../components/lawyerSidebar"), {
//   ssr: false
// });

// interface Agreement {
//   id: string;
//   title: string;
//   buyer: string;
//   seller: string;
//   lawyer: string;
//   createdAt: string;
// }

// interface UserData {
//   id: string;
//   username: string;
//   userPhone: string;
//   user_role: string;
//   isLoggedIn: boolean;
//   lawyer_viewed: boolean;
//   csrftoken: string;
//   inviter: string;
// }

// const WelcomeSection = () => {
//   const router = useRouter();
//   const [userData, setUserData] = useState<UserData>({
//     id: "",
//     username: "",
//     userPhone: "",
//     user_role: "",
//     isLoggedIn: false,
//     lawyer_viewed: false,
//     csrftoken: "",
//     inviter: "",
//   });
//   const [agreements, setAgreements] = useState<Agreement[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasAccessibleAgreements, setHasAccessibleAgreements] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchUserData = () => {
//     try {
//       const username = getCookie("userName") || "";
//       const userPhone = getCookie("userPhone") || "";
//       const user_role = getCookie("user_role") || "";
//       const isLoggedIn = getCookie("isLoggedIn") === "true";
//       const lawyer_viewed = getCookie("lawyer_viewed") === "true";
//       const csrftoken = getCookie("csrftoken") || "";
//       const inviter = getCookie("inviter") || "";

//       setUserData({
//         id: getCookie("userId") || "",
//         username,
//         userPhone,
//         user_role,
//         isLoggedIn,
//         lawyer_viewed,
//         csrftoken,
//         inviter,
//       });
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setError("Failed to load user data");
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const fetchAgreements = async () => {
//       setIsLoading(true);
//       setError(null);
      
//       try {
//         if (!userData.id) {
//           setHasAccessibleAgreements(false);
//           return;
//         }

//         const response = await fetch(`/api/agreements?userId=${userData.id}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
        
//         const accessibleAgreements = data.filter((agreement: Agreement) => 
//           agreement.buyer === userData.id || 
//           agreement.seller === userData.id || 
//           agreement.lawyer === userData.id
//         );

//         setAgreements(accessibleAgreements);
//         setHasAccessibleAgreements(accessibleAgreements.length > 0);
//       } catch (error) {
//         console.error("Error fetching agreements:", error);
//         setError("Failed to load agreements");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (userData.id) {
//       fetchAgreements();
//     }
//   }, [userData.id]);

//   const renderAgreementsCard = () => {
//     if (error) {
//       return (
//         <div className="flex flex-col items-center justify-center py-6 text-red-500">
//           <FileText className="mb-2" size={32} />
//           <p className="text-center">{error}</p>
//         </div>
//       );
//     }

//     if (isLoading) {
//       return (
//         <div className="animate-pulse bg-gray-100 h-full rounded-md p-4">
//           <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//         </div>
//       );
//     }

//     if (!hasAccessibleAgreements) {
//       return (
//         <div className="flex flex-col items-center justify-center py-6">
//           <FileText className="text-gray-400 mb-2" size={32} />
//           <p className="text-gray-600 text-center">No agreements available.</p>
//           <p className="text-gray-500 text-sm text-center mt-1">
//             {userData.inviter 
//               ? "Waiting for agreement creation from your inviter."
//               : "You'll see agreements here once you're invited to participate in one."}
//           </p>
//         </div>
//       );
//     }

//     return (
//       <div className="h-full">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-medium">Your Agreements</h3>
//           <span className="text-sm text-gray-600">
//             Total: {agreements.length}
//           </span>
//         </div>
//         <div className="space-y-2">
//           {agreements.slice(0, 3).map((agreement, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
//             >
//               <span className="text-sm">
//                 {agreement.title || `Agreement #${agreement.id}`}
//               </span>
//               <span className="text-xs text-gray-500">
//                 {new Date(agreement.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // if (!userData.isLoggedIn) {
//   //   router.push('/register');
//   //   return null;
//   // }

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-white">
//       <div className="w-full lg:w-[20%] sticky top-0 z-10">
//         <LawyerSidebar />
//       </div>
//       <div className="flex flex-col flex-grow mt-10 p-6 text-center w-full lg:w-[80%]">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl mr-14 font-semibold text-gray-800 mt-4 mb-6">
//           Welcome {userData.username || "to The Shawazi Application"}
//         </h1>

//         <div className="flex flex-col lg:flex-row mt-14 items-center lg:items-start gap-8 justify-center">
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
//           <div className="flex flex-col sm:flex-row gap-4 items-center mt-8">
//             {userData.user_role === 'lawyer' && (
//               <Link href="/lawyer/link-to-join" className="w-full sm:w-auto">
//                 <button
//                   type="button"
//                   className="w-full sm:w-auto bg-[#508408] text-white font-bold py-3 px-20 rounded-lg 
//                             hover:bg-primary transition duration-300 text-center"
//                 >
//                   Start Agreement Creation
//                 </button>
//               </Link>
//             )}

//             <button
//               type="button"
//               className={`w-full sm:w-auto bg-transparent text-foreground border-foreground border-2 
//                         font-bold py-3 px-20 rounded-lg transition duration-300 text-center
//                         ${hasAccessibleAgreements 
//                           ? 'hover:bg-foreground hover:text-white' 
//                           : 'opacity-50 cursor-not-allowed'}`}
//               onClick={() => hasAccessibleAgreements && router.push("/lawyer/components/agreementnext")}
//               disabled={!hasAccessibleAgreements}
//             >
//               View Agreements
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeSection;


// "use client";
// import React, { useEffect, useState } from "react";
// import { CheckCircle, Settings, Shield, FileText } from "lucide-react";
// import Image from "next/image";
// import { getCookie } from "cookies-next";
// import Link from "next/link";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";

// // Dynamically import LawyerSidebar with no SSR
// const LawyerSidebar = dynamic(() => import("../components/lawyerSidebar"), {
//   ssr: false,
// });

// interface Agreement {
//   id: string;
//   title: string;
//   buyer: string;
//   seller: string;
//   lawyer: string;
//   createdAt: string;
// }

// interface UserData {
//   id: string;
//   username: string;
//   userPhone: string;
//   user_role: string;
//   isLoggedIn: boolean;
//   lawyer_viewed: boolean;
//   csrftoken: string;
//   inviter: string;
// }

// const WelcomeSection = () => {
//   const router = useRouter();
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [agreements, setAgreements] = useState<Agreement[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Check authentication and load user data
//   useEffect(() => {
//     const checkAuthAndLoadData = async () => {
//       try {
//         // First check if user is logged in
//         const isLoggedIn = getCookie("isLoggedIn");

//         // Add debug logging
//         console.log("Checking auth cookies:", {
//           isLoggedIn,
//           userId: getCookie("userId"),
//           userName: getCookie("userName"),
//           userRole: getCookie("user_role"),
//         });

//         if (!isLoggedIn || isLoggedIn !== "true") {
//           console.log("User not logged in, redirecting to login");
//           router.push("/lawyer/draft-contract");
//           return;
//         }

//         // Get all required cookies
//         const userId = getCookie("userId");
//         const userName = getCookie("userName");
//         const userRole = getCookie("user_role");

//         // Validate essential cookies
//         if (!userId || !userName || !userRole) {
//           console.log("Missing essential cookies:", { userId, userName, userRole });
//           setError("Session expired or invalid. Please log in again.");
//           router.push("/lawyer/draft-contract");
//           return;
//         }

//         // Construct user data object with all cookies
//         const userDataFromCookies: UserData = {
//           id: userId.toString(),
//           username: userName.toString(),
//           userPhone: getCookie("userPhone")?.toString() || "",
//           user_role: userRole.toString(),
//           isLoggedIn: true,
//           lawyer_viewed: getCookie("lawyer_viewed") === "true",
//           csrftoken: getCookie("csrftoken")?.toString() || "",
//           inviter: getCookie("inviter")?.toString() || "",
//         };

//         setUserData(userDataFromCookies);
//         setError(null);

//       } catch (error) {
//         console.error("Error in checkAuthAndLoadData:", error);
//         setError("Failed to load user session. Please try logging in again.");
//         router.push("/lawyer/draft-contract");
//       }
//     };

//     checkAuthAndLoadData();
//   }, [router]);

//   // Fetch agreements
//   useEffect(() => {
//     const fetchAgreements = async () => {
//       if (!userData?.id) {
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(`/api/agreements?userId=${userData.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             // Add authorization header if you're using one
//             "Authorization": `Bearer ${getCookie("csrftoken")}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch agreements: ${response.statusText}`);
//         }

//         const data = await response.json();
//         setAgreements(data);
//       } catch (error) {
//         console.error("Error fetching agreements:", error);
//         setError("Failed to fetch agreements. Please try refreshing the page.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAgreements();
//   }, [userData?.id]);

//   // Show loading state while checking auth
//   if (isLoading && !userData) {
//     return <div className="p-4">Checking authentication...</div>;
//   }

//   // Show error state if there's an error
//   if (error && !isLoading) {
//     return (
//       <div className="p-4 text-red-600">
//         <p>{error}</p>
//         <button 
//           onClick={() => router.push("/lawyer/draft-contract")}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Return to Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-6">Welcome to the Agreement Portal</h1>
//       {userData && (
//         <div className="mb-4">
//           <p className="text-gray-600">Welcome, {userData.username}</p>
//           <p className="text-sm text-gray-500">Role: {userData.user_role}</p>
//         </div>
//       )}
      
//       {isLoading ? (
//         <p>Loading agreements...</p>
//       ) : (
//         <div className="space-y-4">
//           {agreements.length === 0 ? (
//             <p className="text-gray-500">No agreements found.</p>
//           ) : (
//             <ul className="space-y-4">
//               {agreements.map((agreement) => (
//                 <li key={agreement.id} className="border p-4 rounded-lg shadow">
//                   <h2 className="text-xl font-semibold">{agreement.title}</h2>
//                   <div className="mt-4 text-sm text-gray-600">
//                     <p>Buyer: {agreement.buyer}</p>
//                     <p>Seller: {agreement.seller}</p>
//                     <p>Lawyer: {agreement.lawyer}</p>
//                     <p>Created At: {new Date(agreement.createdAt).toLocaleDateString()}</p>
//                   </div>
//                   <Link href={`/agreements/${agreement.id}`}>
//                     <a className="mt-2 inline-block text-blue-500 hover:underline">
//                       View Details
//                     </a>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// const LawyerDashboard = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <LawyerSidebar />

//       {/* Main content */}
//       <main className="flex-1 p-8">
//         <WelcomeSection />
//       </main>
//     </div>
//   );
// };

// export default LawyerDashboard;




// "use client";
// import React, { useEffect, useState } from "react";
// import { CheckCircle, Settings, Shield, FileText } from "lucide-react";
// import Image from "next/image";
// import { getCookie } from "cookies-next";
// import Link from "next/link";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";

// // Dynamically import LawyerSidebar with no SSR
// const LawyerSidebar = dynamic(() => import("../components/lawyerSidebar"), {
//   ssr: false,
// });

// interface Agreement {
//   id: string;
//   title: string;
//   buyer: string;
//   seller: string;
//   lawyer: string;
//   createdAt: string;
// }

// interface UserData {
//   id: string;
//   username: string;
//   userPhone: string;
//   user_role: string;
//   isLoggedIn: boolean;
//   lawyer_viewed: boolean;
//   csrftoken: string;
//   inviter: string;
// }

// const WelcomeSection = () => {
//   const router = useRouter();
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [agreements, setAgreements] = useState<Agreement[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Check authentication and load user data
//   useEffect(() => {
//     const checkAuthAndLoadData = async () => {
//       try {
//         // First check if user is logged in
//         const isLoggedIn = getCookie("isLoggedIn");
//         if (!isLoggedIn || isLoggedIn !== "true") {
//           console.log("User not logged in, redirecting to login");
//           router.push("/login");
//           return;
//         }

//         // Get all required cookies
//         const userId = getCookie("userId");
//         const userName = getCookie("userName");
//         const userRole = getCookie("user_role");

//         // Validate essential cookies
//         if (!userId || !userName || !userRole) {
//           console.log("Missing essential cookies:", { userId, userName, userRole });
//           setError("Session expired or invalid. Please log in again.");
//           router.push("/login");
//           return;
//         }

//         // Construct user data object with all cookies
//         const userDataFromCookies: UserData = {
//           id: userId.toString(),
//           username: userName.toString(),
//           userPhone: getCookie("userPhone")?.toString() || "",
//           user_role: userRole.toString(),
//           isLoggedIn: true,
//           lawyer_viewed: getCookie("lawyer_viewed") === "true",
//           csrftoken: getCookie("csrftoken")?.toString() || "",
//           inviter: getCookie("inviter")?.toString() || "",
//         };

//         // Set the user data
//         setUserData(userDataFromCookies);
//         setError(null);

//       } catch (error) {
//         console.error("Error in checkAuthAndLoadData:", error);
//         setError("Failed to load user session. Please try logging in again.");
//         router.push("/login");
//       }
//     };

//     checkAuthAndLoadData();
//   }, [router]);

//   // Fetch agreements
//   useEffect(() => {
//     const fetchAgreements = async () => {
//       if (!userData?.id) {
//         setIsLoading(false);
//         return;
//       }

//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(`/api/agreements?userId=${userData.id}`, {
//           headers: {
//             "Content-Type": "application/json",
//             // Add authorization header if you're using one
//             "Authorization": `Bearer ${getCookie("csrftoken")}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch agreements: ${response.statusText}`);
//         }

//         const data = await response.json();
//         setAgreements(data);
//       } catch (error) {
//         console.error("Error fetching agreements:", error);
//         setError("Failed to fetch agreements. Please try refreshing the page.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAgreements();
//   }, [userData?.id]);

//   // Show loading state while checking auth
//   if (isLoading && !userData) {
//     return <div className="p-4">Checking authentication...</div>;
//   }

//   // Show error state if there's an error
//   if (error && !isLoading) {
//     return (
//       <div className="p-4 text-red-600">
//         <p>{error}</p>
//         <button 
//           onClick={() => router.push("/login")}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Return to Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-6">Welcome to the Agreement Portal</h1>
//       {userData && (
//         <div className="mb-4">
//           <p className="text-gray-600">Welcome, {userData.username}</p>
//           <p className="text-sm text-gray-500">Role: {userData.user_role}</p>
//         </div>
//       )}
      
//       {isLoading ? (
//         <p>Loading agreements...</p>
//       ) : (
//         <div className="space-y-4">
//           {agreements.length === 0 ? (
//             <p className="text-gray-500">No agreements found.</p>
//           ) : (
//             <ul className="space-y-4">
//               {agreements.map((agreement) => (
//                 <li key={agreement.id} className="border p-4 rounded-lg shadow">
//                   <h2 className="text-xl font-semibold">{agreement.title}</h2>
//                   <div className="mt-2 space-y-1 text-gray-600">
//                     <p>Buyer: {agreement.buyer}</p>
//                     <p>Seller: {agreement.seller}</p>
//                     <p>Lawyer: {agreement.lawyer}</p>
//                     <p className="text-sm text-gray-500">
//                       Created: {new Date(agreement.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WelcomeSection;

// // WelcomeSection.tsx
// "use client";
// import React, { useEffect, useState } from "react";
// import { CheckCircle, Settings, Shield, FileText } from "lucide-react";
// import Image from "next/image";
// import { getCookie } from "cookies-next";
// import Link from "next/link";
// import LawyerSidebar from "../components/lawyerSidebar";
// import { useRouter } from "next/navigation";

// const WelcomeSection = () => {
//   const router = useRouter();
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
//   const [agreements, setAgreements] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasAccessibleAgreements, setHasAccessibleAgreements] = useState(false);

//   const fetchUserData = () => {
//     const username = getCookie("userName") || "";
//     const userPhone = getCookie("userPhone") || "";
//     const user_role = getCookie("user_role") || "";
//     const isLoggedIn = getCookie("isLoggedIn") === "true";
//     const lawyer_viewed = getCookie("lawyer_viewed") === "true";
//     const csrftoken = getCookie("csrftoken") || "";
//     const inviter = getCookie("inviter") || "";

//     setUserData({
//       id: getCookie("userId") || "",
//       username,
//       userPhone,
//       user_role,
//       isLoggedIn,
//       lawyer_viewed,
//       csrftoken,
//       inviter,
//     });
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const fetchAgreements = async () => {
//       setIsLoading(true);
//       try {
//         if (!userData.id) {
//           setHasAccessibleAgreements(false);
//           return;
//         }

//         const response = await fetch(`/api/agreements?userId=${userData.id}`);
//         if (response.ok) {
//           const data = await response.json();
          
//           // Filter agreements to only show those where the user is involved
//           const accessibleAgreements = data.filter((agreement: any) => 
//             agreement.buyer === userData.id || 
//             agreement.seller === userData.id || 
//             agreement.lawyer === userData.id
//           );

//           setAgreements(accessibleAgreements);
//           setHasAccessibleAgreements(accessibleAgreements.length > 0);
//         }
//       } catch (error) {
//         console.error("Error fetching agreements:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (userData.id) {
//       fetchAgreements();
//     }
//   }, [userData.id]);

//   const renderAgreementsCard = () => {
//     if (isLoading) {
//       return (
//         <div className="animate-pulse bg-gray-100 h-full rounded-md p-4">
//           <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//         </div>
//       );
//     }

//     if (!hasAccessibleAgreements) {
//       return (
//         <div className="flex flex-col items-center justify-center py-6">
//           <FileText className="text-gray-400 mb-2" size={32} />
//           <p className="text-gray-600 text-center">No agreements available.</p>
//           <p className="text-gray-500 text-sm text-center mt-1">
//             {userData.inviter 
//               ? "Waiting for agreement creation from your inviter."
//               : "You'll see agreements here once you're invited to participate in one."}
//           </p>
//         </div>
//       );
//     }

//     return (
//       <div className="h-full">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-medium">Your Agreements</h3>
//           <span className="text-sm text-gray-600">
//             Total: {agreements.length}
//           </span>
//         </div>
//         <div className="space-y-2">
//           {agreements.slice(0, 3).map((agreement, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
//             >
//               <span className="text-sm">
//                 {agreement.title || `Agreement #${agreement.id}`}
//               </span>
//               <span className="text-xs text-gray-500">
//                 {new Date(agreement.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen bg-white">
//       <div className="w-full lg:w-[20%] sticky top-0 z-10">
//         <LawyerSidebar />
//       </div>
//       <div className="flex flex-col flex-grow mt-10 p-6 text-center w-full lg:w-[80%]">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl mr-14 font-semibold text-gray-800 mt-4 mb-6">
//           Welcome {userData.username || "to The Shawazi Application"}
//         </h1>

//         <div className="flex flex-col lg:flex-row mt-14 items-center lg:items-start gap-8 justify-center">
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
//           <div className="flex flex-col sm:flex-row gap-4 items-center mt-8">
//             {userData.user_role === 'lawyer' && (
//               <Link href="/lawyer/link-to-join" className="w-full sm:w-auto">
//                 <button
//                   type="button"
//                   className="w-full sm:w-auto bg-[#508408] text-white font-bold py-3 px-20 rounded-lg 
//                             hover:bg-primary transition duration-300 text-center"
//                 >
//                   Start Agreement Creation
//                 </button>
//               </Link>
//             )}

//             <button
//               type="button"
//               className={`w-full sm:w-auto bg-transparent text-foreground border-foreground border-2 
//                         font-bold py-3 px-20 rounded-lg transition duration-300 text-center
//                         ${hasAccessibleAgreements 
//                           ? 'hover:bg-foreground hover:text-white' 
//                           : 'opacity-50 cursor-not-allowed'}`}
//               onClick={() => hasAccessibleAgreements && router.push("/lawyer/components/agreementnext")}
//               disabled={!hasAccessibleAgreements}
//             >
//               View Agreements
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };












// "use client";
// import React, { useEffect, useState } from "react";
// import { CheckCircle, Settings, Shield, FileText } from "lucide-react";
// import Image from "next/image";
// import { getCookie } from "cookies-next";
// import Link from "next/link";
// import LawyerSidebar from "../components/lawyerSidebar";
// import { Card, CardContent } from "@/app/(admin)/admin/components/Ui";
// import router from "next/navigation";


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
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchUserData = () => {
//     const username = getCookie("userName") || "";
//     const userPhone = getCookie("userPhone") || "";
//     const user_role = getCookie("user_role") || "";
//     const isLoggedIn = getCookie("isLoggedIn") === "true";
//     const lawyer_viewed = getCookie("lawyer_viewed") === "true";
//     const csrftoken = getCookie("csrftoken") || "";
//     const inviter = getCookie("inviter") || "";
    
//     setUserData({
//       id: getCookie("userId") || "",
//       username,
//       userPhone,
//       user_role,
//       isLoggedIn,
//       lawyer_viewed,
//       csrftoken,
//       inviter,
//     });
//   };

//   const fetchUsers = async () => {
//     try {
//       const usersResponse = await fetch('/api/users');
//       if (usersResponse.ok) {
//         const usersData = await usersResponse.json();
//         const buyersList = usersData.filter((user: { role: string; }) => user.role === 'buyer');
//         const sellersList = usersData.filter((user: { role: string; }) => user.role === 'seller');
//         setBuyers(buyersList);
//         setSellers(sellersList);
//       } else {
//         const errorData = await usersResponse.json();
//         console.error(errorData.message || 'Failed to fetch users.');
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchAgreements = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`/api/agreements?userId=${userData.id}`);
//         if (response.ok) {
//           const data = await response.json();
//           setAgreements(data);
//         }
//       } catch (error) {
//         console.error('Error fetching agreements:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
  
//     if (userData.id) {
//       fetchAgreements();
//     }
//   }, [userData.id]);

//   useEffect(() => {
//     fetchUserData();
//     fetchUsers();
//   }, []);

//   const renderAgreementsCard = () => {
//     if (isLoading) {
//       return (
//         <div className="animate-pulse bg-gray-100 h-full rounded-md p-4">
//           <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//         </div>
//       );
//     }


//       return (
//         <div className="h-full">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-medium">Agreements</h3>
//             <span className="text-sm text-gray-600">
//               Total: {agreements.length}
//             </span>
//           </div>

//           {agreements.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-6">
//               <FileText className="text-gray-400 mb-2" size={32} />
//               <p className="text-gray-600 text-center">No agreements found yet.</p>
//               <p className="text-gray-500 text-sm text-center mt-1">
//                 Click "Start Agreement Creation" below to create your first agreement.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-2">
//               {agreements.slice(0, 3).map((agreement, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
//                 >
//                   <span className="text-sm">
//                     {agreement.title || `Agreement #${agreement.id}`}
//                   </span>
//                   <span className="text-xs text-gray-500">
//                     {new Date(agreement.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen  bg-white">
//       <div className="w-full lg:w-[20%] sticky top-0 z-10">
//         <LawyerSidebar />
//       </div>
//       <div className="flex flex-col flex-grow mt-10 p-6 text-center w-full lg:w-[80%]">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl mr-14   font-semibold text-gray-800 mt-4 mb-6">
//           Welcome {userData.username || "to The Shawazi Application"}
//         </h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-14 ml-[14%] mb-6">
//           <Card>
//             <CardContent className="p-4">
//               <h3 className="font-medium mb-2">Available Users</h3>
//               <div className="text-sm text-gray-600">
//                 <p>Buyers: {buyers.length}</p>
//                 <p>Sellers: {sellers.length}</p>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-4">
//               <h3 className="font-medium mb-2">Invitation Info</h3>
//               <p className="text-sm text-gray-600">
//                 Invited By: {userData.inviter || "Unknown"}
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="flex flex-col lg:flex-row mt-14 items-center lg:items-start gap-8 justify-center">
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

//         <div className="mt-8 sm:mt-10 flex justify-center px-4 ">
//   {/* <div className="flex flex-col sm:flex-row gap-[30%] items-center">
//     <Link href="/lawyer/link-to-join" className="w-full sm:w-auto">
//       <button 
//       type="button"
//       className="bg-foreground text-white w-[150%] py-2.5 sm:py-3 rounded-lg
//                 hover:bg-primary hover:text-white hover:border border-foreground
//                 transition duration-300 text-base sm:text-lg md:text-xl lg:text-[22px]">
//         Start Agreement Creation
//       </button>
//     </Link>
    
//     <button
//       type="button"
//       className="flex-1 bg-transparent w-[150%] text-foreground border-foreground border-2 hover:bg-foreground hover:text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 text-center"
//       onClick={() => router.push("/lawyer/components/agreementnext")}
//     >
//       Next Page
//     </button>
//   </div> */}

// <div className="flex flex-col sm:flex-row gap-4 items-center mt-8">
//   <Link href="/lawyer/link-to-join" className="w-full sm:w-auto">
//     <button
//       type="button"
//       className="w-full sm:w-auto bg-[#508408] text-white font-bold py-3 px-20 rounded-lg 
//                  hover:bg-primary transition duration-300 text-center"
//     >
//       Start Agreement Creation
//     </button>
//   </Link>

//   <button
//     type="button"
//     className="w-full sm:w-auto bg-transparent text-foreground border-foreground border-2 
//                hover:bg-foreground hover:text-white font-bold py-3 px-32 rounded-lg 
//                hover:bg-opacity-90 transition duration-300 text-center"
//     onClick={() => router.push("/lawyer/components/agreementnext")}
//   >
//     Next Page
//   </button>
// </div>

// </div>

//         </div>
        
//       </div>
//   );
// };

// export default WelcomeSection;
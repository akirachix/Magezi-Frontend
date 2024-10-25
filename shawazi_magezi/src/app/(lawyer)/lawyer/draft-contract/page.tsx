"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle, Settings, Shield, Plus, Users, FileText } from "lucide-react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Link from "next/link";
import LawyerSidebar from "../components/lawyerSidebar";

const WelcomeSection = () => {
  const [userData, setUserData] = useState({
    username: "",
    userPhone: "",
    user_role: "",
    isLoggedIn: false,
    lawyer_viewed: false,
    csrftoken: "",
  });

  const [hasAgreements, setHasAgreements] = useState(false);

  const useData = () => {
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

        // Set hasAgreements to false by default for new users
        setHasAgreements(false);
      };

      fetchUserData();
    }, []);

    return userData;
  };

  useData();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <div className="w-full lg:w-[20%] sticky top-0 z-10">
        <LawyerSidebar />
      </div>

      <div className="flex flex-col flex-grow mt-10 p-4 sm:p-6 md:p-8 text-center w-full lg:w-[80%]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold ml-[-10%] text-gray-800 mt-4 sm:mt-6 md:mt-10 mb-4 sm:mb-6 md:mb-8 px-2">
          Welcome to The Shawazi Application
        </h1>

        {!hasAgreements ? (
          <div className="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-200 ml-[-10%]">
            <p className="text-gray-700">
              You don't have any agreements yet. Create your first agreement by selecting the users involved.
            </p>
          </div>
        ) : null}

        <div className="flex flex-col lg:flex-row mt-4 md:mt-6 items-center lg:items-start gap-6 sm:gap-8 md:gap-10 lg:gap-20 px-2 sm:px-4">
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/media/low.png"
              alt="Legal scales and gavel"
              width={700}
              height={400}
              className="object-contain mt-4 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px]"
              priority
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-10 sm:space-y-6 md:space-y-8 mt-6 lg:space-y-16 lg:mt-14">
            {/* {!hasAgreements ? (
              <div className="border rounded-lg p-6 mb-6 ml-[-10%]">
                <div className="flex items-center gap-3 mb-4">
                  <Plus className="text-black min-w-[24px]" size={30} />
                  <span className="text-xl font-semibold">Create New Agreement</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 p-4 border rounded-lg text-center">
                    <Users className="mx-auto mb-2" size={24} />
                    <span>Select Users</span>
                  </div>
                  <div className="flex-1 p-4 border rounded-lg text-center opacity-50">
                    <FileText className="mx-auto mb-2" size={24} />
                    <span>Draft Agreement</span>
                  </div>
                </div>
              </div>
            ) : null} */}
            
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 px-4">
              <CheckCircle className="text-black min-w-[20px] sm:min-w-[20px]" size={45} />
              <span className="text-[18px] sm:text-[20px] md:text-[30px] lg:text-[26px] font-semibold text-primary text-left">
                Transparency
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 px-4">
              <Settings className="text-black min-w-[24px] sm:min-w-[30px]" size={45} />
              <span className="text-[18px] sm:text-[20px] md:text-[30px] lg:text-[26px] font-semibold text-primary text-left">
                Verify Transactions
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 px-4">
              <Shield className="text-black min-w-[24px] sm:min-w-[30px]" size={45} />
              <span className="text-[18px] sm:text-[20px] md:text-[30px] lg:text-[26px] lg:whitespace-nowrap font-semibold text-primary text-left">
                Management
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-10 md:mt-16 lg:mt-20 flex justify-center px-4">
          <Link href="/lawyer/link-to-join" className="w-[70%] ml-[-10%]">
            <button className="bg-foreground text-white w-full py-2 rounded-lg hover:bg-white hover:text-foreground hover:border border-foreground transition duration-300 text-[18px] md:text-[20px] lg:text-[22px]">
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
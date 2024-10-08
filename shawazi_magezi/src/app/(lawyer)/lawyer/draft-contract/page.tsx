'use client'
import React, { useEffect, useState } from 'react';
import { CheckCircle, Settings, Shield } from 'lucide-react';
import Image from 'next/image';
// import Sidebar from '../../Sidebar';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SideBar from '@/app/components/SideBarPwa';

const WelcomeSection = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    userPhone: '',
    user_role: '',
    isLoggedIn: false,
    lawyer_viewed: false,
    csrftoken: ''
  });

  useEffect(() => {
    const fetchUserData = () => {
      const username = getCookie('userName') || '';
      const userPhone = getCookie('userPhone') || '';
      const user_role = getCookie('user_role') || '';
      const isLoggedIn = getCookie('isLoggedIn') === 'true';
      const lawyer_viewed = getCookie('lawyer_viewed') === 'true';
      const csrftoken = getCookie('csrftoken') || '';
      setUserData({
        username,
        userPhone,
        user_role,
        isLoggedIn,
        lawyer_viewed,
        csrftoken
      });
    };
    fetchUserData();
  }, []);

  // Log userData to avoid linting error
  console.log(userData);

  const handleAgreementView = () => {
    const userRole = getCookie('user_role');
    setCookie('userRole', userRole); 
    router.push('/components/Terms'); 
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white max-w-[100vw] lg:max-w-[80vw] mx-0 lg:ml-32">
      <SideBar userRole={""} />
      <div className="flex flex-col flex-grow p-4 md:p-8 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-semibold text-gray-800 mt-6 md:mt-10 mb-6 md:mb-8">
          Welcome to The Shawazi Application
        </h1>
        <div className="flex flex-col md:flex-row mt-4 md:mt-6 items-center md:items-start gap-10 md:gap-20 lg:gap-32">
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/media/low.png"
              alt="Legal scales and gavel"
              width={800}
              height={400}
              className="object-contain mt-4 md:w-[900px] lg:w-[1000px]"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6 md:space-y-8 lg:space-y-10">
            <div className="flex gap-4 md:gap-6">
              <CheckCircle className="text-black" size={30} />
              <span className="text-xl md:text-xl lg:text-xl font-semibold text-gray-700">Transparency</span>
            </div>
            <div className="flex gap-4 md:gap-6">
              <Settings className="text-black" size={30} />
              <span className="text-xl md:text-xl lg:text-xl font-semibold text-gray-700">VerifyTransactions</span>
            </div>
            <div className="flex gap-4 md:gap-6">
              <Shield className="text-black" size={30} />
              <span className="text-xl md:text-xl lg:text-xl font-semibold text-gray-700">Management</span>
            </div>
          </div>
        </div>
        <div className="mt-10 md:mt-20 flex justify-center">
        <Link href="/Link-to-join">
          <button 
            onClick={handleAgreementView}
            className="bg-[#508408] text-white px-16 md:px-32 py-3 mt-10 md:mt-20 rounded-md text-lg hover:bg-opacity-90 transition duration-300 shadow-md"
          >
            View Agreement
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
















// 'use client'
// import React, { useEffect, useState } from 'react';
// import { CheckCircle, Settings, Shield } from 'lucide-react';
// import Image from 'next/image';
// // import Sidebar from '../../Sidebar';
// import { getCookie, setCookie } from 'cookies-next';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import SideBar from '@/app/components/SideBarPwa';

// const WelcomeSection = () => {
//   const router = useRouter();
//   const [userData, setUserData] = useState({
//     username: '',
//     userPhone: '',
//     user_role: '',
//     isLoggedIn: false,
//     lawyer_viewed: false,
//     csrftoken: ''
//   });

//   useEffect(() => {
//     const fetchUserData = () => {
//       const username = getCookie('userName') || '';
//       const userPhone = getCookie('userPhone') || '';
//       const user_role = getCookie('user_role') || '';
//       const isLoggedIn = getCookie('isLoggedIn') === 'true';
//       const lawyer_viewed = getCookie('lawyer_viewed') === 'true';
//       const csrftoken = getCookie('csrftoken') || '';
//       setUserData({
//         username,
//         userPhone,
//         user_role,
//         isLoggedIn,
//         lawyer_viewed,
//         csrftoken
//       });
//     };
//     fetchUserData();
//   }, []);

//   const handleAgreementView = () => {
//     const userRole = getCookie('user_role');
//     setCookie('userRole', userRole); 
//     router.push('/components/Terms'); 
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-white max-w-[100vw] lg:max-w-[80vw] mx-0 lg:ml-32">
//       <SideBar userRole={""} />
//       <div className="flex flex-col flex-grow p-4 md:p-8 text-center">
//         <h1 className="text-3xl md:text-4xl lg:text-4xl font-semibold text-gray-800 mt-6 md:mt-10 mb-6 md:mb-8">
//           Welcome to The Shawazi Application
//         </h1>
//         <div className="flex flex-col md:flex-row mt-4 md:mt-6 items-center md:items-start gap-10 md:gap-20 lg:gap-32">
//           <div className="w-full md:w-1/2 flex justify-center">
//             <Image
//               src="/media/low.png"
//               alt="Legal scales and gavel"
//               width={800}
//               height={400}
//               className="object-contain mt-4 md:w-[900px] lg:w-[1000px]"
//             />
//           </div>
//           <div className="w-full md:w-1/2 space-y-6 md:space-y-8 lg:space-y-10">
//             <div className="flex gap-4 md:gap-6">
//               <CheckCircle className="text-black" size={30} />
//               <span className="text-xl md:text-xl lg:text-xl font-semibold text-gray-700">Transparency</span>
//             </div>
//             <div className="flex gap-4 md:gap-6">
//               <Settings className="text-black" size={30} />
//               <span className="text-xl md:text-xl lg:text-xl font-semibold text-gray-700">VerifyTransactions</span>
//             </div>
//             <div className="flex gap-4 md:gap-6">
//               <Shield className="text-black" size={30} />
//               <span className="text-xl md:text-xl lg:text-xl font-semibold text-gray-700">Management</span>
//             </div>
//           </div>
//         </div>
//         <div className="mt-10 md:mt-20 flex justify-center">
//         <Link href="/Link-to-join">
//           <button 
//             onClick={handleAgreementView}
//             className="bg-[#508408] text-white px-16 md:px-32 py-3 mt-10 md:mt-20 rounded-md text-lg hover:bg-opacity-90 transition duration-300 shadow-md"
//           >
//             View Agreement
//           </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeSection;


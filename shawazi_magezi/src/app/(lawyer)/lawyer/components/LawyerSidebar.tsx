// import React, { useState, useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { FaHome, FaUser, FaFileContract, FaComments, FaMoneyCheck } from 'react-icons/fa';
// import { MdOutlineSettings } from "react-icons/md";
// import { BiLogOut } from "react-icons/bi";

// const LawyerSidebar: React.FC = () => {
//   const [showSettings, setShowSettings] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   const menuItems = [
//     { name: 'Home', icon: <FaHome className="w-5 h-5 mr-2" />, href: '/lawyer/draft-contract' },
//     { name: 'Profile', icon: <FaUser className="w-5 h-5 mr-2" />, href: '/lawyer/profile' },
//     { name: 'Agreement', icon: <FaFileContract className="w-5 h-5 mr-2" />, href: '/lawyer/agreementNext' },
//     { name: 'ChatRoom', icon: <FaComments className="w-5 h-5 mr-2" />, href: '/chatroom-page' },
//     { name: 'Transactions', icon: <FaMoneyCheck className="w-5 h-5 mr-2" />, href: '/transactions/transactions' },
//   ];

//   const handleNavigation = (href: string) => {
//     router.push(href);
//   };

//   return (
//     <div className="flex flex-col h-full bg-white border-r">
//       <div className="flex items-center justify-center p-4">
//         <Image
//           src="/images/shawazilogo.png"
//           alt="Shawazi Logo"
//           className="w-20 mb-4 mt-12"
//           width={80}
//           height={80}
//           priority
//         />
//       </div>
//       <nav className="flex-grow overflow-y-auto">
//         <ul className="space-y-6 px-4 py-8">
//           {menuItems.map((item) => (
//             <li key={item.name}>
//               <button
//                 onClick={() => handleNavigation(item.href)}
//                 className={`flex items-center w-full px-4 py-2 text-primary hover:bg-secondary-light rounded-lg transition-colors duration-200 ${
//                   pathname === item.href ? 'bg-orange-100 text-orange-600' : ''
//                 }`}
//               >
//                 {item.icon}
//                 <span className="text-sm md:text-base lg:text-lg font-medium">{item.name}</span>
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//       <div className="mt-auto p-4">
//         <button
//           onClick={() => setShowSettings(!showSettings)}
//           className="flex items-center w-full px-4 py-2 text-[#562B00] hover:bg-orange-100 rounded-lg transition-colors duration-200"
//         >
//           <MdOutlineSettings className="w-6 h-6 mr-4" />
//           <span className="text-sm md:text-base lg:text-lg font-medium">Settings</span>
//         </button>
//         {showSettings && (
//           <div className="mt-2 ml-6">
//             <button
//               onClick={() => handleNavigation('/settings')}
//               className="block py-2 text-secondary hover:text-secondary transition-colors duration-200"
//             >
//               General Settings
//             </button>
//             <button
//               onClick={() => handleNavigation('/logout')}
//               className="block py-2 text-primary hover:text-red-600 transition-colors duration-200"
//             >
//               <span className="flex items-center">
//                 <BiLogOut className="w-5 h-5 mr-2" />
//                 Logout
//               </span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LawyerSidebar;



// // import SidebarContent from '@/app/SidebarContent/page';
// // import React from 'react';
// import SidebarContent from '@/app/SidebarContent/page';
// import React from 'react';
// // import { FaHome, FaUser, FaComments, FaFileContract, FaMoneyCheck } from 'react-icons/fa';
// // import SidebarContent from './SidebarContent';
// import { FaHome, FaUser, FaComments, FaFileContract, FaMoneyCheck } from 'react-icons/fa';

// const LawyerSidebar: React.FC = () => {
//   const menuItems = [
//     { name: 'Home', icon: <FaHome className="w-5 h-5 mr-2" />, href: '/lawyer/draft-contract' },
//     { name: 'Profile', icon: <FaUser className="w-5 h-5 mr-2" />, href: '/lawyer/profile' },
//     { name: 'ChatRoom', icon: <FaComments className="w-5 h-5 mr-2" />, href: '/chatroom-page' },
//     { name: 'Contract', icon: <FaFileContract className="w-5 h-5 mr-2" />, href: '/lawyer/components/agreementnext' },
//     { name: 'Transactions', icon: <FaMoneyCheck className="w-5 h-5 mr-2" />, href: '/transactions/transactions' },
//   ];


//     return <SidebarContent menuItems={menuItems} />;
// };

// export default LawyerSidebar;



import SidebarContent from '@/app/SidebarContent/page';
import React from 'react';
import { FaHome, FaUser, FaComments, FaFileContract, FaMoneyCheck } from 'react-icons/fa';

const LawyerSidebar: React.FC = () => {
  const menuItems = [
    { name: 'Home', icon: <FaHome className="w-5 h-5 mr-2" />, href: '/lawyer/draft-contract' },
    { name: 'Profile', icon: <FaUser className="w-5 h-5 mr-2" />, href: '/lawyer/profile' },
    { name: 'ChatRoom', icon: <FaComments className="w-5 h-5 mr-2" />, href: '/lawyer/chatroom-page' },
    { name: 'Contract', icon: <FaFileContract className="w-5 h-5 mr-2" />, href: '/lawyer/components/agreementnext' },
    { name: 'Transactions', icon: <FaMoneyCheck className="w-5 h-5 mr-2" />, href: '/transactions/transactions' },
  ];

 
    return <SidebarContent menuItems={menuItems} />;
};

export default LawyerSidebar;

// import SidebarContent from '@/app/SidebarContent/page';
// import React from 'react';
// import { FaHome, FaUser, FaComments, FaFileContract, FaMoneyCheck } from 'react-icons/fa';

// const LawyerSidebar: React.FC = () => {
//   const menuItems = [
//     { name: 'Home', icon: <FaHome className="w-5 h-5 mr-2" />, href: '/lawyer/draft-contract' },
//     { name: 'Profile', icon: <FaUser className="w-5 h-5 mr-2" />, href: '/lawyer/profile' },
//     { name: 'ChatRoom', icon: <FaComments className="w-5 h-5 mr-2" />, href: '/chatroom-page' },
//     { name: 'Contract', icon: <FaFileContract className="w-5 h-5 mr-2" />, href: '/lawyer/components/agreementnext' },
//     { name: 'Transactions', icon: <FaMoneyCheck className="w-5 h-5 mr-2" />, href: '/transactions/transactions' },
//   ];

//   return <SidebarContent menuItems={menuItems} />;
// };

// export default LawyerSidebar;
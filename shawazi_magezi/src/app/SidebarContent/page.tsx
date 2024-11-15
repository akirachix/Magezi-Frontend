// import React, { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// import { MdOutlineSettings } from "react-icons/md";
// import { BiLogOut } from "react-icons/bi";
// import Image from 'next/image'; // Import Image component for usage
// import router from 'next/router';
// // import { useRouter } from 'next/navigation';
// // import router from 'next/router';

// interface MenuItem {
//   name: string;
//   icon: JSX.Element;
//   href: string;
// }

// interface SidebarContentProps {
//   menuItems: MenuItem[];
// }

// const SidebarContent: React.FC<SidebarContentProps> = ({ menuItems }) => {
// //   const router = useRouter();
//   const [showSettings, setShowSettings] = useState(false);

//   const handleNavigation = (href: string) => {
//     if (href) {
//       router.push(href);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full relative">
//       <div className="flex items-left justify-between p-4">
//         <Image
//           src="/images/shawazilogo.png"
//           alt="Shawazi Logo"
//           className="w-20 md:w-16 lg:w-14 xl:w-20 mx-auto mb-4 mt-12"
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
//                 className="flex items-center w-full px-4 py-2 text-primary hover:bg-secondary-light rounded-lg transition-colors duration-200"
//               >
//                 {item.icon}
//                 <span className="text-sm md:text-base lg:text-2xl font-medium">
//                   {item.name}
//                 </span>
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
//           <span className="text-sm md:text-base lg:text-lg font-medium">
//             Settings
//           </span>
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
//               onClick={() => handleNavigation('/teaser/teasertwo')}
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

// export default SidebarContent;





















// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; 
// import { MdOutlineSettings } from "react-icons/md";
// import { BiLogOut } from "react-icons/bi";
// import Image from 'next/image';

// interface MenuItem {
//   name: string;
//   icon: JSX.Element;
//   href: string;
// }

// interface SidebarContentProps {
//   menuItems: MenuItem[];
// }

// const SidebarContent: React.FC<SidebarContentProps> = ({ menuItems }) => {
//   const router = useRouter(); 
//   const [showSettings, setShowSettings] = useState(false);

//   const handleNavigation = (href: string) => {
//     if (href) {
//       router.push(href); 
//     }
//   };

//   return (
//     <div className="flex flex-col h-full relative">
//       <div className="flex items-left justify-between p-4">
//         <Image
//           src="/images/shawazilogo.png"
//           alt="Shawazi Logo"
//           className="w-20 md:w-16 lg:w-14 xl:w-20 mx-auto mb-4 mt-12"
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
//                 className="flex items-center w-full px-4 py-2 text-primary hover:bg-secondary-light rounded-lg transition-colors duration-200"
//               >
//                 {item.icon}
//                 <span className="text-sm md:text-base lg:text-2xl font-medium">
//                   {item.name}
//                 </span>
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
//           <span className="text-sm md:text-base lg:text-lg font-medium">
//             Settings
//           </span>
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
//               onClick={() => handleNavigation('/teaser/teasertwo')}
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

// export default SidebarContent;








// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { MdOutlineSettings, MdMenu, MdClose } from "react-icons/md"; // Import hamburger and close icons
// import { BiLogOut } from "react-icons/bi";
// import Image from 'next/image';

// interface MenuItem {
//   name: string;
//   icon: JSX.Element;
//   href: string;
// }

// interface SidebarContentProps {
//   menuItems: MenuItem[];
// }

// const SidebarContent: React.FC<SidebarContentProps> = ({ menuItems }) => {
//   const router = useRouter();
//   const [showSettings, setShowSettings] = useState(false);
//   const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar state

//   const handleNavigation = (href: string) => {
//     if (href) {
//       router.push(href);
//       if (isSidebarOpen) {
//         setSidebarOpen(false); // Close sidebar on navigation
//       }
//     }
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen); // Toggle the sidebar open/close
//   };

//   return (
//     <div className="flex h-full relative">
//       {/* Hamburger Menu Icon */}
//       <button onClick={toggleSidebar} className="absolute top-4 left-4 md:hidden p-4 z-50">
//         {isSidebarOpen ? (
//           <MdClose className="w-8 h-8 text-primary" /> // Close icon when sidebar is open
//         ) : (
//           <MdMenu className="w-8 h-8 text-primary" /> // Hamburger icon when sidebar is closed
//         )}
//       </button>

//       {/* Sidebar */}
//       <div className={`flex flex-col h-full bg-white shadow-lg fixed top-0 left-0 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
//         <div className="flex justify-between p-4">
//           <Image
//             src="/images/shawazilogo.png"
//             alt="Shawazi Logo"
//             className="w-20 md:w-16 lg:w-14 xl:w-20 mx-auto mb-4 mt-12"
//             width={80}
//             height={80}
//             priority
//           />
//         </div>

//         <nav className="flex-grow overflow-y-auto">
//           <ul className="space-y-6 px-4 py-8">
//             {menuItems.map((item) => (
//               <li key={item.name}>
//                 <button
//                   onClick={() => handleNavigation(item.href)}
//                   className="flex items-center w-full px-4 py-2 text-primary hover:bg-secondary-light rounded-lg transition-colors duration-200"
//                 >
//                   {item.icon}
//                   <span className="text-sm md:text-base lg:text-2xl font-medium">
//                     {item.name}
//                   </span>
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="mt-auto p-4">
//           <button
//             onClick={() => setShowSettings(!showSettings)}
//             className="flex items-center w-full px-4 py-2 text-[#562B00] hover:bg-orange-100 rounded-lg transition-colors duration-200"
//           >
//             <MdOutlineSettings className="w-6 h-6 mr-4" />
//             <span className="text-sm md:text-base lg:text-lg font-medium">
//               Settings
//             </span>
//           </button>
//           {showSettings && (
//             <div className="mt-2 ml-6">
//               <button
//                 onClick={() => handleNavigation('/settings')}
//                 className="block py-2 text-secondary hover:text-secondary transition-colors duration-200"
//               >
//                 General Settings
//               </button>
//               <button
//                 onClick={() => handleNavigation('/teaser/teasertwo')}
//                 className="block py-2 text-primary hover:text-red-600 transition-colors duration-200"
//               >
//                 <span className="flex items-center">
//                   <BiLogOut className="w-5 h-5 mr-2" />
//                   Logout
//                 </span>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SidebarContent;




'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineSettings, MdMenu, MdClose } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import Image from 'next/image';

interface MenuItem {
  name: string;
  icon: JSX.Element;
  href: string;
}

interface SidebarContentProps {
  menuItems: MenuItem[];
}

const SidebarContent: React.FC<SidebarContentProps> = ({ menuItems }) => {
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); 

  const handleNavigation = (href: string) => {
    if (href) {
      router.push(href);
      setSidebarOpen(false); // Close sidebar on navigation
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
  };

  return (
    <div className="relative h-full">
      {/* Hamburger Menu Icon */}
      <button onClick={toggleSidebar} className="absolute top-4 left-4 md:hidden p-4 z-50">
        {isSidebarOpen ? (
          <MdClose className="w-8 h-8 text-primary" />
        ) : (
          <MdMenu className="w-8 h-8 text-primary" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4">
          <Image
            src="/images/shawazilogo.png"
            alt="Shawazi Logo"
            className="w-20 mx-auto mb-4 mt-12"
            width={80}
            height={80}
            priority
          />
        </div>

        <nav className="flex-grow overflow-y-auto">
          <ul className="space-y-6 px-4 py-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigation(item.href)}
                  className="flex items-center w-full px-4 py-2 text-primary hover:bg-secondary-light rounded-lg transition-colors"
                >
                  {item.icon}
                  <span className="text-sm md:text-base lg:text-2xl font-medium">
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center w-full px-4 py-2 text-[#562B00] hover:bg-orange-100 rounded-lg transition-colors"
          >
            <MdOutlineSettings className="w-6 h-6 mr-4" />
            <span className="text-sm md:text-base lg:text-lg font-medium">
              Settings
            </span>
          </button>
          {showSettings && (
            <div className="mt-2 ml-6">
              <button
                onClick={() => handleNavigation('/settings')}
                className="block py-2 text-secondary hover:text-secondary transition-colors"
              >
                General Settings
              </button>
              <button
                onClick={() => handleNavigation('/teaser/teasertwo')}
                className="block py-2 text-primary hover:text-red-600 transition-colors"
              >
                <span className="flex items-center">
                  <BiLogOut className="w-5 h-5 mr-2" />
                  Logout
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default SidebarContent;









// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { MdOutlineSettings, MdMenu, MdClose } from "react-icons/md"; // Import hamburger and close icons
// import { BiLogOut } from "react-icons/bi";
// import Image from 'next/image';

// interface MenuItem {
//   name: string;
//   icon: JSX.Element;
//   href: string;
// }

// interface SidebarContentProps {
//   menuItems: MenuItem[];
// }

// const SidebarContent: React.FC<SidebarContentProps> = ({ menuItems }) => {
//   const router = useRouter();
//   const [showSettings, setShowSettings] = useState(false);
//   const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar state

//   const handleNavigation = (href: string) => {
//     if (href) {
//       router.push(href);
//     }
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen); // Toggle the sidebar open/close
//   };

//   return (
//     <div className="flex h-full relative">
//       {/* Hamburger Menu Icon */}
//       <button onClick={toggleSidebar} className="absolute top-4 left-4 md:hidden p-4 z-50">
//         {isSidebarOpen ? (
//           <MdClose className="w-8 h-8 text-primary" /> // Close icon when sidebar is open
//         ) : (
//           <MdMenu className="w-8 h-8 text-primary" /> // Hamburger icon when sidebar is closed
//         )}
//       </button>

//       {/* Sidebar */}
//       <div className={`flex flex-col h-full bg-white shadow-lg ${isSidebarOpen ? 'w-64' : 'w-0'} md:w-64 transition-width duration-300`}>
//         <div className="flex items-left justify-between p-4">
//           <Image
//             src="/images/shawazilogo.png"
//             alt="Shawazi Logo"
//             className="w-20 md:w-16 lg:w-14 xl:w-20 mx-auto mb-4 mt-12"
//             width={80}
//             height={80}
//             priority
//           />
//         </div>

//         <nav className="flex-grow overflow-y-auto">
//           <ul className="space-y-6 px-4 py-8">
//             {menuItems.map((item) => (
//               <li key={item.name}>
//                 <button
//                   onClick={() => handleNavigation(item.href)}
//                   className="flex items-center w-full px-4 py-2 text-primary hover:bg-secondary-light rounded-lg transition-colors duration-200"
//                 >
//                   {item.icon}
//                   <span className="text-sm md:text-base lg:text-2xl font-medium">
//                     {item.name}
//                   </span>
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="mt-auto p-4">
//           <button
//             onClick={() => setShowSettings(!showSettings)}
//             className="flex items-center w-full px-4 py-2 text-[#562B00] hover:bg-orange-100 rounded-lg transition-colors duration-200"
//           >
//             <MdOutlineSettings className="w-6 h-6 mr-4" />
//             <span className="text-sm md:text-base lg:text-lg font-medium">
//               Settings
//             </span>
//           </button>
//           {showSettings && (
//             <div className="mt-2 ml-6">
//               <button
//                 onClick={() => handleNavigation('/settings')}
//                 className="block py-2 text-secondary hover:text-secondary transition-colors duration-200"
//               >
//                 General Settings
//               </button>
//               <button
//                 onClick={() => handleNavigation('/teaser/teasertwo')}
//                 className="block py-2 text-primary hover:text-red-600 transition-colors duration-200"
//               >
//                 <span className="flex items-center">
//                   <BiLogOut className="w-5 h-5 mr-2" />
//                   Logout
//                 </span>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SidebarContent;



























































// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { MdOutlineSettings } from "react-icons/md";
// import { BiLogOut } from "react-icons/bi";

// interface MenuItem {
//   name: string;
//   icon: JSX.Element;
//   href: string;
// }

// interface SidebarContentProps {
//   menuItems: MenuItem[];
// }

// const SidebarContent: React.FC<SidebarContentProps> = ({ menuItems }) => {
//   const router = useRouter();
//   const [showSettings, setShowSettings] = useState(false);

//   const handleNavigation = (href: string) => {
//     if (href) {
//       router.push(href);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full relative">
//         //   const sidebarContent = (
//    <div className="flex flex-col h-full relative">
//       <div className="flex items-left justify-between p-4">
//         <Image
//           src="/images/shawazilogo.png"
//           alt="Shawazi Logo"
//           className="w-20 md:w-16 lg:w-14 xl:w-20 mx-auto mb-4 mt-12"
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
//                 className="flex items-center w-full px-4 py-2 text-primary hover:bg-secondary-light rounded-lg transition-colors duration-200"
//               >
//                 {item.icon}
//                 <span className="text-sm md:text-base lg:text-2xl font-medium">
//                   {item.name}
//                 </span>
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
//           <span className="text-sm md:text-base lg:text-lg font-medium">
//             Settings
//           </span>
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
//               onClick={() => handleNavigation('/teaser/teasertwo')}
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

// export default SidebarContent;

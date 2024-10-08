"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MdOutlineSettings } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi"; 
import { FaHome, FaUser, FaComments, FaFileContract, FaMoneyCheck } from 'react-icons/fa'; 
import { BiLogOut } from "react-icons/bi"; 



interface SideBarProps {
  userRole: string;
}

const SideBar: React.FC<SideBarProps> = ({ userRole }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setShowSidebar(width >= 768);
            if (width >= 768) {
                setIsOpen(true);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const menuItems = [
        { name: 'Home', icon: <FaHome className="w-5 h-5 mr-2" />, href: '/draft-contract' },
        { name: 'Profile', icon: <FaUser className="w-5 h-5 mr-2" />, href: '/profile' },
        { name: 'ChatRoom', icon: <FaComments className="w-5 h-5 mr-2" />, href: '/chatroom-page' },
        { name: 'Contract', icon: <FaFileContract className="w-5 h-5 mr-2" />, href: '/agreementNext' },
        { name: 'Transactions', icon: <FaMoneyCheck className="w-5 h-5 mr-2" />, href: '/transactions/transactions' },
    ];

    if (userRole === 'seller') {
        menuItems.push({ name: 'Seller Dashboard', icon: <FaUser className="w-5 h-5 mr-2" />, href: '/seller-dashboard' });
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const sidebarContent = (
        <div className="flex flex-col h-full relative">
            <div className="flex items-left justify-between p-4">
                <Image

                    src="/images/shawazilogo.png" 

                    alt="Shawazi Logo"
                    className="w-20 md:w-16 lg:w-14 xl:w-20 mx-auto mb-4 mt-12"
                    width={80}
                    height={80}
                    priority
                />
            </div>

            <nav className="flex-grow overflow-y-auto">
                <ul className="space-y-6 px-4 py-8">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={`flex items-center px-4 py-2 text-primary hover:bg-secondary-light rounded-lg transition-colors duration-200 ${
                                    pathname === item.href ? 'bg-orange-100 text-orange-600' : ''
                                }`}
                            >
                                {item.icon}
                                <span className="text-sm md:text-base lg:text-2xl font-medium">
                                    {item.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-auto p-4">
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="flex items-center w-full px-4 py-2 text-[#562B00] hover:bg-orange-100 rounded-lg transition-colors duration-200"
                >
                    <MdOutlineSettings className="w-6 h-6 mr-4" />
                    <span className="text-sm md:text-base lg:text-lg font-medium">
                        Settings
                    </span>
                </button>
                {showSettings && (
                    <div className="mt-2 ml-6">
                        <Link
                            href="/settings"
                            className="block py-2 text-secondary hover:text-secondary transition-colors duration-200"
                        >
                            General Settings
                        </Link>
                        <Link
                            href="/logout"
                            className="block py-2 text-primary hover:text-red-600 transition-colors duration-200"
                        >
                            <span className="flex items-center">
                                <BiLogOut className="w-5 h-5 mr-2" />
                                Logout
                            </span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="relative">
            <div className={`fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-4 z-50 ${showSidebar ? 'ml-64' : ''}`}>
                {!showSidebar && (
                    <button onClick={toggleMenu} className="focus:outline-none">
                        {isOpen ? (
                            <HiX className="w-8 h-8 text-[#562B00]" />
                        ) : (
                            <HiMenu className="w-8 h-8 text-[#562B00]" />
                        )}
                    </button>
                )}
                <span className="ml-4 text-lg font-semibold text-[#562B00]"></span>
            </div>

            <div
                className={`fixed top-0 left-0 h-full bg-white transition-all duration-300 ease-in-out 
                ${showSidebar || isOpen ? 'w-64' : 'w-0'} overflow-hidden border-r z-40`}
            >
                {sidebarContent}
            </div>

            <div className={`pt-16 ${showSidebar ? 'ml-64' : ''} transition-all duration-300`}>

            </div>
        </div>
    );
};

export default SideBar;














// "use client";
// import React, { useState, useCallback, useEffect } from "react";
// import useLandData from "@/app/hooks/useLandData";
// import LandDetailsModal from "../LandDetailModal";
// import SearchErrorModal from "../SearchError";

// const LandSearch: React.FC = () => {
//   const [query, setQuery] = useState<string>("");
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
//   const [parcelNumber, setParcelNumber] = useState<string>("");

//   const { land, loading, error } = useLandData(parcelNumber);

//   const handleSearch = useCallback(() => {
//     if (query.trim()) {
//       setParcelNumber(query.trim());
//       setQuery("");
//     }
//   }, [query]);
//   const handleClose = useCallback(() => {
//     setShowModal(false);
//     setShowErrorModal(false);
//     setQuery("");
//     setParcelNumber("");
//   }, []);

//   useEffect(() => {
//     if (!loading && parcelNumber) {
//       if (land) {
//         setShowModal(true); 
//         setShowErrorModal(false);
//       } else if (error) {
//         setShowErrorModal(true);
//         setShowModal(false);
//       }
//     }
//   }, [land, loading, error, parcelNumber]);

//   return (
//     <div className="container mx-auto p-4 ml-4 mr-6 md:ml-6 lg:ml-8">
//       <h1 className="text-xl md:text-2xl font-bold mb-4 text-[#562B00]">
//         Land Parcel Search
//       </h1>
//       <div className="flex flex-col sm:flex-row mb-4">
//         <input
//           type="text"
//           placeholder="Enter Parcel Number"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//           className="flex-grow p-2 border rounded-l mb-2 sm:mb-0 sm:rounded-l-none border-r-0"
//         />
//         <button
//           onClick={handleSearch}
//           disabled={loading || !query.trim()}
//           className="bg-[#508408] hover:bg-green-500 text-white font-bold m-auto py-2 px-4 rounded sm:rounded-l-none sm:rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? "Searching..." : "Search"}
//         </button>
//       </div>

//       {showModal && land && (
//         <LandDetailsModal 
//           land={land} 
//           onClose={handleClose}
//         />
//       )}

//       {showErrorModal && (
//         <SearchErrorModal
//           onClose={handleClose}
//           message={`The parcel number ${parcelNumber} does not match any land record. Please check the number and try again.`}
//         />
//       )}
//     </div>
//   );
// };

// export default LandSearch;


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineSettings } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi"; 
import { FaHome, FaUser, FaComments, FaFileContract, FaMoneyCheck } from 'react-icons/fa'; 
import { BiLogOut } from "react-icons/bi"; 
import Image from 'next/image';

const SideBar = () => {
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
        { name: 'Home', icon: <FaHome className="w-5 h-5 mr-2" />, href: '/' },
        { name: 'Profile', icon: <FaUser className="w-5 h-5 mr-2" />, href: '/contracts' },
        { name: 'ChatRoom', icon: <FaComments className="w-5 h-5 mr-2" />, href: '/payments' },
        { name: 'Contract', icon: <FaFileContract className="w-5 h-5 mr-2" />, href: '/users' },
        { name: 'Transactions', icon: <FaMoneyCheck className="w-5 h-5 mr-2" />, href: '/users' },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const sidebarContent = (
        <div className="flex flex-col h-full relative">
            <div className="flex items-left justify-between p-4">
                <Image
                    src="/media/logo.png"
                    alt="Shawazi Logo"
                    className="w-20 md:w-16 lg:w-14 xl:w-20 mx-auto mb-4 mt-12"
                />
            </div>

            <nav className="flex-grow overflow-y-auto">
                <ul className="space-y-6 px-4 py-8">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={`flex items-center px-4 py-2 text-[#562B00] hover:bg-orange-100 rounded-lg transition-colors duration-200 ${
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
                ${showSidebar || isOpen ? 'w-64' : 'w-0'} overflow-hidden border-r border-gray-300 shadow-[4px_0px_10px_-2px_rgba(87,_50,_0,_0.5)] z-40`}
            >
                {sidebarContent}
            </div>

           
            <div className={`pt-16 ${showSidebar ? 'ml-64' : ''} transition-all duration-300`}>
                
            </div>
        </div>
    );
};

export default SideBar;
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { IoStatsChartSharp } from "react-icons/io5";
import { MdOutlinePayments, MdOutlineSettings } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { LiaFileContractSolid } from "react-icons/lia";
import { BiLogOut } from "react-icons/bi";
import { usePathname } from 'next/navigation';
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const pathname = usePathname();
    const menuItems = [
        { name: 'Dashboard', icon: <IoStatsChartSharp  className="w-8 h-8 mr-4"/>, href: '/' },
        { name: 'Contracts', icon: <LiaFileContractSolid className="w-8 h-8 mr-4"/>, href: '/ContractsChart' },
        { name: 'Payments', icon: <MdOutlinePayments className="w-8 h-8 mr-4"/>, href: '/PaymentsCharts' },
        { name: 'Users', icon: <LuUsers2 className="w-8 h-8 mr-4"/>, href: '/UsersCharts' },
    ];
    return (
            <div className={`fixed top-0 left-0 h-full shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'w-72' : 'w-0'} md:w-72 overflow-hidden`}>
                <div className="flex flex-col h-full">
                    <div className="p-6 text-center">
                        <img src="/media/logo.png" alt="Shawazi Logo" className="w-[40%] mx-auto mb-4 mt-3" />
                        <h1 className="text-3xl font-bold text-secondary">Shawazi</h1>
                    </div>
                    <nav className="flex-grow ">
                        <ul className="space-y-10 px-6 py-16">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className={`flex items-center px-6 py-3 text-[#562B00] hover:bg-secondary-light rounded-lg transition-colors duration-200 ${pathname === item.href ? 'bg-orange-100 text-orange-600' : ''}`}>
                                        {item.icon}
                                        <span className="text-2xl font-medium">{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="mb-10 p-6">
                        <button onClick={() => setShowSettings(!showSettings)} className="flex items-center w-full px-6 py-3 text-[#562B00] hover:bg-orange-100 rounded-lg transition-colors duration-200">
                            <MdOutlineSettings className="w-6 h-6 mr-4" />
                            <span className=" text-2xl font-medium">Settings</span>
                        </button>
                        {showSettings && (
                            <div className="mt-2 ml-10">
                                <Link href="/settings" className="block py-2 text-secondary hover:text-secondary transition-colors duration-200">General Settings</Link>
                                <Link href="/logout" className="block py-2 text-primary hover:text-red-600 transition-colors duration-200">
                                    <span className="flex items-center">
                                        <BiLogOut className="w-5 h-5 mr-2" />
                                        Logout
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    );
};
export default Sidebar;
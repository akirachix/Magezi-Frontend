

'use client';

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
      setSidebarOpen(false); 
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); 
  };

  return (
    <div className="relative h-full">

      <button onClick={toggleSidebar} className="absolute top-4 left-4 md:hidden p-4 z-50">
        {isSidebarOpen ? (
          <MdClose className="w-8 h-8 text-primary" />
        ) : (
          <MdMenu className="w-8 h-8 text-primary" />
        )}
      </button>

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
            className="flex items-center w-full mt-[100%] px-4 py-2 text-primary hover:bg-orange-100 rounded-lg transition-colors"
          >
            <MdOutlineSettings className="w-6 h-6 mr-4" />
            <span className="text-sm md:text-base lg:text-lg font-medium">
              Settings
            </span>
          </button>
          {showSettings && (
            <div className="mt-2 ml-6">
              <button
                onClick={() => handleNavigation('/teaser/teaserone')}
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
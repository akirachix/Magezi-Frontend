"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { MdOutlineSettings } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { FaHome, FaUser, FaComments, FaFileContract, FaMoneyCheck } from 'react-icons/fa';
import { BiLogOut } from "react-icons/bi";
import Cookies from 'js-cookie';
interface SideBarProps {
  userRole: string;
}
interface MenuItem {
  name: string;
  icon: JSX.Element;
  href: string;
}
interface RoleSpecificRoutes {
  seller: {
    home: string;
    contract: string;
  };
  buyer: {
    home: string;
    contract: string;
  };
  lawyer: {
    home: string;
    contract: string;
  };
}
const SideBar: React.FC<SideBarProps> = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const roleSpecificRoutes: RoleSpecificRoutes = React.useMemo(() => ({
    seller: {
      home: '/seller/seller-page',
      contract: '/agreementNext',
    },
    buyer: {
      home: '/buyer/land-display',
      contract: '/agreementNext',
    },
    lawyer: {
      home: '/lawyer/draft-contract',
      contract: '/agreementNext',
    }
  }), []);
  const getRoutes = useCallback((role: string): { home: string; contract: string } => {
    const validRole = role.toLowerCase() as keyof RoleSpecificRoutes;
    if (validRole in roleSpecificRoutes) {
      return roleSpecificRoutes[validRole];
    } else {
      console.error(`Unknown user role: ${role}`);
      return roleSpecificRoutes.seller;
    }
  }, [roleSpecificRoutes]);
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
  useEffect(() => {
    const savedUserRole = Cookies.get('userRole');
    if (savedUserRole && savedUserRole !== userRole) {
      router.push(getRoutes(savedUserRole).home);
    }
  }, [userRole, router, getRoutes]);
  const routes = getRoutes(userRole);
  const baseMenuItems: MenuItem[] = [
    { name: 'Profile', icon: <FaUser className="w-5 h-5 mr-2" />, href: '/profile' },
    { name: 'ChatRoom', icon: <FaComments className="w-5 h-5 mr-2" />, href: '/chatroom-page' },
    { name: 'Contract', icon: <FaFileContract className="w-5 h-5 mr-2" />, href: routes.contract },
    { name: 'Transactions', icon: <FaMoneyCheck className="w-5 h-5 mr-2" />, href: '/transactions/transactions' },
  ];
  const getRoleSpecificItems = (): MenuItem[] => {
    return [
      { name: 'Home', icon: <FaHome className="w-5 h-5 mr-2" />, href: routes.home },
    ];
  };
  const menuItems = [...getRoleSpecificItems(), ...baseMenuItems];
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleNavigation = (href: string) => {
    if (href) {
      router.push(href);
    }
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
              <button
                onClick={() => handleNavigation(item.href)}
                className={`flex items-center w-full px-4 py-2 text-primary hover:bg-secondary-light rounded-lg transition-colors duration-200 ${
                  pathname === item.href ? 'bg-orange-100 text-orange-600' : ''
                }`}
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
          className="flex items-center w-full px-4 py-2 text-[#562B00] hover:bg-orange-100 rounded-lg transition-colors duration-200"
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
              className="block py-2 text-secondary hover:text-secondary transition-colors duration-200"
            >
              General Settings
            </button>
            <button
              onClick={() => handleNavigation('/teaser/teasertwo')}
              className="block py-2 text-primary hover:text-red-600 transition-colors duration-200"
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
        <span className="ml-4 text-lg font-semibold text-[#562B00]">
          {userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Portal` : 'Portal'}
        </span>
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
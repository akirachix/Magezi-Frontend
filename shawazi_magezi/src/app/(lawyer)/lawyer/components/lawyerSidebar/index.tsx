// import SidebarContent from '@/app/sidebarcontent/page';
import SidebarContent from '@/app/components/Sidebarcontent';
import React from 'react';
import { FaHome, FaUser, FaComments, FaFileContract, FaMoneyCheck } from 'react-icons/fa';
const LawyerSidebar: React.FC = () => {
  const menuItems = [
    { name: 'Home', icon: <FaHome className="w-5 h-5 mr-2" />, href: '/lawyer/draft-contract' },
    { name: 'Profile', icon: <FaUser className="w-5 h-5 mr-2" />, href: '/lawyer/profile' },
    { name: 'ChatRoom', icon: <FaComments className="w-5 h-5 mr-2" />, href: '/lawyer/chatroom-page' },
    { name: 'Contract', icon: <FaFileContract className="w-5 h-5 mr-2" />, href: '/lawyer/components/agreementnext' },
    { name: 'Transactions', icon: <FaMoneyCheck className="w-5 h-5 mr-2" />, href: '/lawyer/transactions/transactions' },
  ];
    return <SidebarContent menuItems={menuItems} />;
};
export default LawyerSidebar;
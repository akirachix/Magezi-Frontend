import SidebarContent from '@/app/components/Sidebarcontent';
import React from 'react';
import { FaHome, FaUser, FaComments, FaFileContract, FaMoneyCheck } from 'react-icons/fa';


const SellerSidebar: React.FC = () => {
  const menuItems = [
    { name: 'Home', icon: <FaHome className="w-5 h-5 mr-2" />, href: '/seller/seller-page' },
    { name: 'Profile', icon: <FaUser className="w-5 h-5 mr-2" />, href: '/seller/profile' },
    { name: 'ChatRoom', icon: <FaComments className="w-5 h-5 mr-2" />, href: '/seller/chatroom-page' },
    { name: 'Contract', icon: <FaFileContract className="w-5 h-5 mr-2" />, href: '/seller/agreementnext' },
    { name: 'Transactions', icon: <FaMoneyCheck className="w-5 h-5 mr-2" />, href: '/seller/transactions/transactions' },
  ];
  return <SidebarContent menuItems={menuItems} />;
};
export default SellerSidebar;










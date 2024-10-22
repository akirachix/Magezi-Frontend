// import SidebarContent from '@/app/sidebarcontent/page';
import SidebarContent from '@/app/components/Sidebarcontent';
import { FaHome, FaUser, FaComments, FaFileContract, FaMoneyCheck } from 'react-icons/fa';

const BuyerSidebar: React.FC = () => {
  const menuItems = [
    { name: 'Home', icon: <FaHome className="w-5 h-5 mr-2" />, href: '/buyer/land-display' },
    { name: 'Profile', icon: <FaUser className="w-5 h-5 mr-2" />, href: '/buyer/profile' },
    { name: 'ChatRoom', icon: <FaComments className="w-5 h-5 mr-2" />, href: '/buyer/chatroom-page' },
    { name: 'Contract', icon: <FaFileContract className="w-5 h-5 mr-2" />, href: '/buyer/components/agreementnext' },
    { name: 'Transactions', icon: <FaMoneyCheck className="w-5 h-5 mr-2" />, href: '/buyer/transactions/transactions' },
  ];
  return <SidebarContent menuItems={menuItems} />;
};
export default BuyerSidebar;
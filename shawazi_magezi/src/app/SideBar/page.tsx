import BuyerSidebar from "../(buyer)/buyer/components/BuyerSidebar";
import LawyerSidebar from "../(lawyer)/lawyer/components/LawyerSidebar";
import SellerSidebar from "../(seller)/seller/components/SellerSidebar";

interface SidebarProps {
  userRole: 'buyer' | 'seller' | 'lawyer'; 
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  if (userRole === 'buyer') return <BuyerSidebar />;
  if (userRole === 'seller') return <SellerSidebar />;
  if (userRole === 'lawyer') return <LawyerSidebar />;
  return null; 
};

export default Sidebar;

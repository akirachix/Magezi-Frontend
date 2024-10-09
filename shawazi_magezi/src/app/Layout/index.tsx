import React from "react";

interface LayoutProps {
  children: React.ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
       
        <div className="flex-grow p-4">
          
         
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

// 'use client';

// import React from 'react';

// export default function Layout({ children }: { children: React.ReactNode }) {
//     return (
//         <div className="flex min-h-screen">
//     <Layout>
//     <div>     
//             </div>

//             <div className="flex-grow p-4">
//                 {children}
//             </div>

//       </Layout>
           
//       </div>
//     );
// }


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

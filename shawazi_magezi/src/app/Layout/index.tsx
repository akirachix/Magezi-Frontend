import React from "react";
import Sidebar from "../components/Sidebar";
import WelcomeSection from "../components/Lawyer/draft-contract";
// import UserProfileComponent from "../components/Profile";

const Layout = ({ children, userId = 40 }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        {/* <Sidebar /> */}
        <div className="flex-grow p-4">
          <WelcomeSection />
          {/* <UserProfileComponent />  */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;


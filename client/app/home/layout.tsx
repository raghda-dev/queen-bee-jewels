// // app/main/layout.tsx

import React from "react";
import "../../styles/global.scss";
import Header from "@/components/Header.tsx";
import Sidebar from "@/components/Sidebar.tsx";
import CategoryNav from "@/components/CategoryNav";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header/>
        <div className="flex flex-grow">
          {/* Sidebar */}
          <Sidebar />

          {/* Right Section with CategoryNav + Content */}
          <div className="flex flex-col min-w-[70vw] flex-grow">
            <CategoryNav />
            <div className="flex-grow">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default MainLayout;

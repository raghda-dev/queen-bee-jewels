
'use client';
// app/(main)/home/layout.tsx
import React,{ useEffect } from "react";
import "../../styles/global.scss";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CategoryNav from "../components/CategoryNav";
import { usePathname } from "next/navigation";


export const previousPageRef = { current: null as string | null }; // shared object

const HomeLayout = ({
  children,
  modal, // parallel route slot for modals
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {

  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith('/home/settings') && !pathname.startsWith('/home/cart')) {
      previousPageRef.current = pathname;
    }
  }, [pathname]);

  return (
    // <html lang="en">
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-grow">
          <Sidebar />
          <div className="flex flex-col min-w-[70vw] flex-grow relative">
            <CategoryNav />
            <div className="flex-grow">{children}</div>

            {/* Modal will be rendered here, on top of page content */}
            {modal}
          </div>
        </div>
      </div>
    // </html>
  );
};

export default HomeLayout;

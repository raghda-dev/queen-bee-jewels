// app/(main)/home/layout.tsx

'use client';

import React from 'react';
import '../../styles/global.scss';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CategoryNav from '../components/CategoryNav';
import useModalRefreshRedirect from '../hooks/useModalRefreshRedirect';

export default function HomeLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  // Handle modal fallback redirect logic on refresh
  useModalRefreshRedirect(children);

  return (
    <div className="flex min-h-screen min-w-fit flex-col">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="relative flex flex-grow flex-col">
          <CategoryNav />
          <div className="flex-grow">{children}</div>
          {modal}
        </div>
      </div>
    </div>
  );
}

// client/app/(main)/home/layout.tsx

'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CategoryNav from '../components/CategoryNav';
import ProductsList from './ProductsList';
import useModalRefreshRedirect from '../hooks/useModalRefreshRedirect';



export default function HomeLayout({ children, modal }: { children: React.ReactNode; modal?: React.ReactNode }) {
  useModalRefreshRedirect(children);
  const pathname = usePathname() ?? '/home';
  const segments = pathname.split('/').filter(Boolean); // e.g. ['home', 'silver']
  const pageKey = segments[1] ?? 'home';

  // read the page's filteredProducts for the main grid in layout
  const filteredProducts = useSelector((state: RootState) => state.sidebar.pages[pageKey]?.filteredProducts ?? []);

  return (
    <div className="flex min-h-screen min-w-fit flex-col">
      <Header />
      <div className="flex flex-grow">
        <Sidebar page={pageKey} />
        <div className="relative flex flex-grow flex-col">
          <CategoryNav />
          <div className="flex-grow flex justify-around space-x-6">
            <ProductsList products={filteredProducts} />
            {children}
          </div>
          {modal}
        </div>
      </div>
    </div>
  );
}

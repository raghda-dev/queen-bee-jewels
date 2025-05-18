// app/(main)/home/layout.tsx

'use client';

import React, { useEffect, Children } from "react";
import "../../styles/global.scss";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CategoryNav from "../components/CategoryNav";
import { usePathname, useRouter } from "next/navigation";

export const previousPageRef = { current: null as string | null };



export default function HomeLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
  const isModal = pathname.startsWith('/home/settings') || pathname.startsWith('/home/cart');
  const childCount = Children.count(children);

  const hasRefreshed = sessionStorage.getItem('has-refreshed');

  if (!isModal) {
    previousPageRef.current = pathname;
    localStorage.setItem('previousPath', pathname);
  }

  if (isModal && childCount === 0 && !hasRefreshed) {
    const saved = localStorage.getItem('previousPath') || '/home';
    const modalSuffix = pathname.replace(/^\/home/, '');
    sessionStorage.setItem('has-refreshed', 'true'); // Avoid redirect loops
    router.replace(saved + modalSuffix);
  }

  // Reset flag on normal navigation
  return () => {
    sessionStorage.removeItem('has-refreshed');
  };
}, [pathname, children, router]);


  // useEffect(() => {
  //   const isModal = pathname.startsWith('/home/settings') || pathname.startsWith('/home/cart');
  //   const childCount = Children.count(children);

  //   // 1) If we’re _not_ in a modal route, stash the last “main” page.
  //   if (!isModal) {
  //     previousPageRef.current = pathname;
  //     localStorage.setItem('previousPath', pathname);
  //   }

  //   // 2) **On a hard-refresh** in a modal route, children will be empty — so
  //   //    detect that and rehydrate the main slot by pushing a composed URL:
  //   if (isModal && childCount === 0) {
  //     const saved = localStorage.getItem('previousPath');
  //     if (saved) {
  //       // strip the leading `/home` off our modal path, then re-append it
  //       const modalSuffix = pathname.replace(/^\/home/, '');
  //       router.replace(saved + modalSuffix);
  //     }
  //   }
  // }, [pathname, children, router]);

  return (
    <div className="min-h-screen min-w-fit flex flex-col">
      <Header/>
      <div className="flex flex-grow">
        <Sidebar/>
        <div className="flex flex-col flex-grow relative">
          <CategoryNav/>
          <div className="flex-grow">{children}</div>
          {modal}
        </div>
      </div>
    </div>
  );
}

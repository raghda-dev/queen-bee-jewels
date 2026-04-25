// client/app/(main)/utils/RouteTracker.tsx


'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { previousPageRef } from './previousPageRef';

export function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // ✅ Don’t store modal routes as previous
    const isModal = pathname.includes('/cart') || pathname.includes('/wishlist');

    if (!isModal && !pathname.startsWith('/home/settings')) {
      previousPageRef.current = pathname;
      localStorage.setItem('previousPath', pathname);
    }
  }, [pathname]);

  return null;
}


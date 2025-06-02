// app/(main)/utils/useTrackPreviousPath.ts
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function useTrackPreviousPath() {
  const pathname = usePathname();

  useEffect(() => {
    const isModalPath = pathname.startsWith('/home/settings') || pathname.startsWith('/home/cart');

    if (!isModalPath) {
      localStorage.setItem('previousPath', pathname);
    }
  }, [pathname]);
}

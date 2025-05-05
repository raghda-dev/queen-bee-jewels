'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { previousPageRef } from '../utils/previousPageRef';

export function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith('/home/settings')) {
      previousPageRef.current = pathname;
    }
  }, [pathname]);

  return null; // No UI, just tracking
}

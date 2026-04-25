// client/app/(main)/utils/usePrevPath.ts

'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { previousPageRef } from './previousPageRef';

export default function usePreviousPath(defaultPath = '/home') {
  const pathname = usePathname();
  const [previousPath, setPreviousPath] = useState(defaultPath);

  useEffect(() => {
    const inMemory = previousPageRef.current;
    const stored = localStorage.getItem('previousPath');

    if (inMemory && inMemory !== pathname) {
      setPreviousPath(inMemory);
    } else if (stored && stored !== pathname) {
      setPreviousPath(stored);
    }
  }, [pathname]);

  return previousPath;
}



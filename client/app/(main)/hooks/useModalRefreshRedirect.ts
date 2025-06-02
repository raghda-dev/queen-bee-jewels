// app/(main)/utils/useModalRefreshRedirect.ts
'use client';

import { useEffect, Children } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function useModalRefreshRedirect(children: React.ReactNode) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isModal =
      pathname.startsWith('/home/settings') || pathname.startsWith('/home/cart');
    const childCount = Children.count(children);
    const hasRefreshed =
      typeof window !== 'undefined' && sessionStorage.getItem('has-refreshed');

    if (!isModal) {
      localStorage.setItem('previousPath', pathname);
      sessionStorage.removeItem('has-refreshed');
      return;
    }

    if (isModal && childCount === 0 && !hasRefreshed) {
      sessionStorage.setItem('has-refreshed', 'true');

      let saved = localStorage.getItem('previousPath') || '/home';
      if (
        saved.startsWith('/home/settings') ||
        saved.startsWith('/home/cart')
      ) {
        saved = '/home';
      }

      router.replace(saved);
    }
  }, [pathname, children, router]);
}

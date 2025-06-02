
// app/(main)/home/settings/chat/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function CardsRefreshRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const previousPath = localStorage.getItem('previousPath') || '/home';

    // Only redirect if we're here due to a browser refresh
    if (pathname === '/home/settings/chat') {
      router.replace(previousPath);
    }
  }, [pathname, router]);

  return null;
}

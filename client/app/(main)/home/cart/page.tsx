// app/(main)/home/cart/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartRefreshRedirect() {
  const router = useRouter();

  useEffect(() => {
    const prev = localStorage.getItem('previousPath') || '/home';
    router.replace(prev);
  }, [router]);

  return null;
}

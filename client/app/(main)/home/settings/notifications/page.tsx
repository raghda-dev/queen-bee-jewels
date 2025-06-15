// app/(main)/home/settings/notifications/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsRefreshRedirect() {
  const router = useRouter();

  useEffect(() => {
    const prev = localStorage.getItem('previousPath') || '/home';
    router.replace(prev);
  }, [router]);
  
  return null;
}

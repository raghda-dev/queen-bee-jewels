// app/(main)/home/@modals/cart/layout.tsx
//🛒 

'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function CartLayout({ children }: { children: ReactNode }) {

  const pathname = usePathname();

    // Only render the modal when we are on /home/cart/*
    if (!pathname.startsWith('/home/cart')) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white w-[70vw] max-h-[80vh] overflow-auto rounded-2xl shadow-2xl">
          {children}
        </div>
      </div>
    );
}

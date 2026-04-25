// client/app/(main)/components/WishlistCounter.tsx

'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';
import Link from 'next/link';

export type WishlistCounterProps = {
  onClick?: () => void;
  href?: string;
};

const WishlistCounter: React.FC<WishlistCounterProps> = ({ onClick, href = '/home/wishlist' }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const serverCount = useSelector((s: RootState) => s.wishlist.items.length);
  const guestCount = useSelector((s: RootState) => (s.wishlist.guestItems ? s.wishlist.guestItems.length : 0));
  const count = user ? serverCount : guestCount;

  const content = (
    <span className="ml-1 inline-flex transition-all p-3 md:p-4 h-16 w-16 md:h-20 md:w-20 items-center justify-center space-x-2 rounded-full border border-orangeRich text-md md:text-xl font-normal md:font-semibold text-orangeRich">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-9 w-16 text-navyDark"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
           2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
           14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
           6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span>{count}</span>
    </span>
  );

  if (onClick) {
    return (
      <button
        type="button"
        aria-label="Open wishlist drawer"
        onClick={onClick}
        className="relative inline-flex items-center w-52 h-40"
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className="relative inline-flex items-center w-52 h-40">
      {content}
    </Link>
  );
};

export default WishlistCounter;

// client/app/(main)/components/CartCounter.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/redux/store';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export type CartCounterProps = {
  onClick?: () => void;
  href?: string;
};

const CartCounter: React.FC<CartCounterProps> = ({ onClick, href = '/home/cart' }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const serverCount = useSelector((s: RootState) =>
    s.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const guestCount = useSelector((s: RootState) =>
    s.cart.guestItems ? s.cart.guestItems.reduce((sum, i) => sum + i.quantity, 0) : 0
  );

  // Track hydration so server and client render the same initially
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent mismatch: render 0 until mounted
  const count = isMounted ? (user ? serverCount : guestCount) : 0;

  const content = (
    <span className="ml-1 inline-flex transition-all p-3 md:p-4 h-16 w-16 md:h-20 md:w-20 items-center justify-center space-x-2 rounded-full border border-orangeRich text-md md:text-xl font-normal md:font-semibold text-orangeRich">
      <ShoppingCart className="h-11 w-20 text-navyDark" />
      <span>{count}</span>
    </span>
  );

  if (onClick) {
    return (
      <button
        type="button"
        aria-label="Open cart drawer"
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

export default CartCounter;

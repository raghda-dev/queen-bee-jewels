// client/app/collections/[slug]/layout.tsx

'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartCounter from 'app/(main)/components/CartCounter';
import WishlistCounter from 'app/(main)/components/WishlistCounter';
import GuestCartDrawer from 'app/(main)/components/GuestCartDrawer';
import GuestWishlistDrawer from 'app/(main)/components/GuestWishlistDrawer';
import Button from '../../(main)/components/Button';

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const wishlistCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cart helpers
  const openCart = () => {
    if (cartCloseTimeoutRef.current) clearTimeout(cartCloseTimeoutRef.current);
    setIsCartOpen(true);
    setIsWishlistOpen(false); // close wishlist when opening cart
  };
  const closeCartDelayed = () => {
    if (cartCloseTimeoutRef.current) clearTimeout(cartCloseTimeoutRef.current);
    cartCloseTimeoutRef.current = setTimeout(() => setIsCartOpen(false), 1200);
  };
  const toggleCart = () => {
    if (cartCloseTimeoutRef.current) clearTimeout(cartCloseTimeoutRef.current);
    setIsCartOpen((prev) => !prev);
    if (!isCartOpen) setIsWishlistOpen(false);
  };

  // Wishlist helpers
  const openWishlist = () => {
    if (wishlistCloseTimeoutRef.current)
      clearTimeout(wishlistCloseTimeoutRef.current);
    setIsWishlistOpen(true);
    setIsCartOpen(false); // close cart when opening wishlist
  };
  const closeWishlistDelayed = () => {
    if (wishlistCloseTimeoutRef.current)
      clearTimeout(wishlistCloseTimeoutRef.current);
    wishlistCloseTimeoutRef.current = setTimeout(
      () => setIsWishlistOpen(false),
      1200
    );
  };
  const toggleWishlist = () => {
    if (wishlistCloseTimeoutRef.current)
      clearTimeout(wishlistCloseTimeoutRef.current);
    setIsWishlistOpen((prev) => !prev);
    if (!isWishlistOpen) setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-white py-6 sm:px-10">
      {/* Top bar */}
      <div className="relative flex items-center justify-evenly">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/staticAssets/images/logo.svg"
              alt="Logo"
              width={100}
              height={70}
              className="w-28 transition-all sm:w-32 lg:w-40"
            />
          </Link>
        </div>
        {/* Counters */}
        <div className="mr-[-4rem] ml-10">
        <div>
        <div className="flex w-fit justify-evenly">
          {/* Inner wrapper to hold the counters with negative spacing */}
          <div className="relative flex justify-center">
            <div className="flex items-center justify-center space-x-[-9rem] md:space-x-[-8rem]">
              {/* Cart */}
              <div
                className="relative"
                onMouseEnter={openCart}
                onMouseLeave={closeCartDelayed}
              >
                <CartCounter onClick={toggleCart} />
                {isCartOpen && (
                  <div
                    className="absolute right-0 z-50 mt-2"
                    onMouseEnter={openCart}
                    onMouseLeave={closeCartDelayed}
                  >
                    <GuestCartDrawer
                      isOpen={isCartOpen}
                      onClose={() => setIsCartOpen(false)}
                    />
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <div
                className="relative"
                onMouseEnter={openWishlist}
                onMouseLeave={closeWishlistDelayed}
              >
                <WishlistCounter onClick={toggleWishlist} />
                {isWishlistOpen && (
                  <div
                    className="absolute right-0 z-50 mt-2"
                    onMouseEnter={openWishlist}
                    onMouseLeave={closeWishlistDelayed}
                  >
                    <GuestWishlistDrawer
                      isOpen={isWishlistOpen}
                      onClose={() => setIsWishlistOpen(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        {/* Back to Shop */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Button
              size="large"
              variant="textButton"
              color="var(--pinkish)"
              animation="text-underline"
              underlineDirection="from-right"
              rightIcon={<span>←</span>}
            >
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
}

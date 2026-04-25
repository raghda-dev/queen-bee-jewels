// client/app/(main)/components/GuestCartDrawer.tsx


'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Button from './Button';
import { useAppDispatch, useAppSelector } from '../lib/redux/hooks';
import {
  incrementGuestQuantity,
  decrementGuestQuantity,
} from '../lib/redux/cart/cartSlice';
import { removeFromGuestCart as removeFromGuestCartThunk, loadGuestCartFromStorage } from '../lib/redux/cart/cartActions';

interface GuestCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuestCartDrawer({ isOpen, onClose }: GuestCartDrawerProps) {
  const dispatch = useAppDispatch();
  const guestItems = useAppSelector((state) => state.cart.guestItems);

  // Ensure guest cart is loaded from localStorage when this drawer (or app) mounts
  useEffect(() => {
    dispatch(loadGuestCartFromStorage());
  }, [dispatch]);

  const handleRemove = (id: string) => {
    // dispatch the thunk that updates localStorage and returns the numeric id
    dispatch(removeFromGuestCartThunk(id));
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-full flex-col bg-grayMedium shadow-lg transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-80 md:w-[20rem] xl:w-[25rem]`}
    >
      <div className="flex items-center justify-between border-b border-grayDark p-5">
        <h2 className="font-josefin text-xl font-extrabold">Your Cart</h2>
        <button onClick={onClose}><X size={20} className="text-black" /></button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-5">
        {guestItems && guestItems.length > 0 ? (
          guestItems.map((item) => (
            <div key={String(item.id)} className="flex items-center space-x-4">
              <Image
                src={item.imageUrl || '/staticAssets/images/placeholder.png'}
                alt={item.name || 'product'}
                width={64}
                height={64}
                className="rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="line-clamp-1 text-lg font-normal">{item.name}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <button onClick={() => dispatch(decrementGuestQuantity(item.id))} className="rounded bg-grayLight px-2 py-1">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(incrementGuestQuantity(item.id))} className="rounded bg-grayLight px-2 py-1">+</button>

                  <button onClick={() => handleRemove(item.id)} aria-label="Remove">
                    <Trash2 className="h-5 w-5 text-orangeRich transition-transform duration-300 hover:scale-125" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-grayDark">Your cart is empty</p>
        )}
      </div>

      <div className="border-t border-grayDark p-5">
        <Link href="/collections/auth/login">
          <Button size="small" shape="rectangle" color="var(--muted-red)" className="w-full">
            Login to Checkout
          </Button>
        </Link>
      </div>
    </aside>
  );
}

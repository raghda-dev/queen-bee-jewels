// client/app/(main)/components/GuestWishlistDrawer.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../lib/redux/store';
import Button from './Button';
import {
  removeFromGuestWishlist,
  loadGuestWishlistFromStorage,
  moveToCartAsync,
} from '../lib/redux/wishlist/wishlistActions';


interface GuestWishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GuestWishlistDrawer({ isOpen, onClose }: GuestWishlistDrawerProps) {
  const guestItems = useSelector((state: RootState) => state.wishlist.guestItems);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    // ensure guest wishlist loaded into redux (optional, safe to call multiple times)
    dispatch(loadGuestWishlistFromStorage());
  }, [dispatch]);

  const handleRemove = (id: string) => {
    // remove from guestWishlist localStorage + redux via thunk
    dispatch(removeFromGuestWishlist(id));
  };

  const handleMoveToCart = async (id: string) => {
    // uses moveToCartAsync thunk which handles guest flow (adds to guestCart & removes from guestWishlist)
    await dispatch(moveToCartAsync(id));
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-full flex-col bg-grayMedium shadow-lg transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-80 md:w-[20rem] xl:w-[25rem]`}
    >
      <div className="flex items-center justify-between border-b border-grayDark p-5">
        <h2 className="font-josefin text-xl font-extrabold">Wishlist</h2>
        <button onClick={onClose}>
          <X size={20} className="text-black" />
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-5">
        {guestItems && guestItems.length > 0 ? (
          guestItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-md bg-grayLight" />
              )}
              <div className="flex-1">
                <p className="line-clamp-1 text-lg font-normal">{item.name || 'Unnamed product'}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <Button size="small" variant="textButton" onClick={() => handleMoveToCart(item.id)}>
                    Move to cart
                  </Button>
                  <button onClick={() => handleRemove(item.id)} className="ml-2">
                    <Trash2 className="h-5 w-5 text-orangeRich transition-transform duration-300 hover:scale-125" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-grayDark">Your wishlist is empty</p>
        )}
      </div>

      <div className="border-t border-grayDark p-5">
        <Link href="/collections/auth/login">
          <Button size="small" shape="rectangle" color="var(--muted-red)" className="w-full">
            Login to Save Wishlist
          </Button>
        </Link>
      </div>
    </aside>
  );
}

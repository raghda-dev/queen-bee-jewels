//client/app/(main)/components/AddToWishlistButton.tsx

'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../lib/redux/hooks';
import { addToWishlistAsync } from '../lib/redux/wishlist/wishlistActions';
import Button from './Button';
import { ShopifyProduct } from '../../../../lib/shopify/products/types';

type Props = { product: ShopifyProduct };

const AddToWishlistButton: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleAdd = async (): Promise<void> => {
    const numericId = product.id.includes('/') ? product.id.split('/').pop()! : product.id;

    try {
      // Guest UX guard: don't dispatch if guest cart already contains the product.
      // This is a lightweight client-side check; thunks still validate and will show toasts.
      if (!user && typeof window !== 'undefined') {
        try {
          const rawGuestCart = localStorage.getItem('guestCart');
          if (rawGuestCart) {
            const parsed = JSON.parse(rawGuestCart) as Array<{ id: string }>;
            const inGuestCart = parsed.some((ci) => {
              const iid = String(ci.id);
              return iid === product.id || iid.includes(numericId) || iid === numericId;
            });
            if (inGuestCart) {
              // Do NOT toast here; thunks are responsible for notifications.
              return;
            }
          }
        } catch (_err) {
          // If reading localStorage fails, continue — the thunk will validate and notify.
        }
      }

      // Dispatch thunk — do NOT unwrap() to avoid throwing in component.
      await dispatch(addToWishlistAsync(product.id));
      // Thunk will handle success/failure notifications.
    } catch (err) {
      // Internal/unexpected error — keep console log only.
      console.error('AddToWishlistButton unexpected error', err);
    }
  };

  return (
    <Button
      variant="primary"
      size="small"
      animation="bounce"
      onClick={handleAdd}
      color="var(--purple-light)"
      rightIcon={
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      }
    >
      Add to wishlist
    </Button>
  );
};

export default AddToWishlistButton;

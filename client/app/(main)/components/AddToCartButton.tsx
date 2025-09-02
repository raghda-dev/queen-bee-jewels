// client/app/(main)/components/AddToCartButton.tsx

'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/redux/hooks';
import { addToCartAsync, addToGuestCart } from '../lib/redux/cart/cartActions';
import { removeFromGuestWishlist } from '../lib/redux/wishlist/wishlistActions';
import Button from './Button';
import { ShopifyProduct } from '../../../../lib/shopify/products/types';
import { ShoppingCart } from 'lucide-react';

type Props = { product: ShopifyProduct };

const AddToCartButton: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAdd = async (): Promise<void> => {
    const numericId = product.id.includes('/') ? product.id.split('/').pop()! : product.id;

    const item = {
      id: numericId,
      name: product.title,
      price: parseFloat(product.priceRange.minVariantPrice.amount),
      imageUrl: product.featuredImage?.url || '',
      quantity: 1,
      description: product.description || 'No description available',
      type: product.productType || 'General',
    };

    try {
      if (user) {
        // Logged-in: server-side thunk — keep toasts in thunk
        await dispatch(addToCartAsync(item));
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
        return;
      }

      // Guest: first try removing from guest wishlist if present.
      try {
        if (typeof window !== 'undefined') {
          const rawWishlist = localStorage.getItem('guestWishlist');
          if (rawWishlist) {
            const parsed = JSON.parse(rawWishlist) as Array<{ id: string }>;
            const existsInWishlist = parsed.some((w) => {
              const iid = String(w.id);
              return iid === product.id || iid.includes(numericId) || iid === numericId;
            });

            if (existsInWishlist) {
              // dispatch thunk to remove from guest wishlist (thunk handles toasts & state)
              dispatch(removeFromGuestWishlist(product.id));
            }
          }
        }
      } catch (_err) {
        // keep silent — thunks handle user-facing messages
        // console.warn('Warning while handling guest wishlist removal', _err);
      }

      // Prevent duplicate in guest cart by checking localStorage snapshot first.
      let existsInCart = false;
      try {
        if (typeof window !== 'undefined') {
          const rawCart = localStorage.getItem('guestCart');
          const guestCart = rawCart ? (JSON.parse(rawCart) as Array<{ id: string }>) : [];
          existsInCart = guestCart.some((c) => {
            const cid = String(c.id ?? '');
            return cid === numericId || cid.includes(numericId);
          });
        }
      } catch (_err) {
        // If we can't read localStorage, let the thunk dedupe.
        existsInCart = false;
      }

      if (existsInCart) {
        // Do not re-dispatch — thunk will also handle duplicates if it runs.
        return;
      }

      // Add to guest cart via thunk (thunk persists localStorage & toasts)
      await dispatch(addToGuestCart(item));
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    } catch (err) {
      // Unexpected internal error — keep console log only.
      // Do not surface user-facing errors here (thunks handle those).
      console.error('AddToCartButton unexpected error', err);
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
        <ShoppingCart size={15} className={`cart-icon ${isAnimating ? 'rotate-pop' : ''}`} />
      }
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;

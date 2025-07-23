// client/app/(main)/lib/redux/cart/cartActions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem } from './cartTypes';
import { shopifyQuery } from '../../../../../../lib/shopify/client';
import { GET_PRODUCTS_BY_ID } from '../../../../../../lib/shopify/products/queries';
import { getWishlistAsync } from '../wishlist/wishlistActions';
import { RootState } from '../store';
import { toast } from 'sonner';

export const addToCartAsync = createAsyncThunk<CartItem, CartItem, { state: RootState }>(
  'cart/addToCartAsync',
  async (item, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const cart = state.cart.items;
      const numericId = item.id.includes('/') ? item.id.split('/').pop()! : item.id;

      const exists = cart.some(ci => ci.id.includes(numericId));
      if (exists) {
        toast('This item is already in your cart', { className: 'toast-warning' });
        return rejectWithValue('Item already exists');
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId: numericId, quantity: item.quantity }),
      });

      if (!res.ok) throw new Error('Failed to save to backend');

      // Return the item with normalized id, so reducer can update state
      return { ...item, id: numericId };
    } catch (err) {
      toast('Failed to add to cart', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);


export const getCartAsync = createAsyncThunk<CartItem[]>(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to fetch cart from backend');

      const data = await res.json();
      const cartItems: { productId: string; quantity: number }[] = data.items;

      if (cartItems.length === 0) return [];

      const ids: string[] = cartItems.map(
        (item) => `gid://shopify/Product/${item.productId}`
      );

      const shopifyResponse: {
        nodes: Array<{
          id: string;
          title: string;
          description: string;
          productType?: string;
          featuredImage?: { url: string };
          priceRange: {
            minVariantPrice: {
              amount: string;
            };
          };
        }>;
      } = await shopifyQuery(GET_PRODUCTS_BY_ID, { ids });

      // Map shopify product data with cart quantities
      const enrichedItems: CartItem[] = shopifyResponse.nodes.map((product) => {
        const numericId = product.id.split('/').pop();
        const matching = cartItems.find((item) => item.productId === numericId);

        return {
          id: product.id,
          name: product.title,
          price: parseFloat(product.priceRange.minVariantPrice.amount),
          imageUrl: product.featuredImage?.url || '',
          description: product.description || '',
          type: product.productType || '',
          quantity: matching?.quantity || 1,
        };
      });

      return enrichedItems;
    } catch (err) {
      toast('Could not load cart', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);

export const moveToWishlistAsync = createAsyncThunk<string, string, { rejectValue: string }>(
  'cart/moveToWishlist',
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const numericId = productId.includes('/')
        ? (productId.split('/').pop() ?? productId)
        : productId;

      const encodedId = encodeURIComponent(numericId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/move-to-wishlist/${encodedId}`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!res.ok) throw new Error('Failed to move to wishlist');

      // Refresh both cart and wishlist
      await dispatch(getCartAsync());
      await dispatch(getWishlistAsync());

      toast('Moved to wishlist', { className: 'toast-info' });
      return productId;
    } catch (err) {
      toast('Failed to move item to wishlist', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);

export const removeFromCartAsync = createAsyncThunk<string, string, { rejectValue: string }>(
  'cart/removeFromCart',
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const numericId = productId.includes('/')
        ? (productId.split('/').pop() ?? productId)
        : productId;

      const encodedId = encodeURIComponent(numericId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/${encodedId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (!res.ok) throw new Error('Failed to delete item');

      // Refresh both cart and wishlist after removal
      await dispatch(getCartAsync());
      await dispatch(getWishlistAsync());

      toast('Removed from cart', { className: 'toast-warning' });
      return productId;
    } catch (err) {
      toast('Could not remove item', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);

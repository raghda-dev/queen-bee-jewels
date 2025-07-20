// client/app/(main)/lib/redux/cart/cartActions.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem } from './cartTypes';
import { shopifyQuery } from '../../../../../../lib/shopify/client';
import { GET_PRODUCTS_BY_ID } from '../../../../../../lib/shopify/products/queries';
import { getWishlistAsync } from '../wishlist/wishlistActions';
import { toast } from 'sonner';


export const addToCartAsync = createAsyncThunk<CartItem, CartItem>(
  'cart/addToCartAsync',
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const numericId = item.id.includes('/')
        ? item.id.split('/').pop()
        : item.id;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: numericId, quantity: item.quantity }),
      });

      if (!res.ok) throw new Error('Failed to save to backend');

      // ✅ Optionally refetch cart if you want immediate sync:
      await dispatch(getCartAsync());
      toast('added to cart', { className: 'toast-success' });

      return item; // Return enriched item
    } catch (err) {
      toast('failed to add to cart', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);


export const getCartAsync = createAsyncThunk<CartItem[]>(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`);
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
      toast('could not load cart', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);


export const moveToWishlistAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('cart/moveToWishlist', async (productId, { rejectWithValue, dispatch }) => {
  try {
    const numericId = productId.includes('/')
      ? (productId.split('/').pop() ?? productId)
      : productId;

    const encodedId = encodeURIComponent(numericId);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/move-to-wishlist/${encodedId}`,
      { method: 'POST' }
    );

    if (!res.ok) throw new Error('Failed to move to wishlist');

    // ✅ Refetch both slices
    await dispatch(getCartAsync());
    await dispatch(getWishlistAsync());

    toast('moved to wishlist', { className: 'toast-info' });
    return productId;
  } catch (err) {
    toast('failed to move item to wishlist', { className: 'toast-error' });
    return rejectWithValue((err as Error).message);
  }
});


export const removeFromCartAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('cart/removeFromCart', async (productId, { rejectWithValue, dispatch }) => {
  try {
    const numericId = productId.includes('/')
      ? (productId.split('/').pop() ?? productId)
      : productId;

    const encodedId = encodeURIComponent(numericId);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/${encodedId}`,
      { method: 'DELETE' }
    );

    if (!res.ok) throw new Error('Failed to delete item');

    // ✅ Refetch both slices
    await dispatch(getCartAsync());
    await dispatch(getWishlistAsync());

    toast('removed from cart', { className: 'toast-warning' });
    return productId;
  } catch (err) {
    toast('could not remove item', { className: 'toast-error' });
    return rejectWithValue((err as Error).message);
  }
});

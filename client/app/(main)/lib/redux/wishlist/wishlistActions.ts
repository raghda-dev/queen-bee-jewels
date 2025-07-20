// lib/redux/wishlist/wishlistActions.ts


import { createAsyncThunk } from '@reduxjs/toolkit';
import { WishlistItemType } from './wishlistTypes';
import { getCartAsync } from '../cart/cartActions';
import { toast } from 'sonner';


export const addToWishlistAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'wishlist/addToWishlist',
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const numericId = productId.includes('/')
        ? productId.split('/').pop()!
        : productId;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: numericId }),
      });

      if (!res.ok) throw new Error('failed to add to wishlist');

      await dispatch(getWishlistAsync());

      toast('added to wishlist', { className: 'toast-success' });
      return productId;
    } catch (err) {
      toast('failed to add to wishlist', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);


export const getWishlistAsync = createAsyncThunk<
  WishlistItemType[],
  void,
  { rejectValue: string }
>('wishlist/getWishlist', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`);
    if (!res.ok) throw new Error('failed to fetch wishlist');
    const data = await res.json();
    return data.items as WishlistItemType[];
  } catch (err) {
    toast('could not load wishlist', { className: 'toast-error' });
    return rejectWithValue((err as Error).message);
  }
});


export const moveToCartAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('wishlist/moveToCart', async (productId, { rejectWithValue, dispatch }) => {
  try {
    const numericId = productId.includes('/')
      ? productId.split('/').pop()!
      : productId;

    const encodedId = encodeURIComponent(numericId);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlist/move-to-cart/${encodedId}`,
      { method: 'POST' }
    );

    if (!res.ok) throw new Error('failed to move to cart');

    await dispatch(getWishlistAsync());
    await dispatch(getCartAsync());

    toast('moved to cart', { className: 'toast-info' });
    return productId;
  } catch (err) {
    toast('failed to move item to cart', { className: 'toast-error' });
    return rejectWithValue((err as Error).message);
  }
});


export const removeFromWishlistAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const numericId = productId.includes('/')
        ? productId.split('/').pop()!
        : productId;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlist/${numericId}`,
        {
          method: 'DELETE',
        }
      );

      if (!res.ok) throw new Error('failed to remove from wishlist');

      await dispatch(getCartAsync());
      await dispatch(getWishlistAsync());

      toast('removed from wishlist', { className: 'toast-warning' });
      return productId;
    } catch (err) {
      toast('could not remove item', { className: 'toast-error' });
      return rejectWithValue((err as Error).message);
    }
  }
);
